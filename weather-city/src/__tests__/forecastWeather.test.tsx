import { useForecastWeather } from "@/hooks/forecastWeather";
import { api } from "@/services/api";
import { renderHook, waitFor } from "@testing-library/react";

// Mock da chamada da API para controle total dos retornos no teste
jest.mock('@/services/api', () => ({
    api: {
        get: jest.fn(),
    }
}));

// Dados simulados que representam a previsão climática esperada da API
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
    
    // Verifica se todos os períodos são retornados corretamente pelo hook
    it('Deve retornar os períodos esperados', async () => {
        
        // Simula resposta bem-sucedida da API
        (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
        
        // Renderiza o hook
        const { result } = renderHook(() => 
            useForecastWeather('Recife')
        );

        // Espera a resposta assíncrona e valida se não está nula
        await waitFor(() => {
            expect(result.current).not.toBeNull();
        });

        // Valida se as propriedades esperadas estão presente
        expect(result.current).toHaveProperty('dawn');
        expect(result.current).toHaveProperty('morning');
        expect(result.current).toHaveProperty('afternoon');
        expect(result.current).toHaveProperty('night');
    });

    // Verifica o comportamento quando alguns períodos não estão presentes na resposta da API
    it('Deve retornar dados de previsão com fallback quando o período estiver ausente', async () => {
        // Separa o dia de hoje do horário
        const today = new Date().toISOString().split('T')[0];

        // Mock do resultado da API faltando o período da noite
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

        // Simula API retornando dados incompletos
        (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDataUncomplete });

        // Renderiza o hook com dados incompletos
        const { result } = renderHook(() => useForecastWeather('Recife'));

        // Espera a resposta assíncrona e valida se não está nula
        await waitFor(() => {
            expect(result.current).not.toBeNull();
        });

        // Verifica o fallback correto para o período ausente
        expect(result.current).toMatchObject({
            dawn: { temp: 20, condition: 'Clear', description: 'Madrugada', icon: '01d' },
            morning: { temp: 25, condition: 'Clear', description: 'Manhã', icon: '01d' },
            afternoon: { temp: 30, condition: 'Clear', description: 'Tarde', icon: '01d' },
            night: { // valor padrão esperado
              temp: 0,
              condition: 'Unavailable',
              description: 'Unavailable',
              icon: '01d',
            },
        });
    });

    
    // Verifica se o hook trata corretamente uma falha da API sem causar erro no app
    it('Deve capturar erro e não quebrar o app', async () => {
        
        // Espiona o console.log para confirmar tratamento de erros
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // Simula falha na API
        (api.get as jest.Mock).mockRejectedValueOnce(new Error('Erro'));

        // Renderiza o hook sob condição de erro
        const { result } = renderHook(() => useForecastWeather('Recife'));
        
        // Espera resposta nula devido ao erro
        await waitFor(() => {
            expect(result.current).toBeNull();
        });
    
        // Valida se o erro foi registrado corretamente no console
        expect(spy).toHaveBeenCalledWith('Error while getting data');
        
        // Restaura o comportamento original do console
        spy.mockRestore();
    })
});