import { useState } from "react";
import { passportInputType } from "./types";
import splitB from "./splitB";
export default function PassportInfo({
  letter,
  info,
  setInfo,
}: passportInputType) {
  const [inputValue, setInputValue] = useState(info.valueOf().toString());
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleSubmit = () => {
    setInfo(inputValue);
    toggleEdit();
  };
  if (isEditing) {
    if (letter != "B") {
      return (
        <>
          <p>
            {letter}
            <input
              defaultValue={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
            <button onClick={toggleEdit}>Cancel</button>
          </p>
        </>
      );
    } else {
      const b1 = splitB(inputValue.valueOf())[0];
      const b2 = splitB(inputValue.valueOf())[1];
      return (
        <>
          <p>
            {letter}
            <input
              defaultValue={b1}
              onChange={(e) => {
                setInputValue(e.target.value + "-" + b2);
              }}
            />
            {" - "}
            <input
              defaultValue={b2}
              onChange={(e) => {
                setInputValue(b1 + "-" + e.target.value);
              }}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={toggleEdit}>Cancel</button>
          </p>
        </>
      );
    }
  }

  return (
    <p className="passport-info" onClick={toggleEdit}>
      {letter + " " + info}
    </p>
  );
}
