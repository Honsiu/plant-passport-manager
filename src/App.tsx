import "./App.css";
import PrintPreview from "./PrintPreview";
import { passportInfoType, passports } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import PassportPreview from "./PassportPreview";
import { useState } from "react";

export default function App() {
  const defaultPassportInfo: passportInfoType = {
    a: "Default",
    b: "Default",
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
    setPassports([
      ...passports,
      { ...passportInfo, label: passports.length.toString() },
    ]);
  };

  return (
    <main>
      <PassportPreview
        passportInfo={passportInfo}
        handleSetPassportInfo={handleSetPassportInfo}
      />
      <PrintPreview passportInfo={passportInfo} />
      {JSON.stringify([passports])}
    </main>
  );
}
