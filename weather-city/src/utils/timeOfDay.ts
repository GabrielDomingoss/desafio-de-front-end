/**
 * Retorna o nome do ícone SVG correspondente ao período do dia fornecido.
 * 
 * @param period Período do dia ('dawn', 'morning', 'afternoon', 'night')
 * @returns Nome do arquivo do ícone em formato SVG
 */
export function getTimeOfDayIcon(period: string) {
    // Normaliza o período para minúsculo
    const normalized = period.toLowerCase();

    // Retorna o ícone baseado no período
    switch (normalized) {
        case 'dawn': // Madrugada
            return 'BsCloudMoon.svg'; // Ícone lua com nuvens
        case 'morning': // Manhã
            return 'BsSun.svg'; // Ícone sol
        case 'afternoon': // Tarde
            return 'BsCloudSun.svg'; // Ícone sol com nuvens
        case 'night': // Noite
            return 'BsMoon.svg'; // Ícone lua
        default:
            return 'BsCloud.svg'; // Ícone padrão (nuvem)
    }
}