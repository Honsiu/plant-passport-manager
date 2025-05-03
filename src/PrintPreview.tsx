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
    if (type.startsWith("setGrid")) {
      return {
        ...state,
        grid: { ...state.grid, [type.slice(7).toLowerCase()]: value },
      };
    }
    if (type.startsWith("setGap")) {
      return {
        ...state,
        gap: { ...state.gap, [type.slice(6).toLowerCase()]: value },
      };
    }
    if (type.startsWith("setMargin")) {
      return {
        ...state,
        margin: { ...state.margin, [type.slice(9).toLowerCase()]: value },
      };
    }
    throw Error("Unknown action: " + type);
  };
  const [print, dispatchPrint] = useReducer(printReducer, {
    grid: { rows: 1, columns: 1 },
    gap: { horizontal: 0, vertical: 0 },
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const passportCards: JSX.Element[][] = [
    ...Array(print.grid.columns * print.grid.rows),
  ];

  return (
    <section>
      <PrintForm print={print} dispatchPrint={dispatchPrint} />
      <div
        className="print-sheet"
        style={{
          padding: [
            print.margin.top % 200,
            print.margin.right % 200,
            print.margin.bottom % 200,
            print.margin.left % 200,
            " ",
          ].join("mm "),
        }}
      >
        <div
          className="print-grid-box"
          style={{
            columnGap: print.gap.horizontal + "mm",
            rowGap: print.gap.vertical + "mm",
            gridTemplateColumns: "repeat(" + print.grid.columns + ", 1fr)",
          }}
        >
          {passportCards.map((row, index) => (
            <PassportCard
              template={template}
              passportInfo={passportInfo}
              barcode={barcode}
              key={index}
              style={{
                fontSize: 1 / (print.grid.columns || 1) + "em",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
