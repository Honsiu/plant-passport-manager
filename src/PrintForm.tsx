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
      {Object.keys(print).map((key) => {
        return (
          <fieldset>
            <legend>{key}</legend>
            {Object.keys(
              print[key as keyof printType] as Record<string, number>
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
                      dispatchPrint({
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
      <div id="print-info-mark">
        ? <p id="print-info-text">Set margins in printer dialog</p>
      </div>
    </div>
  );
}
function capitalizeString(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
