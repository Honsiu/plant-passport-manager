import { useEffect, useReducer } from "react";
import { passportInfoType, passportsType } from "./types";

function getStorageValue<defaultValueType>(
  key: string,
  defaultValue: defaultValueType
) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

const defaultPassport: passportInfoType = {
  label: "New Plant Passport",
  a: "",
  b: "",
  c: "",
  barcode: "",
  d: "",
  template: 1,
};

export const useStoredPassports = () => {
  const key = "passports";
  const [passports, dispatchPassports] = usePassports(
    getStorageValue(key, [defaultPassport])
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(passports));
  }, [passports, getStorageValue(key, [defaultPassport])]);

  return [passports, dispatchPassports] as ReturnType<typeof usePassports>;
};

const usePassports = (defaultPassports: passportsType = [defaultPassport]) => {
  const reducePassports = (
    passports: passportsType,
    action: { type: string; passpId?: number; newPassp?: passportInfoType }
  ) => {
    switch (action.type) {
      case "add": {
        return [...passports, action.newPassp] as passportsType;
      }
      case "update": {
        if (action.passpId && action.newPassp && action.passpId !== 0) {
          const n = [...passports];
          n[action.passpId] = action.newPassp;
          return n as passportsType;
        }
        return passports;
      }
      case "remove": {
        if (action.passpId !== 0) {
          return [...passports].filter(
            (_, i) => i !== action.passpId
          ) as passportsType;
        }
        return passports;
      }
      default:
        throw Error("Unknown action: " + action.type);
    }
  };
  const [passports, dispatchPassports] = useReducer(
    reducePassports,
    defaultPassports
  );

  return [passports, dispatchPassports] as [
    typeof passports,
    typeof dispatchPassports
  ];
};
