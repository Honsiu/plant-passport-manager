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
  const b1 = splitB(passportInfo.b)[0];
  const b2 = splitB(passportInfo.b)[1];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files) {
      setPassportInfo({
        ...passportInfo,
        barcode: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  return (
    <>
      <p>
        A
        <input
          maxLength={32}
          defaultValue={passportInfo.a}
          onChange={(e) => {
            setPassportInfo({ ...passportInfo, a: e.target.value });
          }}
        />
      </p>

      <p>
        B{" "}
        <input
          maxLength={2}
          defaultValue={b1}
          onChange={(e) => {
            setPassportInfo({
              ...passportInfo,
              b: e.target.value + "-" + b2,
            });
          }}
        />
        {" - "}
        <input
          maxLength={30}
          defaultValue={b2}
          onChange={(e) => {
            b: b1 + "-" + e.target.value,
              setPassportInfo({
                ...passportInfo,
                b: b1 + "-" + e.target.value,
              });
          }}
        />
      </p>
      <p>
        C
        <input
          maxLength={32}
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
          maxLength={2}
          defaultValue={passportInfo.d}
          onChange={(e) => {
            setPassportInfo({ ...passportInfo, d: e.target.value });
          }}
        />
      </p>
    </>
  );
}
