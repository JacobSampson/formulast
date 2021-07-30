export const isNumber = (value: string): boolean => {
    try {
        return !isNaN(parseFloat(value)) && isFinite(parseFloat(value))
    } catch (e) {
        return false;
    }
}
