export namespace AddressUtil {
    export function eq (a: string, b: string) {
        return a?.toLowerCase() === b?.toLowerCase();
    }

    export function isEmpty (a: string) {
        return a == null || a === '' || /^0x0+$/.test(a);
    }
}
