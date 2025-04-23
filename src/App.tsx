import { MouseEvent, useState } from "react";
import "./App.css";
import PassportCard from "./PassportCard";
import PassportInput from "./PassportInput";

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const passportInfo = { a: a, b: b, c: c, d: d };

  const [template, setTemplate] = useState(1);
  const templates = [1, 2, 3];

  const handleOnClick = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    setTemplate(parseInt(e.target.id.split("-")[1]));
  };
  return (
    <main>
      <PassportInput info={a} setInfo={setA} letter="A" />
      <PassportInput info={b} setInfo={setB} letter="B" />
      <PassportInput info={c} setInfo={setC} letter="C" />
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
      <PassportCard template={template} passportInfo={passportInfo} />
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
