import { useState, useEffect, SetStateAction } from "react";
import { passportInfoType } from "./types";

function getStorageValue(key: string, defaultValue: Object) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}
export const useLocalStorage = (
  key: string,
  defaultValue: Object
): [passportInfoType, React.Dispatch<SetStateAction<passportInfoType>>] => {
  const [value, setValue] = useState<passportInfoType>(() => {
    return getStorageValue(key, defaultValue) as passportInfoType;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });
  return [value, setValue];
};
