export const GTM_ID = "GTM-TFV6XCN";

export const pageview = (url: string) => {
  (window as any).dataLayer.push({
    event: "pageview",
    page: url,
  });
};
