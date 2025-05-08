import { passportsType } from "./types";

export const PassportSelect = ({
  passpId,
  setPasspId,
  passports,
}: {
  passpId: number;
  setPasspId: React.Dispatch<React.SetStateAction<number>>;
  passports: passportsType;
}) => {
  return (
    <p>
      <select
        name="select-passport"
        id="select-passport"
        value={passpId}
        onChange={(e) => {
          setPasspId(parseInt(e.target.value) || 0);
        }}
      >
        {passports.map((passportInfo, i) => {
          if (i === 0) {
            return (
              <option key={i} value={i}>
                Add new
              </option>
            );
          }
          return (
            <option key={i} value={i}>
              {passportInfo.label}
            </option>
          );
        })}
      </select>
    </p>
  );
};
