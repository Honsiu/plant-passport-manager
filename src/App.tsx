import { JSX, MouseEvent, useState } from "react";
import "./App.css";
import PassportCard from "./PassportCard";
import PassportInput from "./PassportInput";
import splitB from "./splitB";
import PrintPreview from "./PrintPreview";

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const passportInfo = { a: a, b: b, c: c, d: d };
  const [template, setTemplate] = useState(1);
  const templates = [1, 2, 3];
  const [barcode, setBarcode] = useState<string>("");
  const handleOnClick = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    setTemplate(parseInt(e.target.id.split("-")[1]));
  };

  const emptyInfo: string[] = [];
  passportInfo.a === "" ? emptyInfo.push("A, ") : emptyInfo;
  splitB(passportInfo.b)[0] === "" || splitB(passportInfo.b)[0][1] === ""
    ? emptyInfo.push("B, ")
    : emptyInfo;
  passportInfo.c === "" ? emptyInfo.push("C, ") : emptyInfo;
  passportInfo.d === "" ? emptyInfo.push("D") : emptyInfo;

  return (
    <main>
      <section>
        <PassportInput info={a} setInfo={setA} letter="A" />
        <PassportInput info={b} setInfo={setB} letter="B" />
        <PassportInput
          info={c}
          setInfo={setC}
          letter="C"
          setBarcode={setBarcode}
        />
        <PassportInput info={d} setInfo={setD} letter="D" />
        {templates.map((value) => {
          return (
            <TemplateRadio
              key={value}
              template={template}
              num={value}
              handleOnClick={handleOnClick}
            />
          );
        })}
        {emptyInfo[0] && <p>Please insert data for {...emptyInfo.sort()}</p>}

        <PassportCard
          template={template}
          passportInfo={passportInfo}
          barcode={barcode}
        />
      </section>
      <PrintPreview
        template={template}
        passportInfo={passportInfo}
        barcode={barcode}
      />
    </main>
  );
}

function TemplateRadio({
  template,
  num,
  handleOnClick,
}: {
  template: number;
  num: number;
  handleOnClick: (e: any) => void;
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
        onClick={handleOnClick}
      />
    </p>
  );
}
