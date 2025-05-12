import Card from "./Card";
import { passportsType } from "./types";
import "./styles/Select.css";
export default function Select({
  editPassport,
  printPassport,
  passports,
}: {
  editPassport: (i: number) => void;
  printPassport: (i: number) => void;
  passports: passportsType;
}) {
  return (
    <section className="passport-select">
      <button
        className="add-passport-button"
        onClick={() => {
          editPassport(0);
        }}
      >
        <div className="v-pipe"></div>
        <div className="h-pipe"></div>
      </button>
      {passports.map((passport, i) => {
        if (i === 0) {
          return;
        }
        return (
          <div className="passport-box" key={i}>
            <p className="passport-label">{passport.label || "Passport"}</p>
            <Card passport={passport} key={i}>
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
            </Card>
          </div>
        );
      })}
    </section>
  );
}
