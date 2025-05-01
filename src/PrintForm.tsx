import { printType } from "./types";

export default function PrintForm({
  print,
  dispatchPrint,
}: {
  print: printType;
  dispatchPrint: React.ActionDispatch<
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
      <fieldset>
        <legend>Print dimensions</legend>
        {Object.keys(print).map((key: string) => {
          return (
            <p>
              <label htmlFor={"passport-" + key}>{capitalizeString(key)}</label>
              <input
                type="number"
                max={50}
                id={"passport-" + key}
                onChange={(e) => {
                  dispatchPrint({
                    type: "set" + capitalizeString(key),
                    value: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </p>
          );
        })}
      </fieldset>
      <div id="print-sheet-info-mark">
        ? <p id="print-sheet-info-text">Set margins in printer dialog</p>
      </div>
    </div>
  );
}
function capitalizeString(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
