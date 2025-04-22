import { useState } from "react";
import PassportInfo from "./PassportInfo";
import { passportInfoType } from "./types";
import splitB from "./splitB";

export function PassportCard({
  passportInfo,
  template,
}: {
  passportInfo?: passportInfoType;
  template: number;
}) {
  const [a, setA] = useState(passportInfo?.a || "");
  const [b, setB] = useState(passportInfo?.b || "");
  const [c, setC] = useState(passportInfo?.c || "");
  const [d, setD] = useState(passportInfo?.d || "");

  const emptyInfo: Array<string> = [];
  a === "" ? emptyInfo.push("A, ") : emptyInfo;
  splitB(b)[0] === "" || splitB(b)[0][1] === ""
    ? emptyInfo.push("B, ")
    : emptyInfo;
  c === "" ? emptyInfo.push("C, ") : emptyInfo;
  d === "" ? emptyInfo.push("D") : emptyInfo;

  return (
    <>
      {emptyInfo[0] && <p>Please insert data for {...emptyInfo.sort()}</p>}
      <div id="passport-card" className={"template-" + template.toString()}>
        <img src="./flag_black_white.svg" id="flag" alt="Flaga UE" />
        <p id="passport-label">Paszport roślin / Plant Passport</p>
        <PassportInfo letter={"A"} info={a} setInfo={setA} />
        <PassportInfo letter={"B"} info={b} setInfo={setB} />
        <PassportInfo letter={"C"} info={c} setInfo={setC} />
        <PassportInfo letter={"D"} info={d} setInfo={setD} />
      </div>
    </>
  );
}
