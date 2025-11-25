import { useEffect } from "react";
import { injectJS } from "./utils/JavaScript";
import ProfileCard from "./components/ProfileCard";
import SocialLinks from "./components/SocialLinks";
import AudioInit from "./components/AudioInit";
import AudioModal from "./components/AudioModal";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  useEffect(() => {
    injectJS();
  }, []);

  return (
    <>
      <canvas id="rainCanvas"></canvas>
      <div className="content">
        <ProfileCard />
        <SocialLinks />
      </div>
      <div id="customCursor"></div>
      <AudioInit />
      <AudioModal />
      <MusicPlayer />
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
      <Footer />
    </>
  );
}

export default App;