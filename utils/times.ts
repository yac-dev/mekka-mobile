export namespace Times {
  export const minutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} m`;
    } else if (remainingMinutes === 0) {
      return `${hours} h`;
    } else {
      return `${hours} h ${remainingMinutes} m`;
    }
  };
}
