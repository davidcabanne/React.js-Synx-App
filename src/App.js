import { useEffect, useState } from "react";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Search from "./components/Search";
import MainContainer from "./components/MainContainer";
import MainSpacer from "./components/MainSpacer";
import "./App.css";
import SelectedTracks from "./components/SelectedTracks";
import { useLazyQuery, gql } from "@apollo/client";
import _ from "lodash";

const initialTracks = [
  {
    id: 1,
    title: "Memory Residue",
    artist: "Anenon",
    cover:
      "https://geo-media.beatport.com/image_size/500x500/880047f6-f5b5-447f-afa9-979f21b3c4da.jpg",
    duration: 288,
  },
  {
    id: 2,
    title: "The Distance",
    artist: "Gaussian Curve",
    cover:
      "https://img.discogs.com/j-GufqMU4Ebw9qU6_Ota4fuKkI0=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9914274-1488460541-1085.jpeg.jpg",
    duration: 371,
  },
  {
    id: 3,
    title: "Reverse Culture Music",
    artist: "Steve Hauschildt",
    cover:
      "https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/31/d9/f2/31d9f2e3-2591-acec-1681-3d79f1a64b53/804297834603.jpg/400x400bb.jpg",
    duration: 369,
  },
  {
    id: 4,
    title: "Forest Run",
    artist: "Joseph Shabason",
    cover: "https://i1.sndcdn.com/artworks-000392380905-53pg6y-t500x500.jpg",
    duration: 269,
  },
  {
    id: 5,
    title: "Reverie for Fragile Houseplants",
    artist: "Tomaga",
    cover: "https://f4.bcbits.com/img/a1432376908_10.jpg",
    duration: 270,
  },
  {
    id: 6,
    title: "Long Long Silk Bridge",
    artist: "Susumu Yokota",
    cover: "https://f4.bcbits.com/img/a1699237270_5.jpg",
    duration: 182,
  },
  {
    ìd: 7,
    title: "Ecce! Ego!",
    artist: "Leon Vynehall",
    cover:
      "https://direct.rhapsody.com/imageserver/images/alb.559464649/600x600.jpg",
    duration: 213,
  },
  {
    id: 8,
    title: "Exit Seven",
    artist: "Jonny Nash",
    cover: "https://i1.sndcdn.com/artworks-000109536130-33rhcz-t500x500.jpg",
    duration: 216,
  },
  {
    id: 9,
    title: "The Piano Drop",
    artist: "Tim Hecker",
    cover:
      "https://lastfm.freetls.fastly.net/i/u/ar0/9de43f0a02c8b0a3fe8996b3c75ad2fb.jpg",
    duration: 174,
  },
  {
    id: 10,
    title: "Why Like This?",
    artist: "Teebs",
    cover:
      "https://img.discogs.com/uV4n_9uSBltauQ5WM2CsZLbBSTc=/fit-in/600x596/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-2597743-1538480398-9796.jpeg.jpg",
    duration: 177,
  },
];

const recommendationsRequest = gql`
  query recommendations($identifier: RecommendationRequest) {
    recommendations(identifier: $identifier)
  }
`;

const normalizeTracks = (tracksData) =>
  tracksData.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    cover: track.album.images[0]?.url,
    duration: track.duration_ms / 1000,
  }));

function App() {
  const [tracks, setTracks] = useState(initialTracks);
  const [settings, setAllSettings] = useState({});
  const [selectedTracks, setSelectedTracks] = useState({});
  const [
    loadRecommendations,
    { data: recommendationsData, loading: loadingRecommendations },
  ] = useLazyQuery(recommendationsRequest);
  let recommendations = _.get(
    recommendationsData,
    "recommendations.body.tracks",
    []
  );

  useEffect(() => {
    if (Object.values(selectedTracks).length) {
      loadRecommendations({
        variables: {
          identifier: {
            seed_tracks: Object.values(selectedTracks).map((track) => track.id),
            ...settings,
          },
        },
      });
    } else {
      recommendations = [];
    }
  }, [selectedTracks, settings]);

  return (
    <>
      <Background />
      <Nav />
      <Hero />
      <Search
        setTracks={(tracksData) => {
          setTracks(normalizeTracks(tracksData));
        }}
      />
      <SelectedTracks
        tracks={Object.values(selectedTracks)}
        removeFromSelectedTracks={(track) =>
          setSelectedTracks((selectedTracks) => {
            const newSelectedTracks = { ...selectedTracks };
            delete newSelectedTracks[track.id];
            return newSelectedTracks;
          })
        }
      />
      <MainContainer
        tracks={
          loadingRecommendations || recommendations.length
            ? normalizeTracks(recommendations || [])
            : tracks
        }
        settings={settings}
        setAllSettings={setAllSettings}
        addToSelectedTracks={(track) =>
          setSelectedTracks((selectedTracks) => ({
            ...selectedTracks,
            [track.id]: track,
          }))
        }
      />
      <MainSpacer />
    </>
  );
}

export default App;
