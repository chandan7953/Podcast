import React from "react";
import Button from "../../common/Button/Button";

const EpisodeDetailsCard = ({ index, title, desc, audioFile, onClick }) => {
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="episode">
      <h2>
        {index}. {capitalizeFirstLetter(title)}
      </h2>
      <p style={{ color: "var(--purple-gray)" }}>
        {capitalizeFirstLetter(desc)}
      </p>
      <Button
        text={"Play"}
        onClick={() => {
          onClick(audioFile);
        }}
        width={"100px"}
      />
    </div>
  );
};

export default EpisodeDetailsCard;
