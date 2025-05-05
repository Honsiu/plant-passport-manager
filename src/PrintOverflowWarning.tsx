import { Ref, useEffect, useState } from "react";
import { printInfoType } from "./types";

export default function PrintOverflowWarning({
  previewRef,
  printInfo,
}: {
  previewRef: React.RefObject<HTMLDivElement | null>;
  printInfo: printInfoType;
}) {
  const [isOverflown, setIsOverflown] = useState<boolean | null>(null);

  const checkIsOverflown = () => {
    if (previewRef.current) {
      return (
        previewRef.current.scrollHeight > previewRef.current.clientHeight ||
        previewRef.current.scrollWidth > previewRef.current.clientWidth
      );
    }
    return false;
  };
  useEffect(() => {
    setIsOverflown(checkIsOverflown);
  }, [printInfo]);
  return (
    isOverflown && (
      <div>
        <span>Warning! Your data doesn't fit the sheet, please check it.</span>
      </div>
    )
  );
}
