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

export function formatDate(dateString) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short', // 'Oct'
    day: 'numeric', // '10'
    year: 'numeric', // '2024'
    timeZone: 'UTC', // Utiliser le temps universel
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', // '10'
    minute: '2-digit', // '08'
    second: '2-digit', // '11'
    hour12: true, // AM/PM format
    timeZone: 'UTC', // Utiliser le temps universel
  });

  return `${formattedDate} ${formattedTime}`;
}


export const formatDateValue = (date) => {
  const dateValues = new Date(date);
  
  const options = { month: 'short', day: 'numeric', year: 'numeric',timeZone: 'UTC', };
  
  const timeOptions = {
    hour: '2-digit', // Pour afficher l'heure avec deux chiffres
    minute: '2-digit', // Pour afficher les minutes avec deux chiffres
    second: '2-digit', // Pour afficher les secondes avec deux chiffres
    hour12: true, // Utilise AM/PM
    timeZone: 'UTC',
  };
  
  return `${dateValues.toLocaleDateString('en-US', options)} ${dateValues.toLocaleTimeString('en-US', timeOptions)}`;
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function parseDateString(dateString) {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}
