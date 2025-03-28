/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/services/api";
import { ForecastPeriod } from "@/types/forecastPeriod";
import { useEffect, useState } from "react";

const API_KEY =  process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

const targetHours = {
    dawn: '03:00:00',
    morning: '09:00:00',
    afternoon: '15:00:00',
    night: '21:00:00',
}

interface ForecastData {
    [key: string]: ForecastPeriod;
}

export function useForecastWeather(city: string) {
    const [forecast, setForecast] = useState<ForecastData | null>(null);

    useEffect(() => {
        async function getForecast() {
            try {
                const response = await api.get(`/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
                const periods: ForecastData = {};

                for (const [period, hour]  of Object.entries(targetHours)) {
                    const entry = response.data.list.find((item: { dt_txt: string; }) => item.dt_txt.includes(hour))
                
                    if (entry) {
                        periods[period] = {
                            temp: Math.round(entry.main.temp),
                            icon: entry.weather[0].icon,
                            description: entry.weather[0].description,
                            condition: entry.weather[0].main
                        };
                    }
                    else {
                        periods[period] = {
                            temp: 0,
                            icon: '01d',
                            description: 'Unavailable',
                            condition: 'Unavailable'
                        }
                    }

                    setForecast(periods);
                }
            }
            catch (error) {
                console.log('Error while getting data');
                setForecast(null);
            }
        }

        getForecast();
    }, [city]);

    return forecast
}