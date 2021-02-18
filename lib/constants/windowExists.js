export const windowExists =
  process.env.NODE_ENV === "production" && process.browser && window;
