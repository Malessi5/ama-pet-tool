import React, { useState, useEffect } from "react";

export default (props: { pet: PetData }) => {
  const { pet } = props;

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

  return (
    <div className="container">
      <ul className="list-group">
        {pet.currentGuardian && pet.currentGuardian.status && (
          <li className="list-group-item">
            <strong>Status</strong>: {pet.currentGuardian.status}
          </li>
        )}
        {pet.adoptedName && (
          <li className="list-group-item">
            <strong>Adopted Name</strong>: {pet.adoptedName}
          </li>
        )}
        <li className="list-group-item">
          <strong>Intake Date</strong>: {pet.intakeDate}
        </li>
        {pet.intake.mode && pet.intake.mode !== "EMPTY_STRING" && (
          <li className="list-group-item">
            <strong>Intake Mode</strong>: {pet.intake.mode}
          </li>
        )}
        <li className="list-group-item">
          <strong>Species</strong>: {pet.species}
        </li>
        <li className="list-group-item">
          <strong>Gender</strong>: {pet.gender}
        </li>
        <li className="list-group-item">
          <strong>Primary Breed</strong>: {pet.breed}
        </li>
        {pet.breed2 && (
          <li className="list-group-item">
            <strong>Secondary Breed</strong>: {pet.breed2}
          </li>
        )}
        {pet.color && (
          <li className="list-group-item">
            <strong>Primary Color</strong>: {pet.color}
          </li>
        )}
        {pet.color2 && (
          <li className="list-group-item">
            <strong>Secondary Color</strong>: {pet.color2}
          </li>
        )}
        <li className="list-group-item">
          <strong>Size</strong>: {pet.size}
        </li>
        <li className="list-group-item">
          <strong>Date of Birth</strong>:{" "}
          {new Date(pet.dateOfBirth).toLocaleDateString()} (
          {getPetAge(new Date(pet.dateOfBirth).toLocaleDateString())})
        </li>
      </ul>
    </div>
  );
};
