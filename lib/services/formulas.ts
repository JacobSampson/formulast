import { CellModel } from "../models";
import { FormulaMeta } from "../models/formula";

export async function saveFormula(cells: CellModel[][], meta: FormulaMeta) {
    const response = await fetch('/api/formulas/save-formula', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cells, meta })
    });

    const { id } = await response.json();
    console.log('id', id);
    if (!id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        redirect: {
            destination: id,
            permanent: false
        }
    }
}