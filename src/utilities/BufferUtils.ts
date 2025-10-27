export namespace BufferUtils {
    export function toHex (bytes: Uint8Array) {
        let hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
        return `0x${hex}`;
    }
}
