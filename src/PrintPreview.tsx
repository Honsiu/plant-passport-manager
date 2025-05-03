import { JSX, useReducer } from "react";
import PassportCard from "./PassportCard";
import { passportInfoType, printType } from "./types";
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
  const printReducer = (
    state: printType,
    { type, value }: { type: string; value: number }
  ) => {
    switch (type) {
      case "setColumns": {
        return { ...state, columns: value };
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
        return { ...state, marginTop: value };
      }
      case "setMarginBottom": {
        return { ...state, marginBottom: value };
      }
      case "setMarginLeft": {
        return { ...state, marginLeft: value };
      }
      case "setMarginRight": {
        return { ...state, marginRight: value };
      }
      default: {
        throw Error("Unknown action: " + type);
      }
    }
  };
  const [print, dispatchPrint] = useReducer(printReducer, {
    rows: 1,
    columns: 1,
    gapHorizontal: 0,
    gapVertical: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  });
  const passportCards: JSX.Element[][] = [...Array(print.columns * print.rows)];
  return (
    <section>
      <PrintForm print={print} dispatchPrint={dispatchPrint} />
      <div
        className="print-sheet"
        style={{
          padding: [
            print.marginTop,
            print.marginRight,
            print.marginBottom,
            print.marginLeft,
          ].join("mm "),
          columnGap: print.gapHorizontal + "mm",
          rowGap: print.gapVertical + "mm",
          gridTemplateColumns: "repeat(" + print.columns + ", 1fr)",
        }}
      >
        {passportCards.map((row, index) => (
          <PassportCard
            template={template}
            passportInfo={passportInfo}
            barcode={barcode}
            key={index}
            style={{
              fontSize: 1 / (print.columns || 1) + "em",
            }}
          />
        ))}
      </div>
    </section>
  );
}
