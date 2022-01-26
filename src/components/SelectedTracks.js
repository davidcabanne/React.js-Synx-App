import React from "react";
import styled from "styled-components";

const Cover = styled.img`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Container = styled.div`
  display: inline-flex;
  height: 60px;
  border-radius: 10px;
  align-items: center;
  background-color: black;
  img {
    height: 100%;
  }
`;

const Cross = styled.div`
  cursor: pointer;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

const SelectedTracks = ({ tracks, removeFromSelectedTracks }) => {
  return (
    <div className="bloc__container flex__ctr">
      <div className="bloc__wrapper">
        {tracks.map((track) => (
          <Container>
            <Cover src={track.cover} />
            <div>{track.title}</div>
            <Cross onClick={() => removeFromSelectedTracks(track)}>
              <svg viewBox="0 0 24 24" height={24} width={24}>
                <path
                  fill="currentColor"
                  d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                />
              </svg>
            </Cross>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default SelectedTracks;
