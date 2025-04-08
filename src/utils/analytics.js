import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-HCLYS6NFVW");
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