import { useState } from "react";
import splitB from "./splitB";
import { PassportInputType } from "./types";

export default function PassportInput({
  letter,
  info,
  setInfo,
}: PassportInputType) {
  const [inputValue, setInputValue] = useState(info.valueOf().toString());
  const handleSubmit = () => {
    setInfo(inputValue);
  };
  if (letter != "B") {
    return (
      <p>
        {letter}
        <input
          maxLength={16}
          defaultValue={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </p>
    );
  } else {
    const b1 = splitB(inputValue.valueOf())[0];
    const b2 = splitB(inputValue.valueOf())[1];
    return (
      <>
        <p>
          {letter}
          <input
            maxLength={2}
            defaultValue={b1}
            onChange={(e) => {
              setInputValue(e.target.value + "-" + b2);
            }}
          />
          {" - "}
          <input
            maxLength={16}
            defaultValue={b2}
            onChange={(e) => {
              setInputValue(b1 + "-" + e.target.value);
            }}
          />
          <button onClick={handleSubmit}>Submit</button>
        </p>
      </>
    );
  }
}
