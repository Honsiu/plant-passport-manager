import { CSSProperties } from "react";
import { passportInfoType } from "./types";
import "./PassportCard.css";

export default function PassportCard({
  passportInfo,
  template,
  barcode,
  style,
}: {
  passportInfo: passportInfoType;
  template: number;
  barcode: string;
  style?: CSSProperties;
}) {
  return (
    <>
      <div
        style={style || {}}
        className={"passport-card template-" + template.toString()}
      >
        <div className="passport-heading">
          <img src="./flag_black_white.svg" className="flag" alt="Flaga UE" />
          <p className="passport-label">Paszport roślin / Plant Passport</p>
        </div>
        <div className="passport-data">
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
