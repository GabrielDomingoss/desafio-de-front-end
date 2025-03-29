import { WeatherResponse } from "@/types/weather";

/**
 * Retorna a cor de fundo da tela com base na condição climática e hora do dia.
 *
 * @param weather - Objeto de clima atual.
 * @returns string - Código hexadecimal da cor de fundo.
 */
export const determineBackgroundColor = (weather?: WeatherResponse | null): string => {
    if (!weather) return '#CACACA'; // Fallback cinza caso não haja dados ainda

    const condition = weather.weather[0].main.toLowerCase();
    const hour = new Date().getHours();

    if (hour >= 18 || hour < 6) return '#0F0F0F'; // Noite = Preto
    if (condition === 'clear') return '#2CAEFF'; // Céu limpo = Azul
    if (['clouds', 'rain', 'drizzle', 'thunderstorm'].includes(condition)) return '#CACACA'; // Nublado ou chuvoso = Cinza

    return '#CACACA'; // Cor padrão
};
