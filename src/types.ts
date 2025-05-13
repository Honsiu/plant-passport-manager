export type passportType = {
  label: string;
  a: string;
  b: string;
  c: string;
  barcode?: string;
  d: string;
  template: number;
};
export type passportsType = passportType[];

export type printInfoType = {
  // 0 means horizontal
  orientation: number;
  count: number;
  grid: {
    rows: number;
    columns: number;
  };
  gap: {
    horizontal: number;
    vertical: number;
  };
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};
