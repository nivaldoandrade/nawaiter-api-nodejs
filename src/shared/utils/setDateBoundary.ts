export function setDateBoundary(date: string | Date, type: 'start' | 'end') {
  if (!date) {
    return undefined;
  }
  const dateMax = new Date(date);

  if (type === 'start') {
    return new Date(dateMax.setUTCHours(0, 0, 0));
  }

  return new Date(dateMax.setUTCHours(23, 59, 59));
}
