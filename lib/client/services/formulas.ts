import { CellModel, FormulaMeta } from "../../core";

export async function saveFormula(cells: CellModel[][], meta: FormulaMeta) {
    const response = await fetch('/api/formulas/save-formula', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cells, meta })
    });

    const { id } = await response.json();

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
