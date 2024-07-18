export function replaceReservedCharacters(str: string): string {
    str = str.replaceAll("-", "\\-");
    str = str.replaceAll(".", "\\.");
    str = str.replaceAll("_", "\\_");
    console.log(str)
    return str;
}