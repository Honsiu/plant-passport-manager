import "./App.css";
import PassportCard from "./PassportCard";
import PrintPreview from "./PrintPreview";
import { passportInfoType } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import PassportForm from "./PassportForm";

export default function App() {
  const defaultPassportInfo: passportInfoType = {
    a: "",
    b: "",
    c: "",
    barcode: "To be developed",
    d: "",
    template: 1,
  };
  const [passportInfo, setPassportInfo] = useLocalStorage("passportInfo", [
    defaultPassportInfo,
  ]);

  return (
    <main>
      <section>
        <PassportForm
          passportInfo={passportInfo}
          setPassportInfo={setPassportInfo}
        />

        <PassportCard
          passportInfo={passportInfo}
          barcode={passportInfo.barcode || ""}
        />
      </section>
      <PrintPreview
        passportInfo={passportInfo}
        barcode={passportInfo.barcode || ""}
      />
    </main>
  );
}
