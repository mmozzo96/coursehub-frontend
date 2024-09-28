export const msToTimeFormat = (ms: number) => {
    const oneDayInMs = 86400000;
    const oneHourInMs = 3600000;
    const oneMinuteInMs = 60000;

    const days = Math.floor(ms / oneDayInMs);
    const hours = Math.floor((ms % oneDayInMs) / oneHourInMs);
    const minutes = Math.floor((ms % oneHourInMs) / oneMinuteInMs);
    const seconds = Math.floor((ms % oneMinuteInMs) / 1000);

    return `${days ? days + "d " : ""}${doubleDigit(hours)}h ${doubleDigit(
        minutes
    )}m ${doubleDigit(seconds)}s`;
};

const doubleDigit = (number: number) => {
    return ("00" + number).slice(-2);
};
