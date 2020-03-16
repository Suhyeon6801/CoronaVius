import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import corea19 from './corea19.png';
import News from './components/News';
import Corona from './components/Corona';
import About from './components/About';
import Map from './components/Map';
import State from './components/State';
import Predict from './components/Predict';


class App extends React.Component {

  render() {
    return (

      <div align="center">

        <div paragraph align="center">

          <br /><br /><br /><br />
          <img src={corea19} alt="corea19" />
          <br />
        </div>
        <About line-height="4em"></About>
        <News line-height="4em"></News>
        <Map line-height="4em"></Map>
        <State line-height="4em"></State>
        <Corona line-height="4em" ></Corona>
        <Predict line-height="4em"></Predict>

        <br /><br /><br /><br /><br /><br />
      </div>
    );
  }
}

export default App;