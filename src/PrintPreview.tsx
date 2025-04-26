import { JSX, useState } from "react";
import PassportCard from "./PassportCard";
import { passportInfoType } from "./types";

export default function PrintPreview({
  template,
  passportInfo,
  barcode,
}: {
  template: number;
  passportInfo: passportInfoType;
  barcode: string;
}) {
  const sheetDimentions = { width: 210, height: 297 };
  const [passportColumns, setPassportColumns] = useState(1);
  const [passportRows, setPassportRows] = useState(1);
  const [passportGapHorizontal, setPassportGapHorizontal] = useState(0);
  const [passportGapVertical, setPassportGapVertical] = useState(0);
  const passportCards: JSX.Element[][] = [
    ...Array(passportRows * passportColumns),
  ];
  return (
    <section>
      <div className="print-form">
        <p>
          <label htmlFor="passport-column-count">How many in one row? </label>
          <input
            type="number"
            max="50"
            id="passport-column-count"
            onChange={(e) => {
              setPassportColumns(parseInt(e.target.value) % 50 || 1);
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-row-count">How many rows? </label>
          <input
            max="50"
            type="number"
            id="passport-row-count"
            onChange={(e) => {
              setPassportRows(parseInt(e.target.value) % 50 || 1);
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-gap">Gap horizontally [mm] </label>
          <input
            max={210}
            type="number"
            id="passport-gap"
            onChange={(e) => {
              setPassportGapHorizontal(parseInt(e.target.value) % 210 || 0);
            }}
          />
        </p>{" "}
        <p>
          <label htmlFor="passport-gap">Gap vertically [mm] </label>
          <input
            max={297}
            type="number"
            id="passport-gap"
            onChange={(e) => {
              setPassportGapVertical(parseInt(e.target.value) % 297 || 0);
            }}
          />
        </p>
      </div>
      <div
        className="print-sheet"
        style={{
          columnGap: passportGapHorizontal + "mm",
          rowGap: passportGapVertical + "mm",
          gridTemplateColumns: "repeat(" + passportColumns + ", 1fr)",
        }}
      >
        {passportCards.map((row, index) => (
          <PassportCard
            template={template}
            passportInfo={passportInfo}
            barcode={barcode}
            key={index}
            style={{
              fontSize: 1 / (passportColumns || 1) + "em",
            }}
          />
        ))}
      </div>
    </section>
  );
}
