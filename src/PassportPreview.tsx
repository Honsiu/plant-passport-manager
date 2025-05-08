import React, { useEffect, useState } from "react";
import PassportCard from "./PassportCard";
import PassportForm from "./PassportForm";
import { passportInfoType } from "./types";

export default function PassportPreview({
  selectedPassport,
  dispatchPassports,
  passpId,
}: {
  selectedPassport: passportInfoType;
  dispatchPassports: React.ActionDispatch<
    [
      action: {
        type: string;
        passpId?: number;
        newPassp?: passportInfoType;
      }
    ]
  >;
  passpId: number;
}) {
  const [tempPassportInfo, setTempPassportInfo] =
    useState<passportInfoType>(selectedPassport);
  useEffect(() => {
    setTempPassportInfo(selectedPassport);
  }, [selectedPassport]);

  const handleCancel = () => {
    setTempPassportInfo(selectedPassport);
  };
  const handleUpdate = () => {
    if (passpId === 0) {
      dispatchPassports({
        type: "add",
        newPassp: tempPassportInfo,
      });
    } else {
      dispatchPassports({
        type: "update",
        passpId: passpId,
        newPassp: tempPassportInfo,
      });
    }
  };
  const handleRemove = () => {
    dispatchPassports({
      type: "remove",
      passpId: passpId,
    });
  };

  return (
    <section>
      <PassportForm
        tempPassportInfo={tempPassportInfo}
        setTempPassportInfo={setTempPassportInfo}
        handleUpdate={handleUpdate}
        handleCancel={handleCancel}
        handleRemove={handleRemove}
      />
      <PassportCard passportInfo={tempPassportInfo} />
    </section>
  );
}
