export type passportInfoType = {
  a: string;
  b: string;
  c: string;
  d: string;
};
export type passportInputType = {
  letter: "A" | "B" | "C" | "D";
  info: React.SetStateAction<string>;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
};
