import PassportCard from "./PassportCard";
import { passportsType } from "./types";
import "./PassportSelect.css";
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
    <div className="passport-select">
      {passports.map((passport, i) => {
        if (i === 0) {
          return (
            <button
              className="add-passport-button"
              key={i}
              onClick={() => {
                editPassport(i);
              }}
            >
              <div className="v-pipe"></div>
              <div className="h-pipe"></div>
            </button>
          );
        }
        return (
          <div className="passport-box" key={i}>
            <span className="passport-label">{passport.label}</span>
            <PassportCard passport={passport} key={i}>
              <div className="buttons-container">
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
              </div>
            </PassportCard>
          </div>
        );
      })}
    </div>
  );
};
