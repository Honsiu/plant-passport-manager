import { JSX, useEffect, useRef, useState } from "react";
import Card from "./Card";
import { passportType } from "./types";
import "./styles/Print.css";

export default function Print({
  selectedPassport,
  cancelPrint,
}: {
  selectedPassport: passportType;
  cancelPrint: () => void;
}) {
  const [rotated, setRotated] = useState<boolean>(false);
  const [count, setCount] = useState<number>(-1);
  const [grid, setGrid] = useState({ columns: 1, rows: 1 });
  const [gaps, setGaps] = useState({ horizontal: 1, vertical: 1 });
  const [margins, setMargins] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [printAll, setPrintAll] = useState(true);

  const passportGrid: JSX.Element[][] = [...Array(grid.columns * grid.rows)];

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <section className="print-preview printable">
      <form className="flex gap-5em">
        <div className="print-form">
          <fieldset className="fieldset-orientation">
            <legend>Orientation</legend>
            <div className="radios">
              <span>
                <label htmlFor={"passport-rotated-landscape"}>Landscape</label>
                <input
                  defaultChecked={true}
                  type="radio"
                  id={"passport-rotated-landscape"}
                  name="radio-rotated"
                  onChange={() => {
                    setRotated(false);
                  }}
                />
              </span>
              <span>
                <label htmlFor={"passport-rotated-portrait"}>Portrait</label>
                <input
                  type="radio"
                  id={"passport-rotated-portrait"}
                  name="radio-rotated"
                  onChange={() => {
                    setRotated(true);
                  }}
                />
              </span>
            </div>
          </fieldset>
          <fieldset className="fieldset-count">
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
                max={grid.columns * grid.rows}
                id={"passport-how-many"}
                onChange={(e) => {
                  setCount(parseInt(e.target.value) || 0);
                }}
              />
            </p>
          </fieldset>
          <fieldset className="fieldset-grid">
            <legend>Grid</legend>
            <p>
              <label htmlFor={"grid-rows"}>Rows</label>
              <input
                type="number"
                max={50}
                id={"grid-rows"}
                onChange={(e) => {
                  setGrid({
                    ...grid,
                    rows: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
            <p>
              <label htmlFor={"grid-columns"}>Columns</label>
              <input
                type="number"
                max={50}
                id={"grid-columns"}
                onChange={(e) => {
                  setGrid({
                    ...grid,
                    columns: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
          </fieldset>
          <fieldset className="fieldset-margins">
            <legend>Margins</legend>
            <p>
              <label htmlFor={"margins-top"}>Top [mm]</label>
              <input
                type="number"
                max={50}
                id={"margins-top"}
                onChange={(e) => {
                  setMargins({
                    ...margins,
                    top: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
            <p>
              <label htmlFor={"margins-bottom"}>Bottom [mm]</label>
              <input
                type="number"
                max={50}
                id={"margins-bottom"}
                onChange={(e) => {
                  setMargins({
                    ...margins,
                    bottom: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
            <p>
              <label htmlFor={"margins-right"}>Right [mm]</label>
              <input
                type="number"
                max={50}
                id={"margins-right"}
                onChange={(e) => {
                  setMargins({
                    ...margins,
                    right: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
            <p>
              <label htmlFor={"margins-left"}>Left [mm]</label>
              <input
                type="number"
                max={50}
                id={"margins-left"}
                onChange={(e) => {
                  setMargins({
                    ...margins,
                    left: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
          </fieldset>
          <fieldset className="fieldset-gaps">
            <legend>Gaps</legend>
            <p>
              <label htmlFor={"gaps-horizontal"}>Horizontal [mm]</label>
              <input
                type="number"
                max={50}
                id={"gaps-horizontal"}
                onChange={(e) => {
                  setGaps({
                    ...gaps,
                    horizontal: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
            <p>
              <label htmlFor={"gaps-vertical"}>Vertical [mm]</label>
              <input
                type="number"
                max={50}
                id={"gaps-vertical"}
                onChange={(e) => {
                  setGaps({
                    ...gaps,
                    vertical: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
          </fieldset>
          <OverflowWarning
            previewRef={previewRef}
            printSettings={[margins, gaps, grid]}
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
                margins.top,
                margins.right,
                margins.bottom,
                margins.left,
                " ",
              ].join("mm "),
              columnGap: gaps.horizontal + "mm",
              rowGap: gaps.vertical + "mm",
              gridTemplateColumns: "repeat(" + grid.columns + ", 1fr)",
              gridTemplateRows: "repeat(" + grid.rows + ", 1fr)",
            }}
          >
            {passportGrid.map((_, index) => {
              if (printAll || index < count || count <= 0) {
                return (
                  <Card
                    rotated={rotated}
                    passport={selectedPassport}
                    key={index}
                    style={{
                      fontSize: 1 / (grid.columns || 1) + "em",
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
  printSettings: React.DependencyList;
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
