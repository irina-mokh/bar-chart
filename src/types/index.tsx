export type DataType = {
  date: string,
  value: number,
};

export type BarChartProps = {
  name: string,
  data: DataType[],
};

type OptionType = {
  value: string,
  title: string,
};
export type SelectProps = {
  options: Array<OptionType>,
  selected: string,
  handler: (val: string) => void,
};
