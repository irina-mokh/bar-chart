export type DataType = {
  date: string,
  value: number,
};

export type RangeType = 'month' | 'year' | 'six-month';

export type BarChartProps = {
  name: string,
  data: DataType[],
};
