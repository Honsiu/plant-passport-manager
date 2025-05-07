import PassportCard from "./PassportCard";
import PassportForm from "./PassportForm";
import { passportInfoType } from "./types";

export default function PassportPreview({
  passportInfo,
  handleSetPassportInfo,
}: {
  passportInfo: passportInfoType;
  handleSetPassportInfo: React.Dispatch<React.SetStateAction<passportInfoType>>;
}) {
  return (
    <section>
      <PassportForm
        passportInfo={passportInfo}
        setPassportInfo={handleSetPassportInfo}
      />

      <PassportCard passportInfo={passportInfo} />
    </section>
  );
}
