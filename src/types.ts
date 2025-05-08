export type passportInfoType = {
  label: string;
  a: string;
  b: string;
  c: string;
  barcode?: string;
  d: string;
  template: number;
};
export type passportsType = passportInfoType[];

export type printInfoType = {
  // 0 means horizontal
  rotated: number;
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
