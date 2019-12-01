const fs = require('fs').promises
const path = require('path')

// Path to mock file
let pathToFile = path.join(__dirname, '..', 'status.real')

// If there is a status file in the system, use it
// After this the pathToFile is either the systems file or the dummy file.
fs.access('/var/lib/dpkg/status', fs.F_OK)
  .then(() => {
    console.log('This system has a status file')
    pathToFile = '/var/lib/dpkg/status'
  })
  .catch((err) => {
    console.log('This system does not have status file')
  })

/**
 *
 * Function that accepts an index, and an array of strings,
 * From the given index, removes 'Description: ' part at start,
 * and concats to it every following array index that starts with a space and is not and empty line.
 *
 * @param {Number} index Description start index
 * @param {Array} content Array of content, every value is a string (singular line from a file)
 *
 * @return {String} A completed description without 'Description: ' part.
 */
const extractDescription = (index, content) => {
  let toReturn = content[index].replace('Description: ', '')
  let i = index + 1;

  while (content[i].startsWith(' ')) {
    toReturn = toReturn.concat(content[i])
    i += 1
  }

  return toReturn
}

/**
 *
 * Function that extracts dependencies from a given string.
 * Slices the input by spaces and | (pipes), removes any version numbers
 * and returns just a list of dependencies.
 *
 * @param {String} line complete line of dependencies, example: 'Depends: libc6 (>= 2.14)'
 *
 * @return {Array} List of dependencies, all in string form without version numbers.
 */
const extractDependencies = (line) => {
  const toReturn = []
  const dependencies = line.replace('Depends: ', '').split(/[,|]/)

  dependencies.forEach((dependency) => {
    const withoutVersion = dependency.trim().split(' (')
    toReturn.push(withoutVersion[0])
  })

  return toReturn
}

/**
 *
 * Function that sets reverse dependencies in given data (what modules need this module?)
 * Goes through all modules, and if a dependency is on the given input object,
 * sets it as a reverse dependency.
 *
 * @param {Object} data object that holds all module info in the form {'modulename': {dependencies: ..., }, ...}
 */
const setReverseDependencies = (data) => {
  const keys = Object.keys(data)
  // Go through all keys (module names)
  keys.forEach((key) => {
    // Get current modules dependencies
    const { dependencies } = data[key]
    // If it has dependencies...
    if (dependencies) {
      // ...go through them...
      dependencies.forEach((dependency) => {
        // ...and get the index of the dependency.
        const index = keys.indexOf(dependency)
        // Check that the dependency is on the list (it might not be!)
        if (index > -1) {
          // Check if the module already has reverse dependencies set as a variable, initialize it if not
          if (typeof data[keys[index]].reverseDependencies === 'undefined') {
            // I know i could have made a whole new object and returned it, but modifying the given
            // object and returning nothing seems faster. If this function was made available from outside
            // this file, i would have made this function return a new object but as this is a function only called
            // from this file this seems fine.
            data[keys[index]].reverseDependencies = []
          }

          // And finally add the reverse dependency.
          data[keys[index]].reverseDependencies.push(key)
        }
      })
    }
  })
}
/**
 *
 * Function that extracts data from either a mock status file or the real one if one is available.
 * Goes through the file and builds up a object that contains key-value pairs with module name as key and data about the module as value.
 * Also builds up alphabetically sorted list of module names that can also be used.
 *
 * @return {[moduleData, moduleNames]} Array with two values, first one is the object containing data, second one is a list of module names.
 */
const giveAllStatuses = async () => fs.readFile(pathToFile, 'utf8')
  .then((contents) => {
    const content = contents.split('\n')

    let moduleId = 0
    const moduleData = {}
    const moduleNames = []
    let currentPackage = {}
    let currentPackageName
    let newPackage = true

    content.forEach((line, index) => {
      if (line.startsWith('Package: ')) {
        if (newPackage) {
          newPackage = false;
          moduleNames.push(line.replace('Package: ', ''))
          currentPackageName = line.replace('Package: ', '')
        } else {
          throw new Error('File is corrupt')
        }
      } else if (line.startsWith('Description: ')) {
        currentPackage.description = extractDescription(index, content)
      } else if (line.startsWith('Depends: ')) {
        currentPackage.dependencies = extractDependencies(line)
      } else if (line === '') {
        if (currentPackageName !== '') {
          currentPackage.id = moduleId
          moduleId += 1
          newPackage = true
          moduleData[currentPackageName] = currentPackage
          currentPackage = {}
          currentPackageName = ''
        }
      }
    })

    moduleNames.sort()
    setReverseDependencies(moduleData)
    return [moduleData, moduleNames]
  })
  .catch((err) => {
    console.log('Something went wrong while reading the file')
    return err
  })

module.exports = { giveAllStatuses }
