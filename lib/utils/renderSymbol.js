export const renderSymbol = (num) =>
  (
    (num > 0 ? "+" : num < 0 ? "-" : "") + Math.abs(num).toFixed(2)
  ).toLocaleString();
