import "./styles/App.css";
import Print from "./Print";
import Edit from "./Edit";
import PassportSelect from "./Select";
import { passportType } from "./types";
import { useEffect, useState } from "react";
import { useStoredPassports } from "./useStoredPassports";

export default function App() {
  const [passports, dispatchPassports] = useStoredPassports();
  const [passportIndex, setPassportIndex] = useState(0);
  const [selectedPassport, setSelectedPassport] = useState(
    passports[passportIndex]
  );
  useEffect(() => {
    if (passportIndex >= passports.length) {
      setPassportIndex(passports.length - 1);
      setSelectedPassport(passports[passportIndex - 1]);
    } else {
      setSelectedPassport(passports[passportIndex]);
    }
  }, [passportIndex, passports, passports.length]);
  const [activity, setActivity] = useState("select");

  const handleEditPassport = (action: {
    type: string;
    passpId?: number;
    newPassp?: passportType;
  }) => {
    dispatchPassports(action);
    setActivity("select");
  };

  const editPassport = (i: number) => {
    setPassportIndex(i);
    setActivity("edit");
  };
  const printPassport = (i: number) => {
    setPassportIndex(i);
    setActivity("print");
  };
  const cancelActivity = () => {};
  if (activity === "select") {
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
  }
  if (activity === "edit") {
    return (
      <main>
        <h2>Edit a passport</h2>
        <Edit
          selectedPassport={selectedPassport}
          setPassportId={setPassportIndex}
          setPassports={handleEditPassport}
          passpId={passportIndex}
          cancelActivity={cancelActivity}
        />
      </main>
    );
  }
  if (activity === "print") {
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
