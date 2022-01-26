import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./MainContainer.css";
import Playlist from "./Playlist";
import Tracklist from "./Tracklist";
import Settings from "./Settings";

const settingsOpts = [
  {
    title: "Popularity",
    minValue: "Playing at bars",
    maxValue: "World Tour",
    minTitle: "min_popularity",
    maxTitle: "max_popularity",
  },
  {
    title: "Energy",
    minValue: "Chill",
    maxValue: "Banger",
    minTitle: "min_energy",
    maxTitle: "max_energy",
  },
  {
    title: "Vocals",
    minValue: "None",
    maxValue: "A Ton",
    minTitle: "min_instrumentalness",
    maxTitle: "max_instrumentalness",
  },
  {
    title: "Tempo",
    minValue: "Slow",
    maxValue: "Fast",
    minTitle: "min_tempo",
    maxTitle: "max_tempo",
  },
  {
    title: "Danceable",
    minValue: "Not at all",
    maxValue: "Boogie",
    minTitle: "min_danceability",
    maxTitle: "max_danceability",
  },
  {
    title: "Acoustics",
    minValue: "All digital",
    maxValue: "All analog",
    minTitle: "min_acoustiness",
    maxTitle: "max_acoustiness",
  },
];

const MainContainer = ({ tracks, addToSelectedTracks, setAllSettings }) => {
  const updateSetting = (name, value) =>
    setAllSettings((old) => ({
      ...old,
      [name]: value,
    }));
  const [showSettingsActive, setShowSettingsActive] = useState(false);
  const toggleSettings = () => setShowSettingsActive((settings) => !settings);
  return (
    <div className="bloc__container flex__ctr bloc__marginLrg">
      <div className="bloc__wrapper artist__section">
        <div className="mainContainer__grid">
          {tracks.length ? (
            <Tracklist
              tracks={tracks}
              addToSelectedTracks={addToSelectedTracks}
            />
          ) : (
            <div>Start searching</div>
          )}
          <div className="playlistSettings__container">
            <div className="showTracklist__container">
              <div className="showTracklist__cta" onClick={toggleSettings}>
                <div
                  className={classNames({
                    showTracklist__title: true,
                    "showTracklist__title--isActive": showSettingsActive,
                  })}
                >
                  Show Tracklist Settings
                  <div>
                    <div
                      className={classNames({
                        "showTracklist__title--glow": true,
                        "showTracklist__title--glowIn": showSettingsActive,
                        "showTracklist__title--glowOut": !showSettingsActive,
                      })}
                    >
                      Show Tracklist Settings
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.0395mm"
                  height="6.1238mm"
                  viewBox="0 0 8.6159 17.3587"
                  className={classNames({
                    showTracklist__icon: true,
                    "showTracklist__icon--isActive": showSettingsActive,
                  })}
                >
                  <path d="M.7687,0a.7467.7467,0,0,1,.53.22l6.52,6.52a2.7349,2.7349,0,0,1,0,3.86l-6.52,6.52A.75.75,0,0,1,.2013,16.0974q.018-.0194.0374-.0374l6.52-6.52a1.2354,1.2354,0,0,0,0-1.7393L.2387,1.28A.75.75,0,0,1,.7687,0Z" />
                </svg>
              </div>
              <div>
                {showSettingsActive &&
                  settingsOpts.map((settingsOpt) => (
                    <Settings
                      key={settingsOpt.title}
                      settingsOpt={settingsOpt}
                      className="settings__blendsIn--animation"
                      minTitle={settingsOpt.minTitle}
                      maxTitle={settingsOpt.maxTitle}
                      updateSetting={updateSetting}
                    />
                  ))}
              </div>
            </div>
            <Playlist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
