export const selectOptions = [
  { value: 'month', title: 'за последний месяц' },
  { value: 'year', title: 'за последний год' },
  { value: 'six-month', title: 'за последние 6 месяцев' },
];

export const MS_RANGES = {
  month: {
    ms: 1000 * 60 * 60 * 24 * 30,
  },
  //TODO: add year and 6 month
};
