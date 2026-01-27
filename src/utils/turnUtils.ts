export const isWithinSchedule = (
  now: Date,
  start: string,
  end: string
) => {
  return now >= new Date(start) && now <= new Date(end);
};
