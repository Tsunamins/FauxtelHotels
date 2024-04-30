export const generateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return [];
    const date = new Date(startDate.getTime());
    const dates = [];

    while (date <= endDate) {
        dates.push(new Date(date).toISOString("default", { year: "numeric", month: "2-digit", day: "2-digit" }).split(/[T ]/i, 1)[0]);
        date.setDate(date.getDate() + 1);
    }
    return dates;
};

export const checkAvailableRooms = (rooms, filledRange) => {
    let currentMatches = [];
    rooms.map((room) => {
        const occupiedDates = room.attributes.occupied_dates;
        if (room.attributes.reservations.length < 1) currentMatches.push(room);
        if (occupiedDates.length > 0) {
            if (!filledRange.some(date => occupiedDates.includes(date))) currentMatches.push(room);

        }
    })
    return currentMatches;
};
