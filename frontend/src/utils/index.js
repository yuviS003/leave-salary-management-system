import { addDays, differenceInDays, isAfter, parseISO } from "date-fns";

const getCurrentDateFormatted = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isDateMoreThan7DaysFromNow = (dateStr) => {
  const currentDate = new Date();
  const minDate = addDays(currentDate, 7);
  const inputDate = parseISO(dateStr);

  return isAfter(inputDate, minDate);
};

const checkDatesAndDifference = (dateStr1, dateStr2) => {
  const date1 = parseISO(dateStr1);
  const date2 = parseISO(dateStr2);

  const isSecondDateAfterFirst = isAfter(date2, date1);
  const daysDifference = differenceInDays(date2, date1);

  return {
    isSecondDateAfterFirst,
    daysDifference,
  };
};

export {
  getCurrentDateFormatted,
  isDateMoreThan7DaysFromNow,
  checkDatesAndDifference,
};
