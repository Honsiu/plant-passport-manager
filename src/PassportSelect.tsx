import PassportCard from "./PassportCard";
import { passportsType } from "./types";

export const PassportSelect = ({
  editPassport,
  printPassport,
  passports,
}: {
  editPassport: (i: number) => void;
  printPassport: (i: number) => void;
  passports: passportsType;
}) => {
  return (
    <p>
      {passports.map((passport, i) => {
        if (i === 0) {
          return (
            <>
              <button
                onClick={() => {
                  editPassport(i);
                }}
              >
                Add new
              </button>
              <PassportCard passport={passport} key={i} />
            </>
          );
        }
        return (
          <span>
            {passport.label}
            <button
              onClick={() => {
                editPassport(i);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                printPassport(i);
              }}
            >
              Print
            </button>
            <PassportCard passport={passport} key={i} />
          </span>
        );
      })}
    </p>
  );
};
