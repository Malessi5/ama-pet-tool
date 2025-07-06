import React, { useState, useEffect } from "react";
import Attribute from "./Attribute";

export default (props: { pet: PetData }): React.ReactElement => {
  const { pet } = props;
  const [basicInfoData, setBasicInfoData] = useState<PetAttribute[]>([]);

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

  const getPetAge = (dobStr: string): string => {
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

  const formatInfoData = (): void => {
    const data: PetAttribute[] = [];

    for (let attr in basicInfoAttributes) {
      let value: string | number | boolean | undefined;
      const label =
        basicInfoAttributes[attr as keyof typeof basicInfoAttributes].label;

      if (attr === "currentGuardian.status") {
        value = pet.currentGuardian?.status;
      } else if (attr === "intake.mode") {
        value = pet.intake?.mode;
      } else if (attr === "dateOfBirth" && pet.dateOfBirth) {
        let dateStr = new Date(pet.dateOfBirth).toLocaleDateString();
        value = dateStr + " (" + getPetAge(dateStr) + ")";
      } else {
        const petValue = pet[attr as keyof PetData];
        if (petValue) {
          value = String(petValue);
        }
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
          <Attribute key={label} label={label} value={value} />
        ))}
      </ul>
    </div>
  );
};
