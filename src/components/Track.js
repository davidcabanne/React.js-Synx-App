import React from "react";
import className from "classnames";
import formatTime from "../lib/formatTime";
import "./Track.css";

const Track = ({
  track,
  activeTrackId,
  activeTrackState,
  playPauseTrack,
  onClick,
}) => {
  const isActive = function () {
    return track.id === activeTrackId;
  };
  const isPlaying = function () {
    if (track.id === activeTrackId) {
      return activeTrackState === "PLAYING";
    }
    return false;
  };
  const isPaused = function () {
    if (track.id === activeTrackId) {
      return activeTrackState === "PAUSED";
    }
    return true;
  };

  return (
    <div className="track__container">
      <div className="track__container--bg" onClick={onClick} />
      <div className="track__wrapper">
        <div className="track__coverWrapper">
          <div className="track__playerContainer">
            <button
              onClick={() => playPauseTrack(track.id)}
              className={className({
                track__playerBtn: true,
                "track__playerBtn--clicked": isActive(),
              })}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className({
                  track__playIcon: true,
                  "track__playIcon--isActive": isPaused(),
                })}
                viewBox="0 0 100 100"
              >
                <path
                  className="cls-1"
                  d="M78.158,51.843,25.842,82.048a2.1275,2.1275,0,0,1-3.191-1.843V19.795a2.1278,2.1278,0,0,1,3.191-1.843L78.159,48.157A2.1283,2.1283,0,0,1,78.158,51.843Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className({
                  track__pauseIcon: true,
                  "track__pauseIcon--isActive": isPlaying(),
                })}
                viewBox="0 0 24 24"
              >
                <path
                  className="cls-1"
                  d="M10.65,19.11V4.89C10.65,3.54,10.08,3,8.64,3H5.01C3.57,3,3,3.54,3,4.89V19.11C3,20.46,3.57,21,5.01,21H8.64C10.08,21,10.65,20.46,10.65,19.11Z"
                />
                <path
                  className="cls-1"
                  d="M21.0016,19.11V4.89c0-1.35-.57-1.89-2.01-1.89h-3.63c-1.43,0-2.01.54-2.01,1.89V19.11c0,1.35.57,1.89,2.01,1.89h3.63C20.4316,21,21.0016,20.46,21.0016,19.11Z"
                />
              </svg>
            </button>
          </div>
          <img
            className={className({
              track__cover: true,
              "track__cover--clicked": isActive(),
            })}
            src={track.cover}
          />
        </div>
        <div className="track__infoContainer">
          <div className="track__infos">
            <div className="track__title">{track.title}</div>
            <div className="track__artist">{track.artist}</div>
          </div>
          <div className="track__duration">{formatTime(track.duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default Track;
