export function formatPrice(price: number, currency = 'ر.س'): string {
  const formatted = new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return `${formatted} ${currency}`;
}

export function formatPriceEn(price: number, currency = 'SAR'): string {
  return `${price.toLocaleString('en-US')} ${currency}`;
}
