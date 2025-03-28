/**
 * Retorna o nome do ícone SVG correspondente à condição climática fornecida.
 * 
 * @param condition Condição climática recebida da API (ex.: 'clear', 'rain', 'clouds')
 * @returns Nome do arquivo do ícone em formato SVG
 */
export function getWeatherIcon(condition: string): string {
    // Normaliza a condição climática para letras minúsculas
    const normalized = condition.toLowerCase();
    
    // Escolhe o ícone apropriado com base na condição climática
    switch (normalized) {
        case 'clear': // Céu limpo
            return 'BsSun.svg'; // Ícone de sol
        case 'clouds': // Nuvens
            return 'BsClouds.svg'; // Ícone de nuvens
        case 'rain': // Chuva
            return 'BsCloudRain.svg'; // Ícone de nuvem com chuva
        case 'drizzle': // Chuvisco
            return 'BsCloudDrizzle.svg'; // Ícone de nuvem com garoa
        case 'thunderstorm': // Tempestade
            return 'BsLightningRain.svg'; // Ícone de raio com chuva
        case 'snow': // Neve
            return 'BsCloudSnow.svg'; // Ícone de neve
        case 'mist': // Névoa leve
        case 'fog': // Névoa densa
        case 'haze': // Névoa seca ou turva
            return 'BsCloudFog.svg'; // Ícone de névoa
        default:
            return 'BsCloud.svg'; // Ícone padrão (nuvem)
    }
}