import { JSX, useReducer, useRef } from "react";
import PassportCard from "./PassportCard";
import { passportType, printInfoType } from "./types";
import PrintForm from "./PrintForm";
import "./PrintPreview.css";
import PrintOverflowWarning from "./PrintOverflowWarning";

export default function PrintPreview({
  selectedPassport,
}: {
  selectedPassport: passportType;
}) {
  const printReducer = (
    state: printInfoType,
    { type, value }: { type: string; value: number }
  ) => {
    const key = type
      .replace(/^(setRotated|setGrid|setGap|setMargin)/, "")
      .toLowerCase();

    if (type.startsWith("setRotated"))
      return {
        ...state,
        rotated: value,
      };

    if (type.startsWith("setGrid"))
      return {
        ...state,
        grid: { ...state.grid, [key]: value },
      };

    if (type.startsWith("setGap"))
      return {
        ...state,
        gap: { ...state.gap, [key]: value },
      };

    if (type.startsWith("setMargin"))
      return {
        ...state,
        margin: { ...state.margin, [key]: value },
      };

    throw Error("Unknown action: " + type);
  };
  const [printInfo, dispatchPrintInfo] = useReducer(printReducer, {
    rotated: 0,
    grid: { rows: 1, columns: 1 },
    gap: { horizontal: 0, vertical: 0 },
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const passportGrid: JSX.Element[][] = [
    ...Array(printInfo.grid.columns * printInfo.grid.rows),
  ];

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <section className="printable">
      <PrintForm printInfo={printInfo} dispatchPrintInfo={dispatchPrintInfo} />
      <PrintOverflowWarning previewRef={previewRef} printInfo={printInfo} />
      <div
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
          ref={previewRef}
          className="print-grid-box"
          style={{
            columnGap: printInfo.gap.horizontal + "mm",
            rowGap: printInfo.gap.vertical + "mm",
            gridTemplateColumns: "repeat(" + printInfo.grid.columns + ", 1fr)",
          }}
        >
          {passportGrid.map((_, index) => (
            <PassportCard
              rotated={printInfo.rotated}
              passport={selectedPassport}
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
