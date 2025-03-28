'use client';
import { api } from "@/services/api";
import { WeatherResponse } from "@/types/weather";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForecastWeather } from "@/hooks/forecastWeather";
import { getWeatherIcon } from "@/utils/weatherIcons";
import { getTimeOfDayIcon } from "@/utils/timeOfDay";
import { capitalize, formatTimeToAMPM } from "@/utils/helpers";

export default function CityWeather() {
    const router = useRouter();
    const { city } = router.query;
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const forecast = useForecastWeather(city as string);
    const icon = 
        weather ? 
        `/icons/${getWeatherIcon(weather.weather[0].main)}` 
        : '/icons/BsSun.svg';

    useEffect(() => {
        if (!city) return;

        async function getWeather() {
            try {
                const response = await api.get('/weather', {
                    params: {
                        q: `${city}`,
                        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string,
                        units: 'metric',
                        lang: 'en'
                    }
                });
                setWeather(response.data);
            }
            catch (error) {
                console.log('Error while getting weather information:', error);
                setWeather(null);
            }
            finally {
                setLoading(false);
            }
        }

        getWeather();
    }, [city]);

    if (loading || !forecast) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (!weather) {
        return <p className="text-center mt-10 text-red-500">Error on loading data</p>;
    }

    return (
        <div className="flex flex-col text-center bg-[#CACACA] min-h-screen text-[#0F0F0F]">
            <div className="mt-[2rem] mr-[1rem] mb-[5.125rem] ml-[1rem] md:my-[9.313rem]">
                <div className="text-center">
                    <h1 className="text-[3rem] font-light leading-[120%]">{weather.name}</h1>
                    <p className="text-[1.563rem] font-extralight leading-[120%] mt-1">{weather.weather[0].main}</p>
                </div>

                <div className="flex flex-row justify-center">
                    <div className="text-[8rem] font-extralight leading-[120%] mt-1">
                        {Math.round(weather.main.temp)}
                    </div>
                    <div className="flex flex-col ml-4">
                        <p className="mt-4 text-[2.625rem] font-extralight leading-[120%]">°C</p>
                        <div className="mt-[1.625rem] text-center flex flex-col items-center">
                            <p className="text-base font-extralight leading-[120%] flex items-center">
                                <Image src="/icons/stash_arrow-up-light.svg" alt="Arrow Up" width={16} height={16} />
                                <span>{Math.round(weather.main.temp_max)}°</span>
                            </p>
                            <p className="text-base font-extralight leading-[120%] flex items-center">
                                <Image src="/icons/stash_arrow-down-light.svg" alt="Arrow Down" width={16} height={16} />
                                <span>{Math.round(weather.main.temp_min)}°</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <Image src={icon} alt="Weather Icon" width={176} height={176} />
                </div>

                <div className="flex justify-center gap-6 md:gap-[3rem] flex-wrap md:flex-row mt-6 md:mt-4">
                    {Object.entries(forecast).map(([period, data]) => (
                        <div key={period} className="w-[5.75rem] flex flex-col items-center justify-center">
                            <p className="text-[1.25rem] font-extralight leading-[120%]">
                                {capitalize(period)}
                            </p>
                            <Image
                                src={`/icons/${getTimeOfDayIcon(period)}`}
                                alt={data.description}
                                width={48}
                                height={48}
                                className="mt-4"
                            />
                            <p className="text-[1.25rem] font-extralight leading-[120%] mt-4">{data.temp}°C</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center md:flex-row flex-wrap mt-6 md:mt-16 px-[3.313rem]">
                    <div className="text-[1.25rem] font-extralight leading-[120%]">
                        <p>Wind speed</p>
                        <p className="mt-2">{weather.wind.speed} m/s</p>
                    </div>

                    <div className="w-[1px] h-8 self-center bg-[#DFE4EA] mx-[0.8rem]" />

                    <div className="text-[1.25rem] font-extralight leading-[120%]">
                        <p>Sunrise</p>
                        <p className="mt-2">
                            {formatTimeToAMPM(weather.sys.sunrise)}
                        </p>
                    </div>

                    <div className="w-[1px] h-8 self-center bg-[#DFE4EA] mx-[0.8rem] hidden md:block" />

                    <div className="text-[1.25rem] font-extralight leading-[120%] mx-[0.3rem] md:mx-0 mt-[1rem] md:mt-0">
                        <p>Sunset</p>
                        <p className="mt-2">
                            {formatTimeToAMPM(weather.sys.sunset)}
                        </p>
                    </div>

                    <div className="w-[1px] h-8 self-center bg-[#DFE4EA] mx-[0.8rem] mt-[1rem] md:mt-0" />

                    <div className="text-[1.25rem] font-extralight leading-[120%] mt-[1rem] md:mt-0">
                        <p>Humidity</p>
                        <p className="mt-2">{weather.main.humidity}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
