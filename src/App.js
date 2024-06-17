import React from 'react';
import SlideShow from './components/SlideShow';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <audio id="background-music" loop autoPlay>
        <source src="\wedding-slideshow\public\music.mp3" type="audio/mpeg" />
      </audio>
      <SlideShow />
    </div>
  );
};

export default App;
