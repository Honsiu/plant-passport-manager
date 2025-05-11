import { CSSProperties } from "react";
import { passportType } from "./types";
import "./PassportCard.css";

export default function PassportCard({
  rotated,
  passport,
  style,
  children,
}: {
  rotated?: number;
  passport: passportType;
  children?: any;
  style?: CSSProperties;
}) {
  return (
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
        <span>Paszport roślin / Plant Passport</span>
      </div>
      <div className="passport-data">
        <span className="passport-info">{"A " + passport.a}</span>
        <span className="passport-info">{"B " + passport.b}</span>
        <span className="passport-info">
          {"C " + passport.c}
          {passport.barcode && (
            <img src={passport.barcode} className="passport-barcode" />
          )}
        </span>
        <span className="passport-info">{"D " + passport.d}</span>
      </div>
      <div className="buttons-background">{children}</div>
    </div>
  );
}
