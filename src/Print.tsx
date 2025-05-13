import { JSX, useEffect, useReducer, useRef, useState } from "react";
import Card from "./Card";
import { passportType } from "./types";
import "./styles/Print.css";
import { capitalizeString } from "./utils";

type printSettings = {
  // 0 means horizontal
  orientation: number;
  count: number;
  grid: {
    rows: number;
    columns: number;
  };
  gap: {
    horizontal: number;
    vertical: number;
  };
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};
export default function Print({
  selectedPassport,
  cancelPrint,
}: {
  selectedPassport: passportType;
  cancelPrint: () => void;
}) {
  const printReducer = (
    state: printSettings,
    { type, value }: { type: string; value: number }
  ) => {
    const key = type
      .replace(/^(setOrientation|setGrid|setGap|setMargin|setCount)/, "")
      .toLowerCase();
    if (type.startsWith("setOrientation"))
      return {
        ...state,
        orientation: value,
      };
    if (type.startsWith("setCount"))
      return {
        ...state,
        count: value,
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
  const [printAll, setPrintAll] = useState(true);
  const [printSettings, dispatchprintSettings] = useReducer(printReducer, {
    orientation: 0,
    count: 0,
    grid: { rows: 1, columns: 1 },
    gap: { horizontal: 0, vertical: 0 },
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const passportGrid: JSX.Element[][] = [
    ...Array(printSettings.grid.columns * printSettings.grid.rows),
  ];

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <section className="print-preview printable">
      <form className="flex gap-5em">
        <div className="print-form">
          {Object.keys(printSettings).map((key) => {
            if (key === "orientation") {
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
                          dispatchprintSettings({
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
                          dispatchprintSettings({
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
            if (key === "count") {
              return (
                <fieldset>
                  <legend>How many to print?</legend>
                  <p>
                    <label htmlFor={"passport-all-input"}>All</label>
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      id="print-all-input"
                      onChange={(e) => {
                        setPrintAll(e.target.checked);
                      }}
                    />
                    <input
                      disabled={printAll}
                      type="number"
                      max={printSettings.grid.columns * printSettings.grid.rows}
                      id={"passport-how-many"}
                      onChange={(e) => {
                        dispatchprintSettings({
                          type: "setCount",
                          value: parseInt(e.target.value) || 0,
                        });
                      }}
                    />
                  </p>
                </fieldset>
              );
            }
            return (
              <fieldset key={key}>
                <legend>{capitalizeString(key)} </legend>
                {Object.keys(
                  printSettings[key as keyof printSettings] as Record<
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
                          dispatchprintSettings({
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
          <OverflowWarning
            previewRef={previewRef}
            printSettings={printSettings}
          />
          <InfoMark />
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
                printSettings.margin.top,
                printSettings.margin.right,
                printSettings.margin.bottom,
                printSettings.margin.left,
                " ",
              ].join("mm "),
              columnGap: printSettings.gap.horizontal + "mm",
              rowGap: printSettings.gap.vertical + "mm",
              gridTemplateColumns:
                "repeat(" + printSettings.grid.columns + ", 1fr)",
              gridTemplateRows: "repeat(" + printSettings.grid.rows + ", 1fr)",
            }}
          >
            {passportGrid.map((_, index) => {
              if (
                printAll ||
                index < printSettings.count ||
                printSettings.count <= 0
              ) {
                return (
                  <Card
                    rotated={printSettings.orientation}
                    passport={selectedPassport}
                    key={index}
                    style={{
                      fontSize: 1 / (printSettings.grid.columns || 1) + "em",
                    }}
                  />
                );
              }
            })}
          </div>
        </div>
      </form>
    </section>
  );
}

function InfoMark() {
  return (
    <div id="print-info-mark">
      i
      <p id="print-info-text">
        Set print scale to 100% and margins to none in printer dialog
      </p>
    </div>
  );
}

function OverflowWarning({
  previewRef,
  printSettings,
}: {
  previewRef: React.RefObject<HTMLDivElement | null>;
  printSettings: printSettings;
}) {
  const [isOverflown, setIsOverflown] = useState<boolean | null>(null);

  const checkOverflow = () => {
    if (previewRef.current) {
      return (
        previewRef.current.scrollHeight > previewRef.current.clientHeight ||
        previewRef.current.scrollWidth > previewRef.current.clientWidth
      );
    }
    return false;
  };
  useEffect(() => {
    setIsOverflown(checkOverflow);
  }, [printSettings]);
  return (
    isOverflown && (
      <p className="overflow-warning">
        Warning! Your data doesn't fit the sheet.
      </p>
    )
  );
}
