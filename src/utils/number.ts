export const formatNumber = (number: number) => {
    // format numbers to thousand to k, million to m, billion to b
    if (number < 1000) return number
    if (number < 1000000) return `${(number / 1000).toFixed(2)}k`
    if (number < 1000000000) return `${(number / 1000000).toFixed(2)}m`
    return `${(number / 1000000000).toFixed(1)}b`
}