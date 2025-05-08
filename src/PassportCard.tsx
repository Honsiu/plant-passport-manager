import { CSSProperties } from "react";
import { passportType } from "./types";
import "./PassportCard.css";

export default function PassportCard({
  rotated,
  passport,
  style,
}: {
  rotated?: number;
  passport: passportType;
  style?: CSSProperties;
}) {
  return (
    <>
      <div
        style={style || {}}
        className={
          (rotated ? "rotated " : " ") +
            "passport-card template-" +
            passport.template?.toString() || "1"
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
          <p className="passport-info">{"A " + passport.a}</p>
          <p className="passport-info">{"B " + passport.b}</p>
          <p className="passport-info">
            {"C " + passport.c}
            {passport.barcode && (
              <img src={passport.barcode} className="passport-barcode" />
            )}
          </p>
          <p className="passport-info">{"D " + passport.d}</p>
        </div>
      </div>
    </>
  );
}
