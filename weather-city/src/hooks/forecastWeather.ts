/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/services/api";
import { ForecastPeriod } from "@/types/forecastPeriod";
import { useEffect, useState } from "react";

// Resgatando a chave de API do .env
const API_KEY =  process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

// Horas da previsão
const targetHours = {
    dawn: '03:00:00', // Madrugada
    morning: '09:00:00', // Manhã
    afternoon: '15:00:00', // Tarde
    night: '21:00:00', // Noite
}

// Definição da estrutura dos dados de previsão esperados
interface ForecastData {
    [key: string]: ForecastPeriod;
}


// Hook personalizado para obter a previsão do tempo para uma cidade específica
export function useForecastWeather(city: string) {
    const [forecast, setForecast] = useState<ForecastData | null>(null); // Estado para armazenar os dados de previsão

    useEffect(() => {
        async function getForecast() {
            try {
                // Faz a requisição à API OpenWeather para obter a previsão
                const response = await api.get(`/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
                // Períodos do dia
                const periods: ForecastData = {};

                // Faz uma caminhada pelas horas da previsão
                for (const [period, hour] of Object.entries(targetHours)) {
                    // Separa somente a hora que está na lista de horas de previsão
                    const entry = response.data.list.find((item: { dt_txt: string; }) => item.dt_txt.includes(hour))
                
                    // Se houver previsão então salvamos os dados que conseguimos e senão, setamos valores padrão
                    if (entry) {
                        periods[period] = {
                            temp: Math.round(entry.main.temp), // Temperatura
                            icon: entry.weather[0].icon, // ícone
                            description: entry.weather[0].description, // Descrição do clima, para a descrição da imagem caso nao tenha
                            condition: entry.weather[0].main // condição do clima
                        };
                    }
                    else {
                        periods[period] = {
                            temp: 0,
                            icon: '01d', // valor padrão de ícone
                            description: 'Unavailable',
                            condition: 'Unavailable'
                        }
                    }

                    setForecast(periods); // Atualiza o estado com os dados recebidos
                }
            }
            catch (error) {
                console.log('Error while getting data'); // Exibe a mensagem de erro no console do navegador em caso de falha
                setForecast(null); // Limpa qualquer dado que haja de consultas anteriores
            }
        }

        if (city) {
            getForecast();
        }
    }, [city]);

    return forecast // Define a mensagem de erro em caso de falha
}