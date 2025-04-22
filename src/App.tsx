import { MouseEvent, useState } from "react";
import "./App.css";
import { PassportCard } from "./PassportCard";

export default function App() {
  const [template, setTemplate] = useState(1);
  const handleOnClick = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    setTemplate(parseInt(e.target.id.split("-")[1]));
  };
  const templates = [1, 2, 3, 4];
  return (
    <main>
      <TemplateRadio
        handleOnClick={handleOnClick}
        template={template}
        num={1}
        key={1}
      />
      <TemplateRadio
        handleOnClick={handleOnClick}
        template={template}
        num={2}
        key={2}
      />
      <TemplateRadio
        handleOnClick={handleOnClick}
        template={template}
        num={3}
        key={3}
      />
      <TemplateRadio
        handleOnClick={handleOnClick}
        template={template}
        num={4}
        key={4}
      />
      <section>
        <PassportCard template={template} />
      </section>
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
      <label htmlFor="template1">Template {num}</label>
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
