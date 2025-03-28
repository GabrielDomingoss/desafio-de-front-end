import { ForecastPeriod } from "./forecastPeriod";

interface WindProps {
    speed: number
}

interface MainProps {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
}

interface WeatherResponseProps {
    description: string;
    icon: string;
    main: string;
}

interface SysProps {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherResponse {
    name: string;
    sys: SysProps;
    weather: WeatherResponseProps[];
    main: MainProps;
    wind: WindProps;
    forecast?: {
        dawn?: ForecastPeriod;
        morning?: ForecastPeriod;
        afternoon?: ForecastPeriod;
        night?: ForecastPeriod;
    }
}