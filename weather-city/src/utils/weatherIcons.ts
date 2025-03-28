export function getWeatherIcon(condition: string): string {
    const normalized = condition.toLowerCase();

    switch (normalized) {
        case 'clear':
            return 'BsSun.svg';
        case 'clouds':
            return 'BsClouds.svg';
        case 'rain':
            return 'BsCloudRain.svg';
        case 'drizzle':
            return 'BsCloudDrizzle.svg';
        case 'thunderstorm':
            return 'BsLightningRain.svg';
        case 'snow':
            return 'BsCloudSnow.svg';
        case 'mist':
        case 'fog':
        case 'haze':
            return 'BsCloudFog.svg';
        default:
            return 'BsCloud.svg';
    }
}