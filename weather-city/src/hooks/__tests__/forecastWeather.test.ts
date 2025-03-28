import { useForecastWeather } from "@/hooks/forecastWeather";
import { api } from "@/services/api";
import { renderHook, waitFor } from "@testing-library/react";

jest.mock('@/services/api', () => ({
    api: {
        get: jest.fn(),
    }
}));

const mockData = {
    list: [
        {
            dt_txt: '2025-03-28 03:00:00',
            main: { temp: 25 },
            weather: [{ description: 'madrugada', icon: '01d', main: 'Clear' }],
        },
        {
            dt_txt: '2025-03-28 09:00:00',
            main: { temp: 28 },
            weather: [{ description: 'manhã', icon: '02d', main: 'Clear' }],
        },
        {
            dt_txt: '2025-03-28 15:00:00',
            main: { temp: 30 },
            weather: [{ description: 'tarde', icon: '03d', main: 'Clouds' }],
        },
        {
            dt_txt: '2025-03-28 21:00:00',
            main: { temp: 24 },
            weather: [{ description: 'noite', icon: '04d', main: 'Clouds' }],
        },
    ]
};

describe('useForecastWeather', () => {
    it('Deve retornar os períodos esperados', async () => {
        (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

        const { result } = renderHook(() => 
            useForecastWeather('Recife')
        );

        await waitFor(() => {
            expect(result.current).not.toBeNull();
        });

        expect(result.current).toHaveProperty('dawn');
        expect(result.current).toHaveProperty('morning');
        expect(result.current).toHaveProperty('afternoon');
        expect(result.current).toHaveProperty('night');
    });

    it('Deve retornar dados de previsão com fallback quando o período estiver ausente', async () => {
        const today = new Date().toISOString().split('T')[0];
        const mockDataUncomplete = {
            list: [
                {
                  dt_txt: `${today} 03:00:00`,
                  main: { temp: 20 },
                  weather: [{ main: 'Clear', description: 'Madrugada', icon: '01d' }],
                },
                {
                  dt_txt: `${today} 09:00:00`,
                  main: { temp: 25 },
                  weather: [{ main: 'Clear', description: 'Manhã', icon: '01d' }],
                },
                {
                  dt_txt: `${today} 15:00:00`,
                  main: { temp: 30 },
                  weather: [{ main: 'Clear', description: 'Tarde', icon: '01d' }],
                },
            ],
        };

        (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDataUncomplete });

        const { result } = renderHook(() => useForecastWeather('Recife'));

        await waitFor(() => {
            expect(result.current).not.toBeNull();
        });

        expect(result.current).toMatchObject({
            dawn: { temp: 20, condition: 'Clear', description: 'Madrugada', icon: '01d' },
            morning: { temp: 25, condition: 'Clear', description: 'Manhã', icon: '01d' },
            afternoon: { temp: 30, condition: 'Clear', description: 'Tarde', icon: '01d' },
            night: {
              temp: 0,
              condition: 'Unavailable',
              description: 'Unavailable',
              icon: '01d',
            },
        });
    });

    it('Deve capturar erro e não quebrar o app', async () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
        (api.get as jest.Mock).mockRejectedValueOnce(new Error('Erro'));

        const { result } = renderHook(() => useForecastWeather('Recife'));
        
        await waitFor(() => {
            expect(result.current).toBeNull();
        });
    
        expect(spy).toHaveBeenCalledWith('Error while getting data');
        spy.mockRestore();
    })
});