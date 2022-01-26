import React, { useState } from "react";
import className from "classnames";
import Track from "./Track";
import formatTime from "../lib/formatTime";
import "./Tracklist.css";

const getTracksDuration = (tracks) => {
  let totalDuration = 0;
  for (let i = 0; i < tracks.length; i++) {
    totalDuration += tracks[i].duration;
  }
  return totalDuration;
};

const Tracklist = ({ tracks = [], addToSelectedTracks }) => {
  const [state, setState] = useState({
    totalDuration: getTracksDuration(tracks),
    activeTrackIndex: 0,
    activeTrackState: "PAUSED",
    showPlayerActive: true,
  });
  const {
    totalDuration,
    activeTrackIndex,
    activeTrackState,
    showPlayerActive,
  } = state;

  const showPlayer = function () {
    setState((state) => ({
      ...state,
      showPlayerActive: !state.showPlayerActive,
    }));
  };
  const playPauseTrack = function (trackId) {
    const sameTrack = trackId === tracks[activeTrackIndex].id;
    if ((sameTrack && activeTrackState === "PAUSED") || !sameTrack) {
      console.log("playing track", trackId);
      setState((state) => ({
        ...state,
        activeTrackState: "PLAYING",
      }));
      // Play on player
    } else {
      console.log("pausing track", trackId);
      setState((state) => ({
        ...state,
        activeTrackState: "PAUSED",
      }));
      // Pause player
    }

    let trackIndex = null;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].id === trackId) {
        trackIndex = i;
      }
    }
    setState((state) => ({
      ...state,
      activeTrackIndex: trackIndex,
    }));
  };

  return (
    <>
      <div className="tracklist__mainWrapper">
        <div className="tracklist__header">
          <div className="tracklist__mainTitle">Tracklist</div>
          <div className="tracklist__mainInfos">
            <div className="tracklist__mainInfos--nbr">
              {tracks.length} tracks
            </div>
            <div className="tracklist__mainInfos--duration">
              {formatTime(totalDuration)}
            </div>
          </div>
        </div>
        <div className="tracklist__tracksContainer">
          {tracks.map((track) => (
            <Track
              key={`track-${track.id}`}
              track={track}
              activeTrackId={tracks[activeTrackIndex].id}
              activeTrackState={activeTrackState}
              playPauseTrack={playPauseTrack}
              className="loading__animation"
              onClick={() => addToSelectedTracks(track)}
            />
          ))}
        </div>
      </div>
      <div
        className={className({
          player__spacer: true,
          "showPlayer--isActive": showPlayerActive,
        })}
      >
        <div
          className={className({
            player__container: true,
            "player__container--isActive": showPlayerActive,
          })}
        >
          <div className="player__wrapper">
            <div className="track__wrapper">
              <div
                className={className({
                  track__coverWrapper: true,
                  "track__coverWrapper--isActive": showPlayerActive,
                })}
              >
                <img
                  className={className({
                    track__cover: true,
                    "track__cover--clicked": false,
                  })}
                  src={tracks[activeTrackIndex].cover}
                />
              </div>
              <div
                className={className({
                  track__infoContainer: true,
                  "track__infoContainer--isActive": showPlayerActive,
                })}
              >
                <div
                  className={className({
                    track__infos: true,
                    "track__infos--isActive": showPlayerActive,
                  })}
                >
                  <div
                    className={className({
                      track__title: true,
                      "track__title--isActive": showPlayerActive,
                    })}
                  >
                    {tracks[activeTrackIndex].title}
                  </div>
                  <div className="track__artist">
                    {tracks[activeTrackIndex].artist}
                  </div>
                </div>
                <div className="track__infos--right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3.0395mm"
                    height="6.1238mm"
                    viewBox="0 0 8.6159 17.3587"
                    onClick={showPlayer}
                    className={className({
                      showTracklist__icon: true,
                      "showPlayer__icon--isActive": showPlayerActive,
                    })}
                  >
                    <path d="M.7687,0a.7467.7467,0,0,1,.53.22l6.52,6.52a2.7349,2.7349,0,0,1,0,3.86l-6.52,6.52A.75.75,0,0,1,.2013,16.0974q.018-.0194.0374-.0374l6.52-6.52a1.2354,1.2354,0,0,0,0-1.7393L.2387,1.28A.75.75,0,0,1,.7687,0Z" />
                  </svg>
                  <div className="track__duration">
                    {formatTime(tracks[activeTrackIndex].duration)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracklist;
