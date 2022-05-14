export const cls = (...classnames: any[]) => {
  return classnames.filter((v) => !!v).join(' ');
};
