import React, { useEffect, useState } from "react";
import PassportCard from "./PassportCard";
import PassportForm from "./PassportForm";
import { passportType } from "./types";

export default function PassportPreview({
  selectedPassport,
  setPassports,
  passpId,
  cancelActivity,
}: {
  selectedPassport: passportType;
  setPassports: React.ActionDispatch<
    [
      action: {
        type: string;
        passpId?: number;
        newPassp?: passportType;
      }
    ]
  >;
  passpId: number;
  setPassportId: React.Dispatch<React.SetStateAction<number>>;
  cancelActivity: () => void;
}) {
  const [tempPassportInfo, setTempPassportInfo] =
    useState<passportType>(selectedPassport);
  useEffect(() => {
    setTempPassportInfo(selectedPassport);
  }, [selectedPassport]);

  const handleCancel = () => {
    setTempPassportInfo(selectedPassport);
    cancelActivity();
  };
  const handleUpdate = () => {
    if (passpId === 0) {
      setPassports({
        type: "add",
        newPassp: tempPassportInfo,
      });
    } else {
      setPassports({
        type: "update",
        passpId: passpId,
        newPassp: tempPassportInfo,
      });
    }
  };
  const handleRemove = () => {
    setPassports({
      type: "remove",
      passpId: passpId,
    });
  };

  return (
    <section>
      <PassportForm
        tempPassportInfo={tempPassportInfo}
        setTempPassportInfo={setTempPassportInfo}
        handleCancel={handleCancel}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
      <PassportCard passport={tempPassportInfo} />
    </section>
  );
}
