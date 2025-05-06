import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import PassportCard from "./PassportCard";
import splitB from "./splitB";
import PrintPreview from "./PrintPreview";
import { passportInfoType } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import PassportForm from "./PassportForm";

export default function App() {
  const [passportInfo, setPassportInfo] = useLocalStorage("passportInfo", {
    a: "",
    b: "",
    c: "",
    barcode: "To be developed",
    d: "",
  });

  const handleSavePassportInfo = () => {
    localStorage.setItem("passportInfo", JSON.stringify(passportInfo));
  };

  const templates = [1, 2, 3];
  const [template, setTemplate] = useState(1);

  return (
    <main>
      <section>
        <PassportForm
          passportInfo={passportInfo}
          setPassportInfo={setPassportInfo}
        />
        {templates.map((value) => {
          return (
            <TemplateRadio
              key={value}
              template={template}
              num={value}
              setTemplate={setTemplate}
            />
          );
        })}
        <EmptyInfoWarning passportInfo={passportInfo} />
        <button type="submit" onClick={handleSavePassportInfo}>
          Save
        </button>
        <PassportCard
          template={template}
          passportInfo={passportInfo}
          barcode={passportInfo.barcode || ""}
        />
      </section>
      <PrintPreview
        template={template}
        passportInfo={passportInfo}
        barcode={passportInfo.barcode || ""}
      />
    </main>
  );
}

function TemplateRadio({
  template,
  num,
  setTemplate,
}: {
  template: number;
  num: number;
  setTemplate: Dispatch<SetStateAction<number>>;
}) {
  return (
    <p>
      <label htmlFor={"template-" + num}>Template {num}</label>
      <input
        type="radio"
        name="template"
        id={"template-" + num}
        checked={template === num}
        readOnly={true}
        onClick={() => {
          setTemplate(num);
        }}
      />
    </p>
  );
}
function EmptyInfoWarning({
  passportInfo,
}: {
  passportInfo: passportInfoType;
}) {
  const emptyInfo: string[] = [];
  passportInfo.a === "" ? emptyInfo.push("A, ") : emptyInfo;
  splitB(passportInfo.b)[0] === "" || splitB(passportInfo.b)[0][1] === ""
    ? emptyInfo.push("B, ")
    : emptyInfo;
  passportInfo.c === "" ? emptyInfo.push("C, ") : emptyInfo;
  passportInfo.d === "" ? emptyInfo.push("D") : emptyInfo;
  if (emptyInfo) {
    return <p>Please insert data for {...emptyInfo.sort()}</p>;
  }
}
