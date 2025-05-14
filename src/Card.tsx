import { CSSProperties } from "react";
import { passportType } from "./types";
import "./styles/Card.css";

export default function Card({
  rotated,
  passport,
  style,
  children,
}: {
  rotated?: boolean;
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
          className="flag rotated"
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
            <img src={passport.barcode} className="barcode" />
          )}
        </span>
        <span className="passport-info">{"D " + passport.d}</span>
      </div>
      {children}
    </div>
  );
}
