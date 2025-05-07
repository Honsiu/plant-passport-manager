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
  const [b1, b2] = splitB(passportInfo.b || "");
  const templates = [1, 2, 3];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files) {
      setPassportInfo({
        ...passportInfo,
        barcode: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  function handleOnInputChange(
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setPassportInfo({ ...passportInfo, [name]: e.target.value });
  }

  const handleSavePassportInfo = () => {
    localStorage.setItem("passportInfo", JSON.stringify(passportInfo));
  };

  return (
    <>
      <p>
        A
        <input
          maxLength={32}
          defaultValue={passportInfo.a}
          onChange={(e) => {
            handleOnInputChange("a", e);
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
            handleOnInputChange("c", e);
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
            handleOnInputChange("d", e);
          }}
        />
      </p>
      {templates.map((value) => {
        return (
          <TemplateRadio
            key={value}
            template={passportInfo.template}
            num={value}
          />
        );
      })}
      <EmptyInfoWarning passportInfo={passportInfo} />
      <button type="submit" onClick={handleSavePassportInfo}>
        Save
      </button>
    </>
  );

  function TemplateRadio({
    template = 1,
    num,
  }: {
    template: number;
    num: number;
  }) {
    return (
      <p>
        <label htmlFor={"template-" + num}>Template {num}</label>
        <input
          type="radio"
          name="template"
          id={"template-" + num}
          checked={template === num}
          onChange={() => {
            setPassportInfo({ ...passportInfo, template: num });
          }}
        />
      </p>
    );
  }
}

function EmptyInfoWarning({
  passportInfo,
}: {
  passportInfo: passportInfoType;
}) {
  const emptyInfo: string[] = [];
  passportInfo.a === "" ? emptyInfo.push("A") : emptyInfo;
  splitB(passportInfo.b).includes("") ? emptyInfo.push("B") : emptyInfo;
  passportInfo.c === "" ? emptyInfo.push("C") : emptyInfo;
  passportInfo.d === "" ? emptyInfo.push("D") : emptyInfo;
  if (emptyInfo[0]) {
    return <p>Please insert data for {emptyInfo.sort().join(", ")}</p>;
  }
}
