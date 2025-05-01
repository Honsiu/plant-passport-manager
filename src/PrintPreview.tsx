import { JSX, useReducer, useState } from "react";
import PassportCard from "./PassportCard";
import { passportInfoType } from "./types";
import PrintForm from "./PrintForm";

export default function PrintPreview({
  template,
  passportInfo,
  barcode,
}: {
  template: number;
  passportInfo: passportInfoType;
  barcode: string;
}) {
  type printType = {
    rows: number;
    cols: number;
    gapHorizontal: number;
    gapVertical: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  const printReducer = (
    state: printType,
    { type, value }: { type: string; value: number }
  ) => {
    switch (type) {
      case "setCols": {
        return { ...state, cols: value };
      }
      case "setRows": {
        return { ...state, rows: value };
      }
      case "setGapHorizontal": {
        return { ...state, gapHorizontal: value };
      }
      case "setGapVertical": {
        return { ...state, gapVertical: value };
      }
      case "setMarginTop": {
        return { ...state, top: value };
      }
      case "setMarginBottom": {
        return { ...state, bottom: value };
      }
      case "setMarginLeft": {
        return { ...state, left: value };
      }
      case "setMarginRight": {
        return { ...state, right: value };
      }
      default: {
        throw Error("Unknown action");
      }
    }
  };
  const [print, dispatchPrint] = useReducer(printReducer, {
    rows: 1,
    cols: 1,
    gapHorizontal: 0,
    gapVertical: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const passportCards: JSX.Element[][] = [...Array(print.cols * print.rows)];
  return (
    <section>
      <PrintForm dispatchPrint={dispatchPrint} />
      <div
        className="print-sheet"
        style={{
          columnGap: print.gapHorizontal + "mm",
          rowGap: print.gapVertical + "mm",
          gridTemplateColumns: "repeat(" + print.cols + ", 1fr)",
        }}
      >
        {passportCards.map((row, index) => (
          <PassportCard
            template={template}
            passportInfo={passportInfo}
            barcode={barcode}
            key={index}
            style={{
              fontSize: 1 / (print.cols || 1) + "em",
            }}
          />
        ))}
      </div>
    </section>
  );
}
