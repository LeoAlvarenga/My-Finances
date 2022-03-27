export const parseCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export const parseDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US').format(date);
}