import { determineBackgroundColor } from '@/utils/backgroundColor';
import { WeatherResponse } from '@/types/weather';

describe('determineBackgroundColor', () => {
  // Função para criar um objeto WeatherResponse simulado
  const mockWeather = (main: string): WeatherResponse => ({
    name: 'City',
    sys: { country: 'BR', sunrise: 0, sunset: 0 },
    weather: [{ main, description: '', icon: '01d' }],
    main: { temp: 0, temp_min: 0, temp_max: 0, humidity: 0 },
    wind: { speed: 0 },
  });

  // Mock da hora atual retornada por Date.prototype.getHours
  const mockHour = (hour: number) => {
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(hour);
  };

  // Limpa os mocks após cada teste para evitar efeitos colaterais
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Testa o caso onde não há dados de clima e deve retornar cinza por padrão
  it('retorna cinza se não houver dados', () => {
    expect(determineBackgroundColor(undefined)).toBe('#CACACA');
    expect(determineBackgroundColor(null)).toBe('#CACACA');
  });

  // Testa se a função retorna preto corretamente no período da noite (entre 18h e 6h)
  it('retorna preto se for noite (entre 18h e 6h)', () => {
    mockHour(23); // noite
    expect(determineBackgroundColor(mockWeather('Clear'))).toBe('#0F0F0F');

    mockHour(3); // madrugada
    expect(determineBackgroundColor(mockWeather('Clear'))).toBe('#0F0F0F');
  });

  // Testa se a função retorna azul para condição de céu limpo durante o dia
  it('retorna azul se estiver claro durante o dia', () => {
    mockHour(10); // manhã
    expect(determineBackgroundColor(mockWeather('Clear'))).toBe('#2CAEFF');
  });

  // Testa se retorna cinza para condições chuvosas/nubladas durante o dia
  it('retorna cinza se estiver nublado ou chuvoso durante o dia', () => {
    mockHour(10); // manhã
    const conditions = ['Clouds', 'Rain', 'Drizzle', 'Thunderstorm'];
    conditions.forEach((cond) => {
      expect(determineBackgroundColor(mockWeather(cond))).toBe('#CACACA');
    });
  });

  // Testa fallback para condições climáticas não previstas: deve retornar cinza
  it('retorna cinza como fallback para condições desconhecidas', () => {
    mockHour(10); // manhã
    expect(determineBackgroundColor(mockWeather('Smoke'))).toBe('#CACACA');
  });
});
