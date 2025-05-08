import "./App.css";
import PrintPreview from "./PrintPreview";
import { passportType } from "./types";
import PassportPreview from "./PassportPreview";
import { useEffect, useState } from "react";
import { useStoredPassports } from "./useStoredPassports";
import { PassportSelect } from "./PassportSelect";

export default function App() {
  const [passportId, setPassportId] = useState<number>(0);
  const [passports, dispatchPassports] = useStoredPassports();
  const [selectedPassport, setDisplayedPassport] = useState<passportType>(
    passports[passportId]
  );
  useEffect(() => {
    if (passportId >= passports.length) {
      setPassportId(passports.length - 1);
      setDisplayedPassport(passports[passportId - 1]);
    } else {
      setDisplayedPassport(passports[passportId]);
    }
  }, [passportId, passports, passports.length]);

  return (
    <main>
      <PassportSelect
        passports={passports}
        passpId={passportId}
        setPasspId={setPassportId}
      />
      <PassportPreview
        selectedPassport={selectedPassport}
        setPassportId={setPassportId}
        setPassports={dispatchPassports}
        passpId={passportId}
      />
      <PrintPreview selectedPassport={selectedPassport} />
    </main>
  );
}
