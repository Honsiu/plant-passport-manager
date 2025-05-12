import React, { JSX, useEffect, useState } from "react";
import Card from "./Card";
import { passportType } from "./types";
import "./styles/Edit.css";
import { splitB } from "./utils";

export default function Edit({
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
  const [editedPassport, setEditedPassport] =
    useState<passportType>(selectedPassport);
  useEffect(() => {
    setEditedPassport(selectedPassport);
  }, [selectedPassport]);

  const [b1, b2] = splitB(editedPassport.b || "");
  const templates = ["Narrow", "Wide", "Compact"];
  const placeholders = {
    label: "Passport Label",
    a: "Botanical Name",
    b1: "Company ISO",
    b2: "Registration Number",
    c: "Traceability Code",
    d: "Origin ISO",
  };

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files) {
      setEditedPassport({
        ...editedPassport,
        barcode: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleInputChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedPassport({ ...editedPassport, [name]: e.target.value });
  };

  const handleCancel = () => {
    setEditedPassport(selectedPassport);
    cancelActivity();
  };
  const handleAdd = () => {
    setPassports({
      type: "add",
      newPassp: editedPassport,
    });
  };
  const handleUpdate = () => {
    setPassports({
      type: "update",
      passpId: passpId,
      newPassp: editedPassport,
    });
  };
  const handleRemove = () => {
    setPassports({
      type: "remove",
      passpId: passpId,
    });
  };
  return (
    <section className="passport-preview">
      <form>
        <fieldset>
          <legend>Passport Info</legend>
          <p className="passport-info-input label">
            <LabeledInput
              className=""
              id="label-input"
              placeholder={placeholders.label}
              maxLength={32}
              onChange={(e) => {
                handleInputChange("label", e);
              }}
              value={editedPassport.label}
              label="Label"
            />
          </p>
          <p className="passport-info-input a">
            <LabeledInput
              className="passport-info-input a"
              id="a-input"
              label="A"
              placeholder={placeholders.a}
              maxLength={32}
              value={editedPassport.a}
              onChange={(e) => handleInputChange("a", e)}
            />
          </p>

          <p className="passport-info-input B">
            <LabeledInput
              className="passport-info-input b1"
              id="b1-input"
              label="B"
              placeholder={placeholders.b1}
              maxLength={2}
              value={b1}
              onChange={(e) => {
                setEditedPassport({
                  ...editedPassport,
                  b: e.target.value + "-" + b2,
                });
              }}
            />
            <span>-</span>
            <LabeledInput
              className="passport-info-input b2"
              id="b2-input"
              label=""
              placeholder={placeholders.b2}
              maxLength={30}
              value={b2}
              onChange={(e) => {
                setEditedPassport({
                  ...editedPassport,
                  b: b1 + "-" + e.target.value,
                });
              }}
            />
          </p>
          <p className="passport-info-input c">
            <LabeledInput
              className=""
              id="c-input"
              label="C"
              placeholder={placeholders.c}
              maxLength={32}
              value={editedPassport.c}
              onChange={(e) => handleInputChange("c", e)}
            />
            <span>Or</span>
            <input
              id="barcode-input"
              type="file"
              name="barcode-input"
              onChange={handleBarcodeChange}
            />
          </p>
          <p className="passport-info-input d">
            <LabeledInput
              className=""
              id="d-input"
              label="D"
              placeholder={placeholders.d}
              maxLength={2}
              value={editedPassport.d}
              onChange={(e) => handleInputChange("d", e)}
            />
          </p>
          <EmptyInfoWarning passportInfo={editedPassport} />
        </fieldset>
        <fieldset>
          <legend>Template</legend>
          <div className="radios">
            {templates.map((value, i) => {
              return (
                <TemplateRadio
                  key={i}
                  template={editedPassport.template}
                  num={i + 1}
                >
                  <>{value}</>
                </TemplateRadio>
              );
            })}
          </div>
        </fieldset>

        <div className="preview-window">
          <div className="buttons">
            {passpId === 0 ? (
              <>
                <button type="submit" onClick={handleAdd}>
                  Add
                </button>
                <button type="submit" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button type="submit" onClick={handleUpdate}>
                  Save
                </button>
                <button type="submit" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" onClick={handleRemove}>
                  Remove
                </button>
              </>
            )}
          </div>
          <Card passport={editedPassport} />
        </div>
      </form>
    </section>
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
      <span className="passport-info-input">
        <label htmlFor={" template-" + num}>{children}</label>
        <input
          type="radio"
          name="template"
          id={"template-" + num}
          checked={template === num}
          onChange={() => {
            setEditedPassport({ ...editedPassport, template: num });
          }}
        />
      </span>
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
    return (
      <p className="warning-box">
        Please insert data for {emptyInfo.sort().join(", ")}
      </p>
    );
  }
}
function LabeledInput({
  id,
  className,
  label,
  placeholder,
  maxLength,
  value,
  onChange,
}: {
  id: string;
  className: string;
  label: string;
  placeholder: string;
  value: string;
  maxLength: number;
  onChange: (e: any) => void;
}) {
  return (
    <span className={className || ""}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
    </span>
  );
}
