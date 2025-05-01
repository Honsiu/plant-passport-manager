export default function PrintForm({
  dispatchPrint,
}: {
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
        <p>
          <label htmlFor="passport-column-count">How many in one row? </label>
          <input
            type="number"
            max={50}
            id="passport-column-count"
            onChange={(e) => {
              dispatchPrint({
                type: "setCols",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-row-count">How many rows? </label>
          <input
            max={50}
            type="number"
            id="passport-row-count"
            onChange={(e) => {
              dispatchPrint({
                type: "setRows",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-gap-h">Gap horizontally [mm] </label>
          <input
            max={210}
            type="number"
            id="passport-gap-h"
            onChange={(e) => {
              dispatchPrint({
                type: "setGapHorizontally",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-gap-v">Gap vertically [mm] </label>
          <input
            max={297}
            type="number"
            id="passport-gap-v"
            onChange={(e) => {
              dispatchPrint({
                type: "setGapVertically",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
      </fieldset>
      <fieldset>
        <legend>Margins</legend>
        <p>
          <label htmlFor="passport-margin-top">Top [mm] </label>
          <input
            max={297}
            type="number"
            id="passport-margin-top"
            onChange={(e) => {
              dispatchPrint({
                type: "setMarginTop",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-margin-bottom">Bottom [mm] </label>
          <input
            max={297}
            type="number"
            id="passport-margin-bottom"
            onChange={(e) => {
              dispatchPrint({
                type: "setMarginBottom",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-margin-left">Left [mm] </label>
          <input
            max={297}
            type="number"
            id="passport-margin-left"
            onChange={(e) => {
              dispatchPrint({
                type: "setMarginLeft",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="passport-margin-right">Right [mm] </label>
          <input
            max={297}
            type="number"
            id="passport-margin-right"
            onChange={(e) => {
              dispatchPrint({
                type: "setMarginRight",
                value: parseInt(e.target.value) % 297 || 0,
              });
            }}
          />
        </p>
      </fieldset>
      <div id="print-sheet-info-mark">
        ? <p id="print-sheet-info-text">Set margins in printer dialog</p>
      </div>
    </div>
  );
}
