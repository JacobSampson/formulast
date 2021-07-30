/**
 * @src https://stackoverflow.com/questions/8240637/convert-numbers-to-letters-beyond-the-26-character-alphabet
 * @param num 
 * @returns 
 */
export function numberToLetters(num: number): string {
    let letters = ''
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters
        num = Math.floor(num / 26) - 1
    }
    return letters
}

function lettersToNumber(letters) {
    let number = 0;
    let multiplier = 1;
    while (letters.length) {
        number += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letters.charAt(letters.length - 1)) * multiplier;
        letters = letters.slice(0, -1);
        multiplier *= 26;
    }
    return number 
}

export const indicesToAlphanumeric = (rowIndex, colIndex) => {
    const letter = numberToLetters(colIndex);
    return `${letter}${rowIndex + 1}`;
}

export const alphanumericToIndicies = (tag: string): { rowIndex: number, colIndex: number } => {
    try {
        const rowIndexTag = tag.replace(/[A-Z]/g, '');
        const rowIndex = Number.parseInt(rowIndexTag) - 1;

        const colIndexTag = tag.replace(/[0-9]/g, '');
        const colIndex = lettersToNumber(colIndexTag);

        return {
            rowIndex,
            colIndex
        }    
    } catch (e) {
        return { rowIndex: -1, colIndex: -1 };
    }
}
