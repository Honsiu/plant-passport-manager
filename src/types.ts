export type passportDataType = {
  info: passportInfoType;
  template: number;
};
export type passportInfoType = {
  a: string;
  b: string;
  c: string;
  barcode?: string;
  d: string;
};

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
