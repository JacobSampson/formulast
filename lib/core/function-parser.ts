import fs from 'fs';
import path from 'path';
import { CellModel } from '../models';
import { FormulaMeta, IFormula } from '../models/formula';

const functionsDirectory = path.join(process.cwd(), 'content/functions');

export function getSortedFormulas() {
  const fileNames = fs.readdirSync(functionsDirectory);
  const allFunctionsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.json$/, '');

    const fullPath = path.join(functionsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const functionData = JSON.parse(fileContents);

    return {
      id,
      ...functionData,
    };
  });

  return allFunctionsData;
}

export function getAllFormulaIds() {
  const fileNames = fs.readdirSync(functionsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ''),
      },
    };
  });
}

export async function getFormulaData(id: string): Promise<IFormula> {
  const fullPath = path.join(functionsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const functionData = JSON.parse(fileContents);

  // Combine the data with the id and contentHtml
  return {
    id,
    ...functionData,
  };
}
