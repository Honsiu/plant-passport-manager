import "./App.css";
import PrintPreview from "./PrintPreview";
import { passportInfoType, passports } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import PassportPreview from "./PassportPreview";
import { useState } from "react";

export default function App() {
  const defaultPassportInfo: passportInfoType = {
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

  const handleSetPassportInfo = (
    value: React.SetStateAction<passportInfoType>
  ) => {
    setPassportInfo(value);
    setPassports([...passports, { ...passportInfo }]);
  };

  return (
    <main>
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
      {JSON.stringify([passports])}
    </main>
  );
}
