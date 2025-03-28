// Função para transformar a primeira letra de uma palavra em maiúscula
export function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


// Função para formatar o timestamp em horário no formato HH:MM no padrão Americano AM e PM
export function formatTimeToAMPM(dateInSeconds: number) {
    // Converte o timestamp para milissegundos e transforma no padrão dos EUA com 2 digitos para hora e minuti
    //  e formato de 12 Horas
    return new Date(dateInSeconds * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}