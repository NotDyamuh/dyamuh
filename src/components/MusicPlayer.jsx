const MusicPlayer = () => {
  return (
    <div className="music-player">
      <div className="song-info">
        <span id="songTitle">2TONE</span> <span id="artist">by Yeat ft. Don Toliver</span>
      </div>
      <br />
      <div className="controls">
        <button id="prevButton" className="control-button"><i className="fas fa-backward"></i></button>
        <button id="playButton" className="control-button"><i className="fas fa-play"></i></button>
        <button id="nextButton" className="control-button"><i className="fas fa-forward"></i></button>
      </div>
    </div>
  );
}

export default MusicPlayer;
