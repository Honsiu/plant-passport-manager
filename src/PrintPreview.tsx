import { JSX, useReducer, useRef } from "react";
import PassportCard from "./PassportCard";
import { passportInfoType, printInfoType } from "./types";
import PrintForm from "./PrintForm";
import "./PrintPreview.css";

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
    state: printInfoType,
    { type, value }: { type: string; value: number }
  ) => {
    if (type.startsWith("setRotated")) {
      return {
        ...state,
        rotated: value,
      };
    }
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
  const [printInfo, dispatchPrintInfo] = useReducer(printReducer, {
    rotated: 0,
    grid: { rows: 1, columns: 1 },
    gap: { horizontal: 0, vertical: 0 },
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const passportCards: JSX.Element[][] = [
    ...Array(printInfo.grid.columns * printInfo.grid.rows),
  ];
  const printSheetRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    print();
  };
  return (
    <section className="printable">
      <PrintForm
        handlePrint={handlePrint}
        printInfo={printInfo}
        dispatchPrintInfo={dispatchPrintInfo}
      />
      <div
        ref={printSheetRef}
        className="print-sheet"
        style={{
          padding: [
            printInfo.margin.top % 200,
            printInfo.margin.right % 200,
            printInfo.margin.bottom % 200,
            printInfo.margin.left % 200,
            " ",
          ].join("mm "),
        }}
      >
        <div
          className="print-grid-box"
          style={{
            columnGap: printInfo.gap.horizontal + "mm",
            rowGap: printInfo.gap.vertical + "mm",
            gridTemplateColumns: "repeat(" + printInfo.grid.columns + ", 1fr)",
          }}
        >
          {passportCards.map((row, index) => (
            <PassportCard
              rotated={printInfo.rotated}
              template={template}
              passportInfo={passportInfo}
              barcode={barcode}
              key={index}
              style={{
                fontSize: 1 / (printInfo.grid.columns || 1) + "em",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
