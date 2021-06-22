import fs from 'fs'
import path from 'path'

const functionsDirectory = path.join(process.cwd(), 'content/functions')

export function getSortedFunctionsData() {
  // Get file names under /content/functions
  const fileNames = fs.readdirSync(functionsDirectory)
  const allFunctionsData = fileNames.map(fileName => {
    // Remove ".json" from file name to get id
    const id = fileName.replace(/\.json$/, '')

    // Read markdown file as string
    const fullPath = path.join(functionsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const functionData = JSON.parse(fileContents);
    
    // Combine the data with the id
    return {
      id,
      ...functionData
    };
  });

  return allFunctionsData;
}

export function getAllFunctionIds() {
  const fileNames = fs.readdirSync(functionsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.json$/, '')
      }
    }
  });
}

export async function getFunctionData(id: string) {
  const fullPath = path.join(functionsDirectory, `${id}.json`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const functionData = JSON.parse(fileContents);

  // Combine the data with the id and contentHtml
  return {
    id,
    ...functionData
  };
}
