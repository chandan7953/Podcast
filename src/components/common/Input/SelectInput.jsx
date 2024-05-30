import React from "react";
import "./style.css";
const SelectInput = ({ handleGenderChange, gender }) => {
  return (
    <div className="gender gneder-section">
      <div className="gneder-section-item">
        <input
          className="gender-item-box"
          type="checkbox"
          id="male"
          value="boy"
          checked={gender === "boy"}
          onChange={handleGenderChange}
        />
        <label htmlFor="male" className="gender-item-lable">
          Male
        </label>
      </div>
      <div className="gneder-section-item">
        <input
          type="checkbox"
          className="gender-item-box"
          id="female"
          value="girl"
          checked={gender === "girl"}
          onChange={handleGenderChange}
        />
        <label htmlFor="female" className="gender-item-lable">
          Female
        </label>
      </div>
    </div>
  );
};

export default SelectInput;
