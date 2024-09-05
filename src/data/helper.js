/**
 * Format a number with commas as thousand separators.
 * 
 * @param {number|string} number 
 * @returns {string}
 */
export function formatNumber(number) {
  if (number !== null && number !== undefined) {
      const separator = ',';
      const numberString = number.toString();
      const parts = numberString.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
  }
  return '';
}

export function getLocalStorageItemWithExpiration(key) {
  const now = new Date().getTime();
  const expirationDate = localStorage.getItem('expirationDate');
  
  if (expirationDate && now > expirationDate) {
    // Si la date d'expiration est passée, supprimer les données
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationDate');
    return null;
  }
  
  return localStorage.getItem(key);
}

export function formatDate (dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short', // 'Jun'
      day: 'numeric', // '6'
      year: 'numeric', // '2023'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit', // '02'
      minute: '2-digit', // '37'
      second: '2-digit', // '22'
      hour12: true, // 12-hour format with AM/PM
  });
  return `${formattedDate} ${formattedTime}`;
};
