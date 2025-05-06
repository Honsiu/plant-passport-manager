import { SetStateAction } from "react";
import { passportInfoType, PassportInputType } from "./types";
import splitB from "./splitB";

export default function PassportForm({
  passportInfo,
  setPassportInfo,
}: {
  passportInfo: passportInfoType;
  setPassportInfo: React.Dispatch<SetStateAction<passportInfoType>>;
}) {
  const [b1, b2] = splitB(passportInfo.b);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files) {
      setPassportInfo({
        ...passportInfo,
        barcode: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  let maxLength = 16;
  return (
    <>
      <p>
        A
        <input
          maxLength={maxLength}
          defaultValue={passportInfo.a}
          onChange={(e) => {
            setPassportInfo({ ...passportInfo, a: e.target.value });
          }}
        />
      </p>

      <p>
        B <input maxLength={maxLength} defaultValue={b1} onChange={(e) => {}} />
        {" - "}
        <input
          maxLength={16}
          defaultValue={b2}
          onChange={(e) => {
            setPassportInfo({ ...passportInfo, d: e.target.value + "-" + b2 });
          }}
        />
      </p>
      <p>
        C
        <input
          maxLength={maxLength}
          defaultValue={passportInfo.c}
          onChange={(e) => {
            setPassportInfo({ ...passportInfo, c: e.target.value });
          }}
        />{" "}
        Or{" "}
        <input type="file" name="barcode-input" onChange={handleFileChange} />
      </p>
      <p>
        D
        <input
          maxLength={maxLength}
          defaultValue={passportInfo.d}
          onChange={(e) => {
            setPassportInfo({ ...passportInfo, d: e.target.value });
          }}
        />
      </p>
    </>
  );
}
