import React, { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../components/common/Button/Button";
import EpisodeDetailsCard from "../components/podcasts/EpisodeDetails/EpisodeDetailsCard";
import AudioPlayer from "../components/podcasts/AudioPlayer/AudioPlayer";

const PodcastDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcasts] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const prevIdRef = useRef(null);
  const [playingFile, setPlayingFile] = useState("");

  useEffect(() => {
    if (id && id !== prevIdRef.current) {
      getData();
      prevIdRef.current = id;
    }
  }, [id]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcasts({ id: id, ...docSnap.data() });
      } else {
        toast.error("No Podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        toast.error(error.message);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);
  return (
    <div>
      <Header />
      <div className="form" style={{ marginTop: "0px" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
                marginBottom: "1rem",
                gap: "1rem",
              }}
            >
              <h1 id="heading" style={{ textAlign: "left", margin: "0" }}>
                {capitalizeFirstLetter(podcast.title)}
              </h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  padding={"2rem"}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                ></Button>
              )}
            </div>

            <div className="bannerImg">
              <img src={podcast.bannerImage} alt="bannerImage" />
            </div>
            <p className="podcastDesc">
              {capitalizeFirstLetter(podcast.description)}
            </p>
            <h1 id="heading" style={{ textAlign: "left", marginTop: "20px" }}>
              Episodes
            </h1>
            {episodes.length > 0 ? (
              <ol
                style={{
                  width: "95%",
                }}
              >
                {episodes.map((episode, index) => {
                  return (
                    <EpisodeDetailsCard
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      desc={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </ol>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default PodcastDetails;
