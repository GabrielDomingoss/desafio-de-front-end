'use client';
import { api } from "@/services/api";
import { WeatherResponse } from "@/types/weather";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForecastWeather } from "@/hooks/forecastWeather";
import { getWeatherIcon } from "@/utils/weatherIcons";
import { getTimeOfDayIcon } from "@/utils/timeOfDay";
import { capitalize, formatTimeToAMPM } from "@/utils/helpers";
import ErrorImg from '../../assets/error.png';

export default function CityWeather() {
    const router = useRouter();
    const { city } = router.query; // Resgata o nome da cidade que vai ser exibida
    const [weather, setWeather] = useState<WeatherResponse | null>(null); // Objeto que terá as informações do clima da cidade
    const [loading, setLoading] = useState(true); // Estado de carregamento da página
    const [error, setError] = useState<string | null>(null); // Flag caso haja erros no resgate de informações
    const forecast = useForecastWeather(city as string); // Dados da previsão de acordo com o tempo do dia
    const icon = 
        weather ? 
        `/icons/${getWeatherIcon(weather.weather[0].main)}` 
        : '/icons/BsSun.svg'; // ícone principal da página, varia de acordo com o clima, se não é sol por padrão

    // Efeito para buscar os dados meteorológicos ao carregar o componente ou quando a cidade muda
    useEffect(() => {
        if (!city) return;

        async function getWeather() {
            try {
                // Faz a requisição à API OpenWeather
                const response = await api.get('/weather', {
                    params: {
                        q: `${city}`,
                        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string,
                        units: 'metric',
                        lang: 'en'
                    }
                });
                setWeather(response.data); // Atualiza o estado com os dados recebidos
                setError(null); // Se conseguiu os dados, não há erros
            }
            catch (error) {
                console.log('Error while getting weather information:', error); // Exibe o erro no console do navegador
                setWeather(null); // Limpa os dados de clima caso hajam e sejam antigos de outras consultas
                setError("We are unable to load weather information at the moment. Please try again later.");  // Define a mensagem de erro em caso de falha
            }
            finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        }

        getWeather();
    }, [city]);

    
    // Exibe uma animação e uma mensagem de carregamento enquanto os dados estão sendo buscados
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#CACACA] text-[#0F0F0F]">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0F0F0F]"></div>
                <p className="mt-4 text-lg font-light">Loading...</p>
            </div>
        );
    }

    // Exibe uma mensagem de erro caso ocorra algum problema na requisição
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#CACACA] text-[#0F0F0F] px-4">
                 <Image
                    src={ErrorImg}
                    className="w-16 h-16 text-red-500 mb-4"
                    alt="Error Icon"
                    width={0}
                    height={0}
                />
                <h2 className="text-2xl font-medium">Oops! Something went wrong.</h2>
                <p className="text-base font-extralight mt-2 text-center max-w-sm">
                    {error}
                </p>
            </div>
        );
    }

    // Exibe os dados meteorológicos quando disponíveis
    return (
        <div className="flex flex-col text-center bg-[#CACACA] min-h-screen text-[#0F0F0F]">
            <div className="mt-[2rem] mr-[1rem] mb-[5.125rem] ml-[1rem] md:my-[9.313rem]">
                <div className="text-center">
                    {/* Nome da cidade */}
                    <h1 className="text-[3rem] font-light leading-[120%]">{weather?.name}</h1>
                    {/* Clima da cidade */}
                    <p className="text-[1.563rem] font-extralight leading-[120%] mt-1">
                        {weather?.weather?.[0]?.main ?? "Weather Info Not Available"}
                    </p>
                </div>

                <div className="flex flex-row justify-center">
                    {/* Temperatura atual da cidade */}
                    <div className="text-[8rem] font-extralight leading-[120%] mt-1">
                        {weather ? Math.round(weather?.main?.temp) : "--"}
                    </div>
                    <div className="flex flex-col ml-4">
                        <p className="mt-4 text-[2.625rem] font-extralight leading-[120%]">°C</p>
                        <div className="mt-[1.625rem] text-center flex flex-col items-center">
                            <p className="text-base font-extralight leading-[120%] flex items-center">
                                <Image src="/icons/stash_arrow-up-light.svg" alt="Arrow Up" width={16} height={16} />
                                <span>
                                    {/* Temperatura Máxima da cidade */}
                                    {weather ? `${Math.round(weather?.main?.temp_max)}°` : "--"}
                                </span>
                            </p>
                            <p className="text-base font-extralight leading-[120%] flex items-center">
                                <Image src="/icons/stash_arrow-down-light.svg" alt="Arrow Down" width={16} height={16} />
                                <span>
                                    {/* Temperatura Mínima da cidade */}
                                    {weather ? `${Math.round(weather?.main?.temp_min)}°` : "--"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    {/* Ícone que varia de acordo com o clima da cidade */}
                    <Image src={icon} alt="Weather Icon" width={176} height={176} />
                </div>

                <div className="flex justify-center gap-6 md:gap-[3rem] flex-wrap md:flex-row mt-6 md:mt-4">
                    {/* Informações sobre as previsões do clima para a manhã, tarde, noite e madrugada */}
                    {Object.entries(forecast ?? {}).map(([period, data]) => (
                        <div key={period} className="w-[5.75rem] flex flex-col items-center justify-center">
                            <p className="text-[1.25rem] font-extralight leading-[120%]">
                                {/* Período do dia */}
                                {capitalize(period)}
                            </p>
                            <Image
                                src={`/icons/${getTimeOfDayIcon(period)}`}
                                alt={data.description}
                                width={48}
                                height={48}
                                className="mt-4"
                            />
                            {/* Temperatura prevista */}
                            <p className="text-[1.25rem] font-extralight leading-[120%] mt-4">{data.temp}°C</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center md:flex-row flex-wrap mt-6 md:mt-16 px-[3.313rem]">
                    {/* Informações a respeito do clima */}
                    <div className="text-[1.25rem] font-extralight leading-[120%]">
                        <p>Wind speed</p>
                        {/* Velocidade do vento */}
                        <p className="mt-2">{weather?.wind?.speed ?? "--"} m/s</p>
                    </div>

                    {/* Barra lateral divisória */}
                    <div className="w-[1px] h-8 self-center bg-[#DFE4EA] mx-[0.8rem]" />

                    <div className="text-[1.25rem] font-extralight leading-[120%]">
                        <p>Sunrise</p>
                        {/* Tempo para o amanhecer */}
                        <p className="mt-2">
                            {formatTimeToAMPM(weather?.sys?.sunrise ?? 0)}
                        </p>
                    </div>

                    {/* Barra lateral divisória */}
                    <div className="w-[1px] h-8 self-center bg-[#DFE4EA] mx-[0.8rem] hidden md:block" />

                    <div className="text-[1.25rem] font-extralight leading-[120%] mx-[0.7rem] md:mx-0 mt-[1rem] md:mt-0">
                        <p>Sunset</p>
                        {/* Tempo para o anoitecer */}
                        <p className="mt-2">
                            {formatTimeToAMPM(weather?.sys?.sunset ?? 0)}
                        </p>
                    </div>

                    {/* Barra lateral divisória */}
                    <div className="w-[1px] h-8 self-center bg-[#DFE4EA] mx-[0.8rem] mt-[1rem] md:mt-0" />

                    <div className="text-[1.25rem] font-extralight leading-[120%] mt-[1rem] md:mt-0">
                        <p>Humidity</p>
                        {/* Umidade */}
                        <p className="mt-2">{weather?.main?.humidity ?? "--"}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
