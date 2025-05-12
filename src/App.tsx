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
  const [activity, setActivity] = useState<string>("select");

  const handleEditPassport = (action: {
    type: string;
    passpId?: number;
    newPassp?: passportType;
  }) => {
    dispatchPassports(action);
    setActivity("select");
  };

  const editPassport = (i: number) => {
    setPassportId(i);
    setActivity("edit");
  };
  const printPassport = (i: number) => {
    setPassportId(i);
    setActivity("print");
  };
  const cancelActivity = () => {
    setActivity("select");
  };
  switch (activity) {
    case "select":
      return (
        <main>
          <PassportSelect
            passports={passports}
            editPassport={editPassport}
            printPassport={printPassport}
          />
        </main>
      );
    case "edit":
      return (
        <main>
          <PassportPreview
            selectedPassport={selectedPassport}
            setPassportId={setPassportId}
            setPassports={handleEditPassport}
            passpId={passportId}
            cancelActivity={cancelActivity}
          />
        </main>
      );
    case "print":
      return (
        <main>
          <PrintPreview
            selectedPassport={selectedPassport}
            cancelPrint={cancelActivity}
          />
        </main>
      );
  }
}
