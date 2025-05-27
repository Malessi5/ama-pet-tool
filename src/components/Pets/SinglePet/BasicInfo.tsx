import React, { useState, useEffect } from "react";
import Attribute from "./Attribute";

export default (props: { pet: PetData }) => {
  const { pet } = props;
  const [basicInfoData, setBasicInfoData] = useState([]);

  useEffect(() => {
    formatInfoData();
  }, [pet]);

  const basicInfoAttributes = {
    "currentGuardian.status": { label: "Status" },
    adoptedName: { label: "Adopted Name" },
    intakeDate: { label: "Intake Date" },
    "intake.mode": { label: "Intake Mode" },
    species: { label: "Species" },
    gender: { label: "Gender" },
    breed: { label: "Primary Breed" },
    breed2: { label: "Secondary Breed" },
    color: { label: "Primary Color" },
    color2: { label: "Secondary Color" },
    size: { label: "Size" },
    dateOfBirth: { label: "Date of Birth" },
    microchipCompany: { label: "Microchip Company" },
    microchipNumber: { label: "Microchip Number" },
  };

  const getPetAge = (dobStr: string) => {
    const dob = new Date(dobStr);
    const now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return `${years} year${years === 1 ? "" : "s"} old`;
    } else if (months > 0) {
      return `${months} month${months === 1 ? "" : "s"} old`;
    } else {
      return "Less than a month old";
    }
  };

  const formatInfoData = () => {
    const data: any = [];

    for (let attr in basicInfoAttributes) {
      let value;
      const label =
        basicInfoAttributes[attr as keyof typeof basicInfoAttributes].label;

      if (attr.includes(".")) {
        const attrArr = attr.split(".");
        let ref = pet[attrArr[0] as keyof typeof pet];

        for (let i = 1; i < attrArr.length; i++) {
          if (!ref) break;
          ref = ref[attrArr[i]];
        }
        if (ref) {
          value = ref;
        } else {
          continue;
        }
      } else if (attr == "dateOfBirth" && pet.dateOfBirth) {
        let dateStr = new Date(pet.dateOfBirth).toLocaleDateString();
        value = dateStr + " (" + getPetAge(dateStr) + ")";
      } else if (pet[attr as keyof typeof pet]) {
        value = pet[attr as keyof typeof pet];
      }
      if (value) {
        data.push({ label, value });
      }
    }

    setBasicInfoData(data);
  };

  return (
    <div className="container">
      <ul className="list-group">
        {basicInfoData.map(({ label, value }) => (
          <Attribute label={label} value={value} />
        ))}
      </ul>
    </div>
  );
};
