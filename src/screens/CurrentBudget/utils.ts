export const getDateString = (baseDate = new Date()) => {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1;
  const day = baseDate.getDate();
  return `${month}.${day}.${year}`;
}