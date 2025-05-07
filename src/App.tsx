import "./App.css";
import PrintPreview from "./PrintPreview";
import { passportInfoType, passports } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import PassportPreview from "./PassportPreview";
import { useEffect, useState } from "react";

export default function App() {
  const defaultPassportInfo: passportInfoType = {
    label: "New Plant Passport",
    a: "",
    b: "",
    c: "",
    barcode: "",
    d: "",
    template: 1,
  };
  const [passportId, setPassportId] = useState<number>(0);
  const [passports, setPassports] = useLocalStorage<passports>("passports", [
    defaultPassportInfo,
  ] as passports);

  const [currPassport, setCurrPassport] = useState<passportInfoType>(
    passports[passportId]
  );
  useEffect(() => {
    setCurrPassport(passports[passportId] || defaultPassportInfo);
  }, [passportId, passports]);

  const handleSetPassportInfo = (value: passportInfoType) => {
    if (passportId === 0) {
      setPassports([...passports, { ...value }]);
      setPassportId(passports.length);
    } else {
      setPassports([
        ...[...passports]
          .map((p, i) => {
            if (i !== 0) return p;
            return undefined;
          })
          .filter((p): p is passportInfoType => p !== undefined),
        { ...value },
      ]);
      setPassportId(passports.length - 1);
    }
  };
  return (
    <main>
      <p>
        <select
          name="select-passport"
          id="select-passport"
          value={passportId}
          onChange={(e) => {
            setPassportId(parseInt(e.target.value) || 0);
          }}
        >
          {passports.map((passportInfo, i) => {
            if (i === 0) {
              return (
                <option key={i} value={i}>
                  Add new
                </option>
              );
            }
            return (
              <option key={i} value={i}>
                {passportInfo.label}
              </option>
            );
          })}
        </select>
      </p>
      <PassportPreview
        passportInfo={currPassport}
        handleSetPassportInfo={handleSetPassportInfo}
      />
      <PrintPreview passportInfo={currPassport} />
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
