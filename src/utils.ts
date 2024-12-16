export function formatCurrency(value: string | number): string {
    // Ensure the value is treated as a number
    const num = typeof value === 'number' ? value : parseFloat(value);

    // Check if the parsed value is a valid number
    if (isNaN(num)) {
        return '--';
    }

    // Format the number to two decimal places and insert commas
    const str = num.toFixed(2);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}