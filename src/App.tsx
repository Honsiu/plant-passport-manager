import "./App.css";
import PrintPreview from "./PrintPreview";
import { passportInfoType, passports } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import PassportPreview from "./PassportPreview";
import { useState } from "react";

export default function App() {
  const defaultPassportInfo: passportInfoType = {
    label: "Default passport",
    a: "Default",
    b: "De-fault",
    c: "Default",
    barcode: "To be developed",
    d: "Default",
    template: 1,
  };

  const [passports, setPassports] = useLocalStorage<passports>("passports", [
    defaultPassportInfo,
  ] as passports);

  const [passportInfo, setPassportInfo] = useState<passportInfoType>(
    passports[0] || defaultPassportInfo
  );

  const handleSetPassportInfo = (value: passportInfoType) => {
    setPassportInfo(value);
    setPassports([...passports, { ...value }]);
  };

  return (
    <main>
      <p>
        <label htmlFor="select-passport">Select Existing passport</label>
        <select
          name="select-passport"
          id="select-passport"
          onChange={(e) => {
            setPassportInfo(passports[parseInt(e.target.value) || 0]);
          }}
        >
          {passports.map((passportInfo, i) => {
            return (
              <option key={i} value={i}>
                {passportInfo.label}
              </option>
            );
          })}
        </select>
      </p>
      <PassportPreview
        passportInfo={passportInfo}
        handleSetPassportInfo={handleSetPassportInfo}
      />
      <PrintPreview passportInfo={passportInfo} />
      <button
        onClick={() => {
          setPassports([defaultPassportInfo]);
        }}
      >
        clear useLocalStorage
      </button>
    </main>
  );
}
