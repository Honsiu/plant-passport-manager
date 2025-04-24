export type passportInfoType = {
  a: string;
  b: string;
  c: string;
  d: string;
};
export type PassportInputType = {
  letter: "A" | "B" | "C" | "D";
  info: React.SetStateAction<string>;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
  setBarcode?: React.Dispatch<React.SetStateAction<string>>;
};
type passportDataType = {
  info: passportInfoType;
  template: number;
};
