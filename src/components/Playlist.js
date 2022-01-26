import React, { useState } from "react";
import classNames from "classnames";
import "./Playlist.css";

const Playlist = () => {
  const [state, setState] = useState({
    showBtnActive: false,
    btnMessageDefault: "Save Playlist to Spotify",
  });
  const btnActive = function () {
    const newState = {};
    newState.showBtnActive = !state.showBtnActive;

    if (state.showBtnActive === true) {
      newState.btnMessageDefault = "Playlist Saved";
    } else {
      newState.btnMessageDefault = "Save Playlist to Spotify";
    }
    setState(newState);
  };
  const { showBtnActive, btnMessageDefault } = state;

  return (
    <div className="showTracklist__container">
      <div className="playlist__container">
        <div className="playlist__title">Playlist Name</div>
        <div className="playlis__mix--Synx">
          Synx Mix: <span className="playlis__mix--Artist">Chosen Artist</span>
        </div>
        <div className="playlist__cta">
          <div className="playlist__cta--title">Public</div>
          <input className="public__ctaBtn" type="checkbox" id="switchPublic" />
          <label htmlFor="switchPublic">Toggle</label>
        </div>
        <div className="playlist__cta">
          <div className="playlist__cta--title">Collaborative</div>
          <input
            className="collaborative__ctaBtn"
            type="checkbox"
            id="switchCollaborative"
          />
          <label htmlFor="switchCollaborative">Toggle</label>
        </div>
        <button
          onClick={btnActive}
          className={classNames({ "buttonClicked--isActive": showBtnActive })}
        >
          {showBtnActive && (
            <svg
              v-if="showBtnActive"
              xmlns="http://www.w3.org/2000/svg"
              width="8.4667mm"
              height="8.4667mm"
              viewBox="0 0 24 24"
              className={classNames({
                "playlist__icon--success": true,
                "playlist__icon--isActive": showBtnActive,
              })}
            >
              <path
                className="cls-1"
                d="M8.6782,20.1781a1.5,1.5,0,0,1-1.0605-.4395L.9395,13.0609a1.5,1.5,0,1,1,2.1211-2.1216L8.6768,16.555,20.9375,4.263a1.5,1.5,0,0,1,2.125,2.1182L9.74,19.7377a1.5018,1.5018,0,0,1-1.061.44Z"
              />
            </svg>
          )}
          <div
            className={classNames({
              playlist__buttonTitle: true,
              "playlist__buttonTitle--isActive": showBtnActive,
            })}
          >
            {btnMessageDefault}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Playlist;
