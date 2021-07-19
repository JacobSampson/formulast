import { NextApiRequest, NextApiResponse } from 'next';
import { CellModel } from '../../../lib/models';
import { FormulaMeta } from '../../../lib/models/formula';
import { ResourceService } from '../../../lib/services/resource-service';

interface SaveFormulaRequest {
  cells: CellModel[][];
  meta: FormulaMeta;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { cells, meta }: SaveFormulaRequest = request.body;

  const parsedFormula = {
    cells: [],
    meta,
  };

  parsedFormula.cells = cells.map((row) => {
    return row.map((cell) => {
      if (cell) {
        const parsedCell: CellModel = { value: cell.value };

        // Only add non-default values
        if (cell.variant) { parsedCell.variant = cell.variant };
        if (cell.disabled) { parsedCell.disabled = cell.disabled };
        if (cell.unit) { parsedCell.unit = cell.unit };
        if (cell.direction) { parsedCell.direction = cell.direction };

        return parsedCell;
      }
    });
  });

  const formulaId = meta.title.replace(/ /g, '-').toLowerCase();
  const resourceService = new ResourceService();

  const { errors, redirect } = await resourceService.saveFormula(formulaId, parsedFormula);
  if (!errors) {
    response.status(200).json({ id: redirect });
    return;
  }

  response.status(500);
};
