import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const PodcastCard = ({ id, title, displayImage }) => {
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="podcastImg" src={displayImage} alt="displayImage" />
        <p className="podcastTitle">{capitalizeFirstLetter(title)}</p>
      </div>
    </Link>
  );
};

export default PodcastCard;
