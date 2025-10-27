export namespace $error {
    export function throwOnLocal (message) {
        console.log(`Error: ${message}`);
        if (window.location.href.includes('localhost')) {
            throw new Error(message);
        }
    }
}
