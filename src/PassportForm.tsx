import { SetStateAction } from "react";
import { passportInfoType } from "./types";
import splitB from "./splitB";

export default function PassportForm({
  tempPassportInfo,
  setTempPassportInfo,
  handleSave,
  handleCancel,
  handleRemove,
}: {
  tempPassportInfo: passportInfoType;
  setTempPassportInfo: React.Dispatch<SetStateAction<passportInfoType>>;
  handleSave: () => void;
  handleCancel: () => void;
  handleRemove: () => void;
}) {
  const [b1, b2] = splitB(tempPassportInfo.b || "");
  const templates = [1, 2, 3];
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files) {
      setTempPassportInfo({
        ...tempPassportInfo,
        barcode: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleInputOnChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTempPassportInfo({ ...tempPassportInfo, [name]: e.target.value });
  };

  return (
    <>
      <p>
        Label
        <input
          maxLength={32}
          value={tempPassportInfo.label}
          onChange={(e) => {
            handleInputOnChange("label", e);
          }}
        />
      </p>
      <p>
        A
        <input
          maxLength={32}
          value={tempPassportInfo.a}
          onChange={(e) => {
            handleInputOnChange("a", e);
          }}
        />
      </p>

      <p>
        B{" "}
        <input
          maxLength={2}
          value={b1}
          onChange={(e) => {
            setTempPassportInfo({
              ...tempPassportInfo,
              b: e.target.value + "-" + b2,
            });
          }}
        />
        {" - "}
        <input
          maxLength={30}
          value={b2}
          onChange={(e) => {
            b: b1 + "-" + e.target.value,
              setTempPassportInfo({
                ...tempPassportInfo,
                b: b1 + "-" + e.target.value,
              });
          }}
        />
      </p>
      <p>
        C
        <input
          maxLength={32}
          value={tempPassportInfo.c}
          onChange={(e) => {
            handleInputOnChange("c", e);
          }}
        />{" "}
        Or{" "}
        <input type="file" name="barcode-input" onChange={handleFileChange} />
      </p>
      <p>
        D
        <input
          maxLength={2}
          value={tempPassportInfo.d}
          onChange={(e) => {
            handleInputOnChange("d", e);
          }}
        />
      </p>
      {templates.map((value) => {
        return (
          <TemplateRadio
            key={value}
            template={tempPassportInfo.template}
            num={value}
          />
        );
      })}
      <EmptyInfoWarning passportInfo={tempPassportInfo} />
      <button type="submit" onClick={handleSave}>
        Save
      </button>
      <button type="submit" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" onClick={handleRemove}>
        Remove
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
            setTempPassportInfo({ ...tempPassportInfo, template: num });
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
  !passportInfo.b || splitB(passportInfo.b).includes("")
    ? emptyInfo.push("B")
    : emptyInfo;
  passportInfo.c === "" ? emptyInfo.push("C") : emptyInfo;
  passportInfo.d === "" ? emptyInfo.push("D") : emptyInfo;
  if (emptyInfo[0]) {
    return <p>Please insert data for {emptyInfo.sort().join(", ")}</p>;
  }
}
