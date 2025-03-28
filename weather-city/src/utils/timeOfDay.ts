export function getTimeOfDayIcon(period: string) {
    const normalized = period.toLowerCase();

    switch (normalized) {
        case 'dawn':
            return 'BsCloudMoon.svg';
        case 'morning':
            return 'BsSun.svg';
        case 'afternoon':
            return 'BsCloudSun.svg';
        case 'night':
            return 'BsMoon.svg';
        default:
            return 'BsCloud.svg';
    }
}