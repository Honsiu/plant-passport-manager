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

  const [displayedPassport, setDisplayedPassport] = useState<passportInfoType>(
    passports[passportId]
  );
  useEffect(() => {
    setDisplayedPassport(passports[passportId] || defaultPassportInfo);
  }, [passportId, passports]);

  const handleSetPassportInfo = (
    action: string,
    newPassp?: passportInfoType
  ) => {
    switch (action) {
      case "update":
        if (newPassp) {
          if (passportId === 0) {
            setPassports([...passports, newPassp]);
            setPassportId(passports.length);
          } else {
            setPassports([
              ...[...passports].filter((_, i) => i !== passportId),
              newPassp,
            ]);
            setPassportId(passports.length - 1);
          }
        } else throw Error("Missing argument");
        break;

      case "remove":
        if (passportId !== 0) {
          setPassports([...[...passports].filter((_, i) => i !== passportId)]);
          setPassportId(passports.length - 1);
        }
        break;
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
        passportInfo={displayedPassport}
        handleSetPassportInfo={handleSetPassportInfo}
      />
      <PrintPreview passportInfo={displayedPassport} />
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
