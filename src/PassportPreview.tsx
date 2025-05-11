import React, { JSX, useEffect, useState } from "react";
import PassportCard from "./PassportCard";
import PassportForm from "./PassportForm";
import { passportType } from "./types";
import "./PassportPreview.css";
import splitB from "./splitB";

export default function PassportPreview({
  selectedPassport,
  setPassports,
  passpId,
  cancelActivity,
}: {
  selectedPassport: passportType;
  setPassports: React.ActionDispatch<
    [
      action: {
        type: string;
        passpId?: number;
        newPassp?: passportType;
      }
    ]
  >;
  passpId: number;
  setPassportId: React.Dispatch<React.SetStateAction<number>>;
  cancelActivity: () => void;
}) {
  const [tempPassportInfo, setTempPassportInfo] =
    useState<passportType>(selectedPassport);
  useEffect(() => {
    setTempPassportInfo(selectedPassport);
  }, [selectedPassport]);

  const [b1, b2] = splitB(tempPassportInfo.b || "");
  const templates = ["Narrow", "Wide", "Compact"];
  const placeholders = {
    label: "Passport Label",
    a: "Botanical Name",
    b1: "Company ISO",
    b2: "Registration Number",
    c: "Traceability Code",
    d: "Origin ISO",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files) {
      setTempPassportInfo({
        ...tempPassportInfo,
        barcode: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleInputOnChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTempPassportInfo({ ...tempPassportInfo, [name]: e.target.value });
  };

  const handleCancel = () => {
    setTempPassportInfo(selectedPassport);
    cancelActivity();
  };
  const handleUpdate = () => {
    if (passpId === 0) {
      setPassports({
        type: "add",
        newPassp: tempPassportInfo,
      });
    } else {
      setPassports({
        type: "update",
        passpId: passpId,
        newPassp: tempPassportInfo,
      });
    }
  };
  const handleRemove = () => {
    setPassports({
      type: "remove",
      passpId: passpId,
    });
  };
  return (
    <div className="passport-preview">
      <form>
        <fieldset>
          <legend>Passport Info</legend>
          <p className="passport-info-input label">
            Label
            <input
              required={true}
              placeholder={placeholders.label}
              maxLength={32}
              value={tempPassportInfo.label}
              onChange={(e) => {
                handleInputOnChange("label", e);
              }}
            />
          </p>
          <p className="passport-info-input a">
            A
            <input
              required={true}
              placeholder={placeholders.a}
              maxLength={32}
              value={tempPassportInfo.a}
              onChange={(e) => {
                handleInputOnChange("a", e);
              }}
            />
          </p>
          <p className="passport-info-input b">
            B
            <input
              required={true}
              placeholder={placeholders.b1}
              maxLength={2}
              value={b1}
              onChange={(e) => {
                setTempPassportInfo({
                  ...tempPassportInfo,
                  b: e.target.value + "-" + b2,
                });
              }}
            />
            -
            <input
              required={true}
              placeholder={placeholders.b2}
              maxLength={30}
              value={b2}
              onChange={(e) => {
                b: b1 + "-" + e.target.value,
                  setTempPassportInfo({
                    ...tempPassportInfo,
                    b: b1 + "-" + e.target.value,
                  });
              }}
            />
          </p>
          <p className="passport-info-input c">
            C
            <input
              placeholder={placeholders.c}
              maxLength={32}
              value={tempPassportInfo.c}
              onChange={(e) => {
                handleInputOnChange("c", e);
              }}
            />
            Or
            <input
              type="file"
              name="barcode-input"
              onChange={handleFileChange}
            />
          </p>
          <p className="passport-info-input d">
            D
            <input
              required={true}
              placeholder={placeholders.d}
              maxLength={2}
              value={tempPassportInfo.d}
              onChange={(e) => {
                handleInputOnChange("d", e);
              }}
            />
          </p>
        </fieldset>

        <fieldset>
          <legend>Template</legend>
          <div className="templates">
            {templates.map((value, i) => {
              return (
                <TemplateRadio
                  key={i}
                  template={tempPassportInfo.template}
                  num={i + 1}
                >
                  <>{value}</>
                </TemplateRadio>
              );
            })}
          </div>
        </fieldset>
        <div className="pasport-box">
          <button type="submit" onClick={handleUpdate}>
            Save
          </button>
          <button type="submit" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" onClick={handleRemove}>
            Remove
          </button>
          <EmptyInfoWarning passportInfo={tempPassportInfo} />
          <PassportCard passport={tempPassportInfo} />
        </div>
      </form>
    </div>
  );

  function TemplateRadio({
    template = 1,
    num,
    children,
  }: {
    template: number;
    num: number;
    children: JSX.Element;
  }) {
    return (
      <p className="passport-info-input">
        <label htmlFor={" template-" + num}>{children}</label>
        <input
          type="radio"
          name="template"
          id={"template-" + num}
          checked={template === num}
          onChange={() => {
            setTempPassportInfo({ ...tempPassportInfo, template: num });
          }}
        />
      </p>
    );
  }
}

function EmptyInfoWarning({ passportInfo }: { passportInfo: passportType }) {
  const emptyInfo: string[] = [];
  passportInfo.a === "" ? emptyInfo.push("A") : emptyInfo;
  !passportInfo.b || splitB(passportInfo.b).includes("")
    ? emptyInfo.push("B")
    : emptyInfo;
  passportInfo.c === "" ? emptyInfo.push("C") : emptyInfo;
  passportInfo.d === "" ? emptyInfo.push("D") : emptyInfo;
  if (emptyInfo[0]) {
    return <p>Please insert data for {emptyInfo.sort().join(", ")}</p>;
  }
}
