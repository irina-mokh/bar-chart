import { DataType, RangeType } from '../types';

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export const MS_RANGES = {
  month: {
    ms: 1000 * 60 * 60 * 24 * 30,
  },
};

export const getValuesByRange = (range: RangeType, data: DataType[]) => {
  const valuesFromPeriod = data.filter(
    (item: DataType) => +new Date() - +new Date(item.date) < MS_RANGES.month.ms
  );

  console.log('values by period:', valuesFromPeriod);
  const result: Array<DataType> = [];

  const today = new Date();
  const curY = today.getFullYear();
  const curM = today.getMonth();

  const periods = daysInMonth(curY, curM);

  for (let i = 0; i < periods; i++) {
    const curDate = new Date(curY, curM, today.getDate() - i).toISOString().slice(0, 10);

    let sum = 0;
    valuesFromPeriod
      .filter((item) => item.date.slice(0, 10) === curDate)
      .map((item) => {
        sum += +item.value;
      });

    result.unshift({
      date: curDate,
      value: sum,
    });
  }

  return result;
};
