import { getWeatherIcon } from "@/utils/weatherIcons";

describe('getWeatherIcon', () => {
    it('Deve retornar ícone correto para clear', () => {
        expect(getWeatherIcon('Clear')).toBe('BsSun.svg');
    });

    it('Deve retornar ícone correto para clouds', () => {
        expect(getWeatherIcon('clouds')).toBe('BsClouds.svg');
    });

    it('Deve retornar ícone correto para rain', () => {
        expect(getWeatherIcon('rain')).toBe('BsCloudRain.svg');
    });

    it('Deve retornar ícone correto para drizzle', () => {
        expect(getWeatherIcon('drizzle')).toBe('BsCloudDrizzle.svg');
    });

    it('Deve retornar ícone correto para thunderstorm', () => {
        expect(getWeatherIcon('thunderstorm')).toBe('BsLightningRain.svg');
    });

    it('Deve retornar ícone correto para snow', () => {
        expect(getWeatherIcon('snow')).toBe('BsCloudSnow.svg');
    });

    it('Deve retornar ícone correto para mist', () => {
        expect(getWeatherIcon('mist')).toBe('BsCloudFog.svg');
    });
    
    it('Deve retornar ícone correto para fog', () => {
        expect(getWeatherIcon('fog')).toBe('BsCloudFog.svg');
    });

    it('Deve retornar ícone correto para haze', () => {
        expect(getWeatherIcon('haze')).toBe('BsCloudFog.svg');
    });

    it('Deve retornar ícone padrão para condição desconhecida', () => {
        expect(getWeatherIcon('unknown')).toBe('BsCloud.svg');
    });
})