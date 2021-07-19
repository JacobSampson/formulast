import { createClient, SupabaseClient } from '@supabase/supabase-js'
import FormulasPage from '../../pages/formulas';
import { IFormula } from '../models/formula';
import fs from 'fs';
import path from 'path';
import { isNumber } from '../util';

export enum TableType {
    FORMULAS='formulas',
    COMMUNITY='community'
};

const SUPABASE_URL = 'https://gvauterypgiwsqljongn.supabase.co';

export class ResourceService {
    db?: SupabaseClient;
    isLocal: boolean;
    functionsDirectory;

    constructor() {
        this.isLocal = process.env.LOCAL == 'true';

        if (this.isLocal) {
            this.functionsDirectory = path.join(process.cwd(), 'content/functions');
            return;
        }

        this.db = createClient(
            SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
    }

    async fetchFormulas(table: TableType): Promise<IFormula[]>{
        let { data: formulas, error } = await this.db
            .from(table.toString())
            .select('*')
            .order('id', { ascending: true });
        
        if (error) {
            console.log('error', error)
            throw new Error('Can\'t find formulas');
        }

        return formulas; 
    }

    async fetchFormulaById(id: string, table: TableType): Promise<IFormula> {
        console.log('tablename', table.toString())
        let { data: formulas, error } = await this.db
            .from(table.toString())
            .select('*')
            .match({ id });

        if (error || formulas && !formulas.length) {
            console.log('error', error);
            throw new Error('Can\'t find formula');
        }
        const { cells, title, description } = formulas[0] as { cells: string, title: string, description: string };
        const formula: IFormula = {
            cells: JSON.parse(cells),
            meta: {
                title,
                description
            },
        }

        return formula;
    }

    async saveFormula(id: string, formula: IFormula) {
        if (this.isLocal) {
            fs.writeFileSync(`${this.functionsDirectory}/${id}.json`, JSON.stringify(formula));
            return;
        }

        const { data: matchingItems, error: matchingError } = await this.db
            .from('formulas')
            .select('id')
            .ilike('id', id)
            .order('id');
        
        if (matchingItems.length) {            
            const lastNumber = matchingItems[matchingItems.length - 1].id.split('-').pop();
            if (isNumber(lastNumber)) id = `id-${+(lastNumber) + 1}`
            else id = `${id}-1`;
        }

        const { data: response, error } = await this.db
            .from('formulas')
            .insert({
                id,
                cells: JSON.stringify(formula.cells),
                title: formula.meta.title,
                description: formula.meta.description
            });

        if (error) {
            throw new Error(`Error saving: ${error}`);
        }

        return { errors: error, redirect: `/community/${id}` };
    }
}
