import React from 'react';
import '../../styles/global.css';
import './projects.css';
import superMundane from "src/assets/MaleahSmith-Super-Mundane.jpg";
import exposure from "src/assets/MaleahSmith_ExposureTriangle-01.jpg";
import internPosters from "src/assets/Historian Wintern Posters.png";
import howlSticker from "src/assets/howl sticker.png";


const Projects = () => {
  return(
    <div className="container" style={{ paddingTop: "200px" }}>
      <h1>projects</h1>
      <p id="intro">below is a multimedia collection containing works from my art classes toward my digital arts minor and my involvement in creative leadership as both a Commercials Co-Coordinator for Pilipinx American Culture Night and Co-Historian for Kababayan at UCI</p>
      <div className="images">
        <p className="title">Super Mundane | Photoshop</p>
        <img src={superMundane} alt="A composition of 3 images from left to right depicting Batman in a grocery store, SpiderMan in the subway, and Wonder Woman working a diner." width="1014" height="222"/>
        <div className="emptyBlock"></div>
        <p className="title">Exposure Triangle Infographic | Illustrator</p>
        <img src={exposure} alt="An infographic of the exposure triangle used in photography" style={{ width: "100%", height: "auto", maxWidth: "500px" }}/>
        <div className="emptyBlock"></div>
        <p className="title">Intern Posters | Canva</p>
        <img src={internPosters} alt="Posters of three digital cameras side-by-side." style={{ width: "100%", height: "auto", maxWidth: "1000px" }}/>
        <div className="emptyBlock"></div>
        <p className="title">"Howl" Family Logo | Canva</p>
        <img src={howlSticker} alt="Heart on fire of 'Howl Family' logo" style={{ width: "100%", height: "auto", maxWidth: "500px" }}/>
        <div className="emptyBlock"></div>
        <p className="title">PACNversary Documentary | Premiere Pro</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/6oAcMWlMwXU?si=X4TFEsEOK80imLEZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      </div>
    </div>
  );
};

export default Projects;