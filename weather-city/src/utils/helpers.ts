export function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatTimeToAMPM(dateInSeconds: number) {
    return new Date(dateInSeconds * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}