const fs = require('fs').promises
const path = require('path')

let pathToFile = path.join(__dirname, '..', 'status.real')

fs.access('/var/lib/dpkg/status', fs.F_OK)
  .then(() => {
    console.log('This system has a status file')
    pathToFile = '/var/lib/dpkg/status'
  })
  .catch((err) => {
    console.log('This system does not have status file')
  })

const extractDescription = (index, content) => {
  let toReturn = content[index].replace('Description: ', '')
  let i = index + 1;

  while (content[i].startsWith(' ')) {
    toReturn = toReturn.concat(content[i])
    i += 1
  }

  return toReturn
}

const extractDependencies = (line) => {
  const toReturn = []
  const dependencies = line.replace('Depends: ', '').split(/[,|]/)

  dependencies.forEach((dependency) => {
    const withoutVersion = dependency.trim().split(' (')
    toReturn.push(withoutVersion[0])
  })

  return toReturn
}

const setReverseDependencies = (data) => {
  const keys = Object.keys(data)
  keys.forEach((key) => {
    const { dependencies } = data[key]
    if (dependencies) {
      dependencies.forEach((dependency) => {
        const index = keys.indexOf(dependency)
        if (index > -1) {
          if (typeof data[keys[index]].reverseDependencies === 'undefined') {
            data[keys[index]].reverseDependencies = []
          }

          data[keys[index]].reverseDependencies.push(key)
        }
      })
    }
  })
}

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
