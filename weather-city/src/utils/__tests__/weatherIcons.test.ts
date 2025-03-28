import { getWeatherIcon } from "@/utils/weatherIcons";

// Testes unitários para validar a função getWeatherIcon
describe('getWeatherIcon', () => {

    // Teste para condição de céu limpo (clear)
    it('Deve retornar ícone correto para clear', () => {
        // Verifica se a condição "Clear" retorna o ícone do sol
        expect(getWeatherIcon('Clear')).toBe('BsSun.svg');
    });

    // Teste para condição de nuvens (clouds)
    it('Deve retornar ícone correto para clouds', () => {
        // Condição "clouds" deve retornar o ícone de nuvens
        expect(getWeatherIcon('clouds')).toBe('BsClouds.svg');
    });

    // Teste para condição de chuva (rain)
    it('Deve retornar ícone correto para rain', () => {
        // Condição "rain" retorna o ícone com chuva
        expect(getWeatherIcon('rain')).toBe('BsCloudRain.svg');
    });

    // Teste para condição de garoa (drizzle)
    it('Deve retornar ícone correto para drizzle', () => {
        // Condição "drizzle" retorna o ícone de garoa
        expect(getWeatherIcon('drizzle')).toBe('BsCloudDrizzle.svg');
    });

    // Teste para condição de tempestade com raios (thunderstorm)
    it('Deve retornar ícone correto para thunderstorm', () => {
        // Condição "thunderstorm" retorna o ícone com tempestade e raios
        expect(getWeatherIcon('thunderstorm')).toBe('BsLightningRain.svg');
    });

    // Teste para condição de neve (snow)
    it('Deve retornar ícone correto para snow', () => {
        // Condição "snow" retorna o ícone com neve
        expect(getWeatherIcon('snow')).toBe('BsCloudSnow.svg');
    });

    // Teste para condição de neblina fina (mist)
    it('Deve retornar ícone correto para mist', () => {
        // Condição "mist" retorna o ícone com neblina fina
        expect(getWeatherIcon('mist')).toBe('BsCloudFog.svg');
    });
    
    // Teste para condição de neblina densa (fog)
    it('Deve retornar ícone correto para fog', () => {
        // Condição "fog" retorna o ícone com neblina densa
        expect(getWeatherIcon('fog')).toBe('BsCloudFog.svg');
    });

    // Teste para condição de névoa seca (haze)
    it('Deve retornar ícone correto para haze', () => {
        // Condição "haze" retorna o ícone com névoa seca
        expect(getWeatherIcon('haze')).toBe('BsCloudFog.svg');
    });

    // Teste para garantir retorno padrão em condições desconhecidas
    it('Deve retornar ícone padrão para condição desconhecida', () => {
        // Qualquer condição não reconhecida retorna o ícone padrão de nuvem
        expect(getWeatherIcon('unknown')).toBe('BsCloud.svg');
    });
})