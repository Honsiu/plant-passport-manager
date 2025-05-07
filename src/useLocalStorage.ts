import { useState, useEffect, SetStateAction } from "react";

function getStorageValue<defaultValueType>(
  key: string,
  defaultValue: defaultValueType
) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}
export const useLocalStorage = <defaultValueType>(
  key: string,
  defaultValue: defaultValueType
): [defaultValueType, React.Dispatch<SetStateAction<defaultValueType>>] => {
  const [value, setValue] = useState<typeof defaultValue>(() => {
    return getStorageValue<defaultValueType>(
      key,
      defaultValue
    ) as typeof defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });
  return [value, setValue];
};
