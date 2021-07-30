import { firestore } from '../authentication';
import fs from 'fs';
import path from 'path';
import { FormulaMeta, IFormula, isNumber } from '../../core';
import { generateRandomString } from '../../core/util/hash';

export enum TableType {
    FORMULAS='formulas',
    COMMUNITY='community'
};

const formulaConverter = (rawFormula: FormulaMeta & { id: string, cells: string }): IFormula => {
    const { cells, title, id, description, tags } = rawFormula;
    return {
        cells: JSON.parse(cells),
        meta: {
            title,
            description,
            tags
        },
        id
    };

}

export class ResourceService {
    db?: FirebaseFirestore.Firestore;
    isLocal: boolean;
    functionsDirectory;

    constructor() {
        this.isLocal = process.env.LOCAL == 'true';

        if (this.isLocal) {
            this.functionsDirectory = path.join(process.cwd(), 'content/functions');
            return;
        }

        this.db = firestore;
    }

    async fetchFormulas(table = "formulas"): Promise<IFormula[]>{
        const rawFormulas = await this.db
            .collection(table.toString())
            .limit(10)
            .get();

        const formulas: IFormula[] = rawFormulas.docs.map(doc => formulaConverter(doc.data() as any));
        return formulas;
    }

    async fetchFormulaById(id: string, table: TableType): Promise<IFormula> {
        const rawFormula = await this.db
            .collection(table.toString())
            .where('id', '==', id)
            .get();

        const formula = rawFormula.docs.map(doc => formulaConverter(doc.data() as any));

        if (!formula || !formula.length) throw new Error();
        return formula[0];
    }

    async saveFormula(id: string, formula: IFormula) {
        if (this.isLocal) {
            fs.writeFileSync(`${this.functionsDirectory}/${id}.json`, JSON.stringify(formula));
            return;
        }

        const rawMatchingItems = await this.db
            .collection('formulas')
            .where('id', '==', id)
            .get()
                    
        if (!rawMatchingItems.empty) {            
            id = `${id}-${generateRandomString(20)}`;
        }

        await this.db
            .collection('formulas')
            .add({
                id,
                cells: JSON.stringify(formula.cells),
                title: formula.meta.title,
                description: formula.meta.description,
                tags: formula.meta.tags || []
            });
        return { redirect: `/community/${id}` };
    }

    async updateFormula(id: string, formula: IFormula) {
        if (this.isLocal) {
            fs.writeFileSync(`${this.functionsDirectory}/${id}.json`, JSON.stringify(formula));
            return;
        }

        const matchingDocument = await this.db
            .collection('formulas')
            .where('id', '==', id)
            .get();
                    
        if (matchingDocument.empty) throw new Error(`No matching record: ${id}`);

        await matchingDocument.docs[0].ref.update({
            id,
            cells: JSON.stringify(formula.cells),
            title: formula.meta.title,
            description: formula.meta.description,
            tags: formula.meta.tags
        });

        return { redirect: `/community/${id}` };
    }
}
