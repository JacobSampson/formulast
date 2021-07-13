import { NextApiRequest, NextApiResponse } from 'next';
import { CellModel } from '../../../lib/models';
import { FormulaMeta } from '../../../lib/models/formula';
import fs from 'fs';
import path from 'path';

interface SaveFormulaRequest {
  cells: CellModel[][];
  meta: FormulaMeta;
}

const functionsDirectory = path.join(process.cwd(), 'content/functions');

export default (request: NextApiRequest, response: NextApiResponse) => {
  const { cells, meta }: SaveFormulaRequest = request.body;

  const parsedFormula = {
    cells: [],
    meta,
  };

  parsedFormula.cells = cells.map((row) => {
    return row.map((cell) => {
        if (cell) {
        return {
          value: cell.value,
          variant: cell.variant,
          tag: cell.tag,
          unit: cell.unit,
          disabled: cell.disabled,
        };
      }
    });
  });

  const formulaId = meta.title.replace(/ /g, '-').toLowerCase();

  fs.writeFileSync(`${functionsDirectory}/${formulaId}.json`, JSON.stringify(parsedFormula));

  response.status(200).json({ id: `/formulas/${formulaId}` });
};
