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


export const formatDateValue = (date, currentLanguage) => {
  const dateValues = new Date(date);

  // Define options for date formatting based on the selected language
  const dateOptions = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }; 

  // Define options for time formatting
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: currentLanguage === 'en', 
    timeZone: 'UTC',
  };

  // Format the date and time
  const formattedDate = dateValues.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', dateOptions);
  const formattedTime = dateValues.toLocaleTimeString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', timeOptions);

  // Capitalize the first letter of the month for French
  const capitalizeMonth = (dateStr) => {
    return dateStr.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const finalDate = currentLanguage === 'fr'
    ? capitalizeMonth(formattedDate) // Capitalize first letter for French date
    : formattedDate;

  // Combine formatted date and time
  return currentLanguage === 'fr'
    ? `${finalDate?.replace('.' , '')} à ${formattedTime}` // French format
    : `${finalDate} ${formattedTime}`; // English format
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function parseDateString(dateString) {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}


export const formatPrice = (price, currentLanguage) => {
  if (price === 0) {
      return currentLanguage === 'fr' ? 'Gratuit' : 'Free';
  } else {
      const formattedPrice = new Intl.NumberFormat(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
          style: 'currency',
          currency: currentLanguage === 'fr' ? 'EUR' : 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      }).format(price);

      return currentLanguage === 'fr' ? `À partir de ${formattedPrice}` : `From ${formattedPrice}`;
  }
};