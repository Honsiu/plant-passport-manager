import { SetStateAction } from "react";
import { passportInfoType } from "./types";
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
  function handleOnChange(
    letter: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setPassportInfo({ ...passportInfo, [letter]: e.target.value });
  }
  return (
    <>
      <p>
        A
        <input
          maxLength={32}
          defaultValue={passportInfo.a}
          onChange={(e) => {
            handleOnChange("a", e);
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
            handleOnChange("c", e);
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
            handleOnChange("d", e);
          }}
        />
      </p>
    </>
  );
}
