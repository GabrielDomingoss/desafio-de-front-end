import { api } from "@/services/api";
import { useRouter } from "next/router";
import CityWeather from "./[city]";
import { render, screen, waitFor } from "@testing-library/react";
import { useForecastWeather } from "@/hooks/forecastWeather";
import { WeatherResponse } from "@/types/weather";
import React from "react";

jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

jest.mock('@/hooks/forecastWeather');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

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

const mockForecast = {
  dawn: { temp: 25, condition: 'Clear', description: 'amanhecendo' },
  morning: { temp: 27, condition: 'Clear', description: 'manhã ensolarada' },
  afternoon: { temp: 30, condition: 'Clear', description: 'tarde quente' },
  night: { temp: 26, condition: 'Clear', description: 'noite clara' },
};

describe('Página CityWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    (useRouter as jest.Mock).mockReturnValue({
      query: { city: 'Recife' },
    });
    (useForecastWeather as jest.Mock).mockReturnValue(mockForecast);
  });

  it('Deve exibir os dados climáticos da cidade', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: mockWeather,
    });

    render(<CityWeather />);

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

  it('Deve exibir previsão para os períodos do dia', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: mockWeather,
    });

    render(<CityWeather />);

    await waitFor(() => {
      expect(screen.getByText(/Dawn/i)).toBeInTheDocument();
      expect(screen.getByText(/Morning/i)).toBeInTheDocument();
      expect(screen.getByText(/Afternoon/i)).toBeInTheDocument();
      expect(screen.getByText(/Night/i)).toBeInTheDocument();
    });
  });

  it('Deve mostrar erro ao falhar chamada a API', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Erro'));

    render(<CityWeather />);

    await waitFor(() => {
      expect(screen.getByText(/We are unable to load weather information at the moment. Please try again later./i)).toBeInTheDocument();
    });
  });
});
