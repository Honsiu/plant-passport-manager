import { printInfoType } from "./types";

import "./PrintForm.css";

export default function PrintForm({
  printInfo,
  dispatchPrintInfo,
}: {
  printInfo: printInfoType;
  dispatchPrintInfo: React.ActionDispatch<
    [
      {
        type: string;
        value: number;
      }
    ]
  >;
}) {
  return (
    <div className="print-form">
      {Object.keys(printInfo).map((key) => {
        if (key === "rotated") {
          return (
            <fieldset>
              <p>
                <label htmlFor={"passport-rotated-landscape"}>Landscape</label>
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
              </p>
              <p>
                <label htmlFor={"passport-rotated-portrait"}>Portrait</label>
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
              </p>
              <legend>{capitalizeString(key)} </legend>
            </fieldset>
          );
        }
        return (
          <>
            <fieldset>
              <legend>{capitalizeString(key)} </legend>
              {Object.keys(
                printInfo[key as keyof printInfoType] as Record<string, number>
              ).map((subKey: string) => {
                return (
                  <p>
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
          </>
        );
      })}
      <button onClick={print}>Print</button>
      <div id="print-info-mark">
        i{" "}
        <p id="print-info-text">
          Set print scale to 100% and margins to none in printer dialog
        </p>
      </div>
    </div>
  );
}
function capitalizeString(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
