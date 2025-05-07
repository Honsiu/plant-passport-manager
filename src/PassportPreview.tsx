import { useEffect, useState } from "react";
import PassportCard from "./PassportCard";
import PassportForm from "./PassportForm";
import { passportInfoType } from "./types";

export default function PassportPreview({
  passportInfo,
  handleSetPassportInfo,
}: {
  passportInfo: passportInfoType;
  handleSetPassportInfo: (arg0: passportInfoType) => void;
}) {
  const [tempPassportInfo, setTempPassportInfo] = useState<passportInfoType>({
    ...passportInfo,
  });
  useEffect(() => {
    setTempPassportInfo(passportInfo);
  }, [passportInfo]);

  const handleSave = () => {
    handleSetPassportInfo({ ...tempPassportInfo });
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
