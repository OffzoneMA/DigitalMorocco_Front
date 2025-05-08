import ReactGA from "react-ga4";

const GOOGLE_ANALYTICS_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || "G-HCLYS6NFVW";

export const initGA = () => {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};


export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
}