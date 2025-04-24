import { useState } from "react";
import splitB from "./splitB";
import { PassportInputType } from "./types";

export default function PassportInput({
  letter,
  info,
  setInfo,
  setBarcode,
}: PassportInputType) {
  const [inputValue, setInputValue] = useState(info.valueOf().toString());
  const handleSubmit = () => {
    setInfo(inputValue);
  };

  let maxLength = 16;
  switch (letter) {
    case "D":
      maxLength = 2;
    case "A":
      return (
        <p>
          {letter}
          <input
            maxLength={maxLength}
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
    case "B":
      maxLength = 2;
      const b1 = splitB(inputValue.valueOf())[0];
      const b2 = splitB(inputValue.valueOf())[1];
      return (
        <>
          <p>
            {letter}
            <input
              maxLength={maxLength}
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
    case "C":
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files) {
          if (setBarcode) {
            setBarcode(URL.createObjectURL(e.target.files[0]));
          }
        }
      };
      return (
        <p>
          {letter}
          <input
            maxLength={maxLength}
            defaultValue={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />{" "}
          Or{" "}
          <input type="file" name="barcode-input" onChange={handleFileChange} />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </p>
      );
  }
}
