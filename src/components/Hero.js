import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="bloc__container flex__ctr hero__section">
      <div className="bloc__wrapper flex__ctr">
        <div className="hero__wrapper">
          <div className="hero__punchline">
            The right music for your product.
            <div className="hero__punchline--glow">
              The right music for your product.
            </div>
          </div>
          <div className="hero__text">
            Got the brief? - we speak the language. <br />
            Something within our budget that sounds like Freddie Mercury with a
            sprinkle of Aphex Twin and with vocals about "summer". Appealing to
            a 30-40 year old segment from Italy.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
