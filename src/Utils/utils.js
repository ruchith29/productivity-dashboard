export function getTimeDifferenceInHours(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMs = end - start;

    if (isNaN(diffMs)) {
        return null;
    }

    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours.toFixed(4);
}

export function getCurrentTime() {
    const currentDate = new Date();
    return currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString();
}