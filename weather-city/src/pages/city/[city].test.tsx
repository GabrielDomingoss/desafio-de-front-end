import { api } from "@/services/api";
import { useRouter } from "next/router";
import CityWeather from "./[city]";
import { render, screen, waitFor } from "@testing-library/react";
import { useForecastWeather } from "@/hooks/forecastWeather";
import { WeatherResponse } from "@/types/weather";
import React from "react";

// Mock das dependências externas
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

jest.mock('@/hooks/forecastWeather');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Dados mockados que simulam a resposta da API de clima atual
const mockWeather: WeatherResponse = {
  name: 'Recife',
  sys: {
    country: 'BR',
    sunrise: 1711610280,
    sunset: 1711654140,
  },
  weather: [{
    main: 'Clear',
    icon: '01d',
    description: 'céu limpo',
  }],
  main: {
    temp: 29.5,
    temp_min: 28,
    temp_max: 31,
    humidity: 60,
  },
  wind: {
    speed: 3.4,
  },
};

// Dados mockados que simulam a previsão para períodos do dia
const mockForecast = {
  dawn: { temp: 25, condition: 'Clear', description: 'amanhecendo' },
  morning: { temp: 27, condition: 'Clear', description: 'manhã ensolarada' },
  afternoon: { temp: 30, condition: 'Clear', description: 'tarde quente' },
  night: { temp: 26, condition: 'Clear', description: 'noite clara' },
};

describe('Página CityWeather', () => {

  // Configuração padrão para os mocks antes de cada teste
  beforeEach(() => {

    // limpa todos os mocks
    jest.clearAllMocks();
    
    // Suprime logs no console durante os testes
    jest.spyOn(console, 'log').mockImplementation(() => {});
  
    // Mock da query da URL simulando a cidade "Recife"
    (useRouter as jest.Mock).mockReturnValue({
      query: { city: 'Recife' },
    });
    
    // Mock do hook que obtém a previsão do tempo
    (useForecastWeather as jest.Mock).mockReturnValue(mockForecast);
  });

  // Testa a renderização correta dos dados climáticos atuais
  it('Deve exibir os dados climáticos da cidade', async () => {

    // Simula a API retornando dados climáticos corretamente
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: mockWeather,
    });

    // Renderiza a tela de clima da cidade
    render(<CityWeather />);

    // Aguarda e verifica se os elementos estão presentes na tela após a resposta da API
    await waitFor(() => {
      expect(screen.getByText('Recife')).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
      expect(screen.getByText('°C')).toBeInTheDocument();
      expect(screen.getByText('31°')).toBeInTheDocument();
      expect(screen.getByText('28°')).toBeInTheDocument();
      expect(screen.getByText('Humidity')).toBeInTheDocument();
      expect(screen.getByText(/60%/)).toBeInTheDocument();
    });
  });

  // Testa a renderização correta das previsões para os períodos do dia
  it('Deve exibir previsão para os períodos do dia', async () => {
    
    // Simula a resposta bem-sucedida da API
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: mockWeather,
    });

    // Renderiza a tela de clima da cidade
    render(<CityWeather />);

    // Aguarda e verifica se os períodos são renderizados corretamente na interface
    await waitFor(() => {
      expect(screen.getByText(/Dawn/i)).toBeInTheDocument();
      expect(screen.getByText(/Morning/i)).toBeInTheDocument();
      expect(screen.getByText(/Afternoon/i)).toBeInTheDocument();
      expect(screen.getByText(/Night/i)).toBeInTheDocument();
    });
  });


  // Testa comportamento da aplicação ao falhar uma chamada à API
  it('Deve mostrar erro ao falhar chamada a API', async () => {

    // Simula erro ao chamar a API de clima atual
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Erro'));

    // Renderiza a tela de clima da cidade
    render(<CityWeather />);

    // Aguarda e verifica se a mensagem de erro é exibida corretamente para o usuário
    await waitFor(() => {
      expect(screen.getByText(/We are unable to load weather information at the moment. Please try again later./i)).toBeInTheDocument();
    });
  });
});
