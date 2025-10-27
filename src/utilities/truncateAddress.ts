export function truncateAddress (address: string) {
    return `0×${address.slice(2, 6)}...${address.slice(-4)}`;
}
