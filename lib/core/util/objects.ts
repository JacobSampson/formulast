export function deepCopy(obj: object) {
    return JSON.parse(JSON.stringify(obj));
}
