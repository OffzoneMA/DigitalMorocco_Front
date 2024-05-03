export function formatNumber(number) {
    const separator = ',';
    if(number) {
    const numberString = number.toString();
    const parts = numberString.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
    }
  }