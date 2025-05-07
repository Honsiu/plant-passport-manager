import { CSSProperties } from "react";
import { passportInfoType } from "./types";
import "./PassportCard.css";

export default function PassportCard({
  rotated,
  passportInfo,
  style,
}: {
  rotated?: number;
  passportInfo: passportInfoType;
  style?: CSSProperties;
}) {
  return (
    <>
      <div
        style={style || {}}
        className={
          (rotated ? "rotated " : " ") +
            "passport-card template-" +
            passportInfo.template?.toString() || "1"
        }
      >
        <div className="passport-heading">
          <img
            src={"./flag_black_white" + (rotated ? "_rotated" : "") + ".svg"}
            className="flag"
            alt="Flaga UE"
          />
          <p className="passport-label">Paszport roślin / Plant Passport</p>
        </div>
        <div className="passport-data">
          <p className="passport-info">{"A " + passportInfo.a}</p>
          <p className="passport-info">{"B " + passportInfo.b}</p>
          <p className="passport-info">
            {"C " + passportInfo.c}
            {passportInfo.barcode && (
              <img src={passportInfo.barcode} className="passport-barcode" />
            )}
          </p>
          <p className="passport-info">{"D " + passportInfo.d}</p>
        </div>
      </div>
    </>
  );
}
