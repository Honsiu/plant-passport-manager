import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import PassportCard from "./PassportCard";
import PassportInput from "./PassportInput";
import splitB from "./splitB";
import PrintPreview from "./PrintPreview";
import { passportInfoType } from "./types";

export default function App() {
  const [a, setA] = useState<string>(() => {
    const saved = localStorage.getItem("passportInfo");
    if (saved) {
      return JSON.parse(saved).a;
    }
    return "";
  });
  const [b, setB] = useState<string>(() => {
    const saved = localStorage.getItem("passportInfo");
    if (saved) {
      return JSON.parse(saved).b;
    }
    return "";
  });
  const [c, setC] = useState<string>(() => {
    const saved = localStorage.getItem("passportInfo");
    if (saved) {
      return JSON.parse(saved).c;
    }
    return "";
  });
  const [d, setD] = useState<string>(() => {
    const saved = localStorage.getItem("passportInfo");
    if (saved) {
      return JSON.parse(saved).d;
    }
    return "";
  });
  const [barcode, setBarcode] = useState<string>(() => {
    const saved = localStorage.getItem("passportInfo");
    if (saved) {
      return JSON.parse(saved).d;
    }
    return "";
  });
  const passportInfo: passportInfoType = {
    a: a,
    b: b,
    c: c,
    barcode: "To be developed",
    d: d,
  };
  useEffect(() => {
    localStorage.getItem("passportInfo");
  }, [passportInfo]);
  const handleSavePassportInfo = () => {
    localStorage.setItem("passportInfo", JSON.stringify(passportInfo));
  };

  const templates = [1, 2, 3];
  const [template, setTemplate] = useState(1);

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
