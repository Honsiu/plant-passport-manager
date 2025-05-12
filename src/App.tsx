import "./styles/App.css";
import Print from "./Print";
import Edit from "./Edit";
import PassportSelect from "./Select";
import { passportType } from "./types";
import { useEffect, useState } from "react";
import { useStoredPassports } from "./useStoredPassports";

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
          <h2>Select a passport</h2>
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
          <h2>Edit a passport</h2>
          <Edit
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
          <h2>Print a passport</h2>
          <Print
            selectedPassport={selectedPassport}
            cancelPrint={cancelActivity}
          />
        </main>
      );
  }
}
