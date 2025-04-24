import { passportInfoType } from "./types";
import splitB from "./splitB";

export default function PassportCard({
  passportInfo,
  template,
  barcode,
}: {
  passportInfo: passportInfoType;
  template: number;
  barcode: string;
}) {
  const emptyInfo: Array<string> = [];
  passportInfo.a === "" ? emptyInfo.push("A, ") : emptyInfo;
  splitB(passportInfo.b)[0] === "" || splitB(passportInfo.b)[0][1] === ""
    ? emptyInfo.push("B, ")
    : emptyInfo;
  passportInfo.c === "" ? emptyInfo.push("C, ") : emptyInfo;
  passportInfo.d === "" ? emptyInfo.push("D") : emptyInfo;
  return (
    <>
      {emptyInfo[0] && <p>Please insert data for {...emptyInfo.sort()}</p>}
      <div id="passport-card" className={"template-" + template.toString()}>
        <div id="passport-heading">
          <img src="./flag_black_white.svg" id="flag" alt="Flaga UE" />
          <p id="passport-label">Paszport roślin / Plant Passport</p>
        </div>
        <div id="passport-data">
          <p className="passport-info">{"A " + passportInfo.a}</p>
          <p className="passport-info">{"B " + passportInfo.b}</p>
          <p className="passport-info">
            {"C " + passportInfo.c}
            {barcode !== "" && (
              <img src={barcode} className="passport-barcode" />
            )}
          </p>
          <p className="passport-info">{"D " + passportInfo.d}</p>
        </div>
      </div>
    </>
  );
}
