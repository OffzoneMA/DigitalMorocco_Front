import TagManager from 'react-gtm-module';

const GTM_ID = process.env.REACT_APP_GTM_ID || 'GTM-WGWWRDX2';

export const initGTM = () => {
    if (!GTM_ID) {
      console.warn('[GTM] Aucun identifiant GTM fourni.');
      return;
    }
  
    TagManager.initialize({
      gtmId: GTM_ID,
      dataLayer: {
        userProject: 'Digital Morocco',
        environment: process.env.NODE_ENV,
      },
      dataLayerName: 'dataLayer',
    });
  
  };
  