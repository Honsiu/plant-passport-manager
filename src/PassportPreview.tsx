import { useState } from "react";
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
  const [tempPassportInfo, setTempPassportInfo] = useState<passportInfoType>({
    ...passportInfo,
  });

  const handleSave = () => {
    handleSetPassportInfo(tempPassportInfo);
  };
  const handleCancel = () => {
    setTempPassportInfo(passportInfo);
  };

  return (
    <section>
      <PassportForm
        tempPassportInfo={tempPassportInfo}
        setTempPassportInfo={setTempPassportInfo}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
      <PassportCard passportInfo={tempPassportInfo} />
    </section>
  );
}
