export const formatCurrency = (value: number, decimals: number = 2): string => {
  return `$${value.toFixed(decimals)}`;
};

export const formatMarketCap = (value: number): string => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  return formatCurrency(value);
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatRatio = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

export const formatPrice = (value: number | undefined): string => {
  return value ? formatCurrency(value) : '--';
};