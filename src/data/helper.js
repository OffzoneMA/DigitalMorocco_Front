import { format, parse  , isValid  } from 'date-fns';
import { fr , enUS } from 'date-fns/locale';


const currentLanguage = localStorage.getItem('language') || 'en'; 


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


export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: currentLanguage === 'en' // 12-hour format for English, 24-hour for French
  };

  const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-US';

  // Format and capitalize the month for French
  let formattedDate = date.toLocaleString(locale, options);
  if (currentLanguage === 'fr') {
    // Extracting day, month, and year by splitting
    const [day, month, year, time] = formattedDate.split(/,?\s+/);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    // Reassemble with the capitalized month
    formattedDate = `${day} ${capitalizedMonth} ${year}, ${time}`;
  }

  return formattedDate?.replace('.' , '');
}


export const formatDateValue = (date, currentLanguage) => {
  const dateValues = new Date(date);

  // Define options for date formatting based on the selected language
  const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' }; 

  // Define options for time formatting
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: currentLanguage === 'en'
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
          currency: 'USD',
          currencyDisplay: 'narrowSymbol',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      }).format(price);

      return `${formattedPrice}`;
  }
};


export const formatEventStartEndDate = (event , t) => {
  const currentLocale = currentLanguage === 'fr' ? fr : enUS;

  const startDate = event?.startDate ? new Date(event.startDate) : null;
  const endDate = event?.endDate ? new Date(event.endDate) : null;

  const startTime = event?.startTime; // Assuming startTime is in format 'hh:mm AM/PM'
  const endTime = event?.endTime; // Assuming endTime is in format 'hh:mm AM/PM'

  // Format the start date
  const formattedStartDate = startDate && isValid(startDate)
      ? format(startDate, currentLanguage === 'fr' ? 'eee dd MMM yyyy' : 'eee, MMM d, yyyy', { locale: currentLocale })
      : t("event.comingSoon");

  // Format the end date
  const formattedEndDate = endDate && isValid(endDate)
      ? format(endDate, currentLanguage === 'fr' ? 'eee dd MMM yyyy' : 'eee, MMM d, yyyy', { locale: currentLocale })
      : startDate && isValid(startDate)
          ? format(startDate, currentLanguage === 'fr' ? 'eee dd MMM yyyy' : 'eee, MMM d, yyyy', { locale: currentLocale })
          : t("event.comingSoon");

  // Function to format time from 'hh:mm AM/PM'
  const formatTimeFromString = (time) => {
      if (!time) return ''; // If no time is provided, return an empty string

      // Parse the time and set hours and minutes
      const [timePart, modifier] = time.split(' '); // Split the time and AM/PM part
      let [hours, minutes] = timePart.split(':').map(Number); // Split the time into hours and minutes
      
      // Convert to 24-hour format if it's PM and hours are not 12
      if (modifier === 'PM' && hours < 12) {
          hours += 12;
      }
      // Handle the case for 12 AM
      if (modifier === 'AM' && hours === 12) {
          hours = 0;
      }

      // Create a new Date object for formatting the time
      const date = new Date(startDate); // Use startDate or endDate as needed
      date.setHours(hours, minutes); // Set the hours and minutes

      const timeOptions = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: currentLanguage === 'en', // Use 12-hour format for English
          hourCycle: 'h11' // Set to 12-hour format for en-US
      };

      let formattedTime = date.toLocaleTimeString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', timeOptions);
      if (currentLanguage === 'fr') {
          formattedTime = formattedTime.replace(':', 'H'); // Change ':' to 'H' for French
      }

      return formattedTime;
  };

  // Capitalize the first letter of the formatted date for French
  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Construct the final output with the correct formatting
  return {
    formattedStart: (currentLanguage === 'fr' && isValid(startDate))
        ? `${capitalizeFirstLetter(formattedStartDate.replace('.', ''))?.replace('.', '')} à ${formatTimeFromString(startTime)}`
        : `${capitalizeFirstLetter(formattedStartDate.replace('.', ''))?.replace('.', '')} ${formatTimeFromString(startTime)}`,
    
    formattedEnd: (currentLanguage === 'fr' && isValid(endDate))
        ? `${capitalizeFirstLetter(formattedEndDate.replace('.', ''))?.replace('.', '')} à ${formatTimeFromString(endTime)}`
        : `${capitalizeFirstLetter(formattedEndDate.replace('.', ''))?.replace('.', '')} ${formatTimeFromString(endTime)}`,
};
};

export function formatEventTime(startDate, endDate, startTime, endTime , t) {
  const locale = currentLanguage === 'fr' ? fr : enUS;

  if (!startDate || !endDate || !startTime || !endTime || startTime === '' || endTime === '') {
      return currentLanguage === 'fr' ? '24 heures par jour, 7 jours par semaine' : '24 hours a day, 7 days a week';
  } else {
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      // Check if the start and end dates are the same
      if (startDateTime.getDate() === endDateTime.getDate() &&
          startDateTime.getMonth() === endDateTime.getMonth() &&
          startDateTime.getFullYear() === endDateTime.getFullYear()) {
          const gmtOffset = -startDateTime.getTimezoneOffset() / 60; // GMT offset in hours
          const gmt = `GMT${gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset}`; // Format GMT offset

          const formattedStartTime = format(parse(startTime, 'h:mm a', new Date()), currentLanguage === 'fr' ? 'H:mm' : 'h:mm a', { locale });
          const formattedEndTime = format(parse(endTime, 'h:mm a', new Date()), currentLanguage === 'fr' ? 'H:mm' : 'h:mm a', { locale });

          return currentLanguage === 'fr'
              ? `De ${formattedStartTime.replace(':', 'h')} à ${formattedEndTime.replace(':', 'h')} ${gmt}` // French format with 'h'
              : `${formattedStartTime} - ${formattedEndTime} ${gmt}`; // English format
      } else {
          const parsedTime = parse(startTime, 'h:mm a', new Date());
          const formattedParsedTime = format(parsedTime, currentLanguage === 'fr' ? 'H:mm' : 'h:mm a', { locale });

          return currentLanguage === 'fr'
              ? formattedParsedTime.replace(':', 'h').toUpperCase() // For French format: replace ':' with 'h'
              : formattedParsedTime.toUpperCase(); // For English format
      }
  }
}

function capitalizeAndClean(dateString) {
  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
}


export function formatEventDate(startDate, endDate , t) {
  const locale = currentLanguage === 'fr' ? fr : enUS;

  if (!startDate || !endDate) {
      return t("event.comingSoon");
  } else {
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      // Check if the start and end dates are the same
      if (startDateTime.getDate() === endDateTime.getDate() &&
          startDateTime.getMonth() === endDateTime.getMonth() &&
          startDateTime.getFullYear() === endDateTime.getFullYear()) {
          const formattedDate = format(startDateTime, currentLanguage === 'fr' ? 'EEEE d MMMM yyyy' : 'EEEE, MMMM d, yyyy', { locale });
          return capitalizeAndClean(formattedDate);
      } else {
          const formattedStartDate = format(startDateTime, currentLanguage === 'fr' ? 'EEE d MMMM yyyy' : 'EEE, MMM d, yyyy', { locale });
          return capitalizeAndClean(formattedStartDate)?.replace('.', '');
      }
  }
}


export function formatEventDateTime(startDate, endDate, startTime, endTime , t) {
  const locale = currentLanguage === 'fr' ? fr : enUS;

  // Check for missing values
  if (!startDate || !endDate || !startTime || !endTime || startTime === '' || endTime === '') {
      return t("event.comingSoon");
  }

  try {
      const parsedStartTime = parse(startTime, 'h:mm a', new Date());
      const parsedEndTime = parse(endTime, 'h:mm a', new Date());

      // Format time based on language
      const formattedStartTime = format(parsedStartTime, currentLanguage === 'fr' ? 'HH:mm' : 'ha', { locale }).toLowerCase();
      const formattedEndTime = format(parsedEndTime, currentLanguage === 'fr' ? 'HH:mm' : 'ha', { locale }).toLowerCase();

      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      // Calculate GMT offset in hours
      const gmtOffset = -startDateTime.getTimezoneOffset() / 60; // Offset in hours
      const gmt = `GMT${gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset}`;

      // Check if start and end dates are the same
      if (startDateTime.getDate() === endDateTime.getDate() &&
          startDateTime.getMonth() === endDateTime.getMonth() &&
          startDateTime.getFullYear() === endDateTime.getFullYear()) {
          
          // Format date for the same day
          const formattedDate = format(startDateTime, currentLanguage === 'fr' ? 'EEEE d MMMM' : 'EEEE, MMMM d', { locale });
          
          // Capitalize the first letter of the day and month correctly
          const formattedDateCapitalized = formattedDate.replace(/^(.)/, (char) => char.toUpperCase()).replace(/(\b\w)/g, (char, index) => {
              if (currentLanguage === 'fr' && index > 0 && formattedDate[index - 1] === ' ') {
                  return char.toUpperCase(); // Capitalize the first letter after a space for French
              }
              return char; // Keep other characters as they are
          });

          return `${formattedDateCapitalized.replace(/\./g, '')} • ${formattedStartTime} - ${formattedEndTime} ${gmt}`;
      } else {
          // Format date for different days
          const formattedStartDate = format(startDateTime, currentLanguage === 'fr' ? 'EEE d MMM yyyy' : 'EEE, MMM d, yyyy', { locale });
          
          // Capitalize the first letter correctly for French dates
          const formattedStartDateCapitalized = formattedStartDate.replace(/^(.)/, (char) => char.toUpperCase()).replace(/(\b\w)/g, (char, index) => {
              if (currentLanguage === 'fr' && index > 0 && formattedStartDate[index - 1] === ' ') {
                  return char.toUpperCase(); // Capitalize the first letter after a space for French
              }
              return char; // Keep other characters as they are
          });

          return `${formattedStartDateCapitalized.replace(/\./g, '')} • ${formattedStartTime} ${gmt}`;
      }
  } catch (error) {
      console.error('Error formatting date/time:', error);
      return currentLanguage === 'fr' ? 'Date/heure invalide' : 'Invalid Date/Time';
  }
}