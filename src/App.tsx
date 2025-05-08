import "./App.css";
import PrintPreview from "./PrintPreview";
import { passportInfoType } from "./types";
import PassportPreview from "./PassportPreview";
import { useEffect, useState } from "react";
import { useStoredPassports } from "./useStoredPassports";
import { PassportSelect } from "./PassportSelect";

export default function App() {
  const [passportId, setPassportId] = useState<number>(0);
  const [passports, dispatchPassports] = useStoredPassports();
  const [displayedPassport, setDisplayedPassport] = useState<passportInfoType>(
    passports[passportId]
  );
  useEffect(() => {
    if (passportId >= passports.length) {
      setPassportId(passports.length - 1);
      setDisplayedPassport(passports[passportId - 1]);
    } else {
      setDisplayedPassport(passports[passportId]);
    }
  }, [passportId, passports]);

  return (
    <main>
      <PassportSelect
        passpId={passportId}
        passports={passports}
        setPasspId={setPassportId}
      />
      <PassportPreview
        selectedPassport={displayedPassport}
        dispatchPassports={dispatchPassports}
        passpId={passportId}
      />
      <PrintPreview passportInfo={displayedPassport} />
    </main>
  );
}
