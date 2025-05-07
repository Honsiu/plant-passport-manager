import { useEffect, useState } from "react";
import PassportCard from "./PassportCard";
import PassportForm from "./PassportForm";
import { passportInfoType } from "./types";

export default function PassportPreview({
  passportInfo,
  handleSetPassportInfo,
}: {
  passportInfo: passportInfoType;
  handleSetPassportInfo: (action: string, newPassp?: passportInfoType) => void;
}) {
  const [tempPassportInfo, setTempPassportInfo] =
    useState<passportInfoType>(passportInfo);
  useEffect(() => {
    setTempPassportInfo(passportInfo);
  }, [passportInfo]);

  const handleSave = () => {
    handleSetPassportInfo("update", { ...tempPassportInfo });
  };
  const handleCancel = () => {
    setTempPassportInfo(passportInfo);
  };
  const handleRemove = () => {
    handleSetPassportInfo("remove", passportInfo);
  };

  return (
    <section>
      <PassportForm
        tempPassportInfo={tempPassportInfo}
        setTempPassportInfo={setTempPassportInfo}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleRemove={handleRemove}
      />
      <PassportCard passportInfo={tempPassportInfo} />
    </section>
  );
}
