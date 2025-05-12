import { JSX, useEffect, useReducer, useRef, useState } from "react";
import PassportCard from "./PassportCard";
import { passportType, printInfoType } from "./types";
import "./styles/PrintPreview.css";
import { capitalizeString } from "./utils";

export default function PassportPrint({
  selectedPassport,
  cancelPrint,
}: {
  selectedPassport: passportType;
  cancelPrint: () => void;
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
    <section className="print-preview printable">
      <form className="flex gap-5em">
        <div className="print-form">
          {Object.keys(printInfo).map((key) => {
            if (key === "rotated") {
              return (
                <fieldset key={key}>
                  <legend>{capitalizeString(key)} </legend>
                  <div className="radios">
                    <span>
                      <label htmlFor={"passport-rotated-landscape"}>
                        Landscape
                      </label>
                      <input
                        defaultChecked={true}
                        type="radio"
                        id={"passport-rotated-landscape"}
                        name="radio-rotated"
                        onChange={() => {
                          dispatchPrintInfo({
                            type: "set" + capitalizeString(key),
                            value: 0,
                          });
                        }}
                      />
                    </span>
                    <span>
                      <label htmlFor={"passport-rotated-portrait"}>
                        Portrait
                      </label>
                      <input
                        type="radio"
                        id={"passport-rotated-portrait"}
                        name="radio-rotated"
                        onChange={() => {
                          dispatchPrintInfo({
                            type: "set" + capitalizeString(key),
                            value: 1,
                          });
                        }}
                      />
                    </span>
                  </div>
                </fieldset>
              );
            }
            return (
              <fieldset key={key}>
                <legend>{capitalizeString(key)} </legend>
                {Object.keys(
                  printInfo[key as keyof printInfoType] as Record<
                    string,
                    number
                  >
                ).map((subKey: string) => {
                  return (
                    <p key={subKey}>
                      <label htmlFor={"passport-" + subKey}>
                        {capitalizeString(subKey)}
                      </label>
                      <input
                        type="number"
                        max={50}
                        id={"passport-" + subKey}
                        onChange={(e) => {
                          dispatchPrintInfo({
                            type:
                              "set" +
                              capitalizeString(key) +
                              capitalizeString(subKey),
                            value: parseInt(e.target.value) || 0,
                          });
                        }}
                      />
                    </p>
                  );
                })}
              </fieldset>
            );
          })}
          <PrintOverflowWarning previewRef={previewRef} printInfo={printInfo} />
          <div id="print-info-mark">
            i{" "}
            <p id="print-info-text">
              Set print scale to 100% and margins to none in printer dialog
            </p>
          </div>
        </div>
        <div className="preview-window">
          <div className="buttons">
            <button onClick={print}>Print</button>
            <button onClick={cancelPrint}>Cancel</button>
          </div>
          <div
            className="print-sheet print-grid-box"
            ref={previewRef}
            style={{
              padding: [
                printInfo.margin.top % 297,
                printInfo.margin.right % 210,
                printInfo.margin.bottom % 297,
                printInfo.margin.left % 210,
                " ",
              ].join("mm "),
              columnGap: printInfo.gap.horizontal + "mm",
              rowGap: printInfo.gap.vertical + "mm",
              gridTemplateColumns:
                "repeat(" + printInfo.grid.columns + ", 1fr)",
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
      </form>
    </section>
  );
}

function PrintOverflowWarning({
  previewRef,
  printInfo,
}: {
  previewRef: React.RefObject<HTMLDivElement | null>;
  printInfo: printInfoType;
}) {
  const [isOverflown, setIsOverflown] = useState<boolean | null>(null);

  const checkIsOverflown = () => {
    if (previewRef.current) {
      return (
        previewRef.current.scrollHeight > previewRef.current.clientHeight ||
        previewRef.current.scrollWidth > previewRef.current.clientWidth
      );
    }
    return false;
  };
  useEffect(() => {
    setIsOverflown(checkIsOverflown);
  }, [printInfo]);
  return (
    isOverflown && (
      <p className="overflow-warning">
        Warning! Your data doesn't fit the sheet.
      </p>
    )
  );
}
