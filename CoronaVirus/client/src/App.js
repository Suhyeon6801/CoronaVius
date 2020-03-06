import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import corea19 from './corea19.png';
import News from './components/News';
import Home from './components/Home';
import Corona from './components/Corona';
import Join from './components/Join';
import Login from './components/Login';
import About from './components/About';
import Map from './components/Map';

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      coronamap:'',
      completed: 0,
      searchKeyword: ''
    }
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  stateRefresh() {
    this.setState({
      user: '',
      coronamap:'',
      completed: 0,
      searchKeyword: ''//searchkeyword 초기화
    });
    this.callApi()
      .then(res => this.setState({ user: res }))
      .catch(err => console.log(err));

    this.callApi2()
    .then(res=>this.setState({coronamap:res}))
    .catch(err => console.log(err));
  }

  //api에 접근해서 데이터를 받아오기, 비동기적으로 호출
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ user: res }))
      .catch(err => console.log(err));

    this.callApi2()
      .then(res=>this.setState({coronamap:res}))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch('api/user');  
    const body = await response.json();
    return body;
  }
  callApi2 = async () => {
    const response = await fetch('api/coronamap');  
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

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
        <Corona line-height="4em" ></Corona>
        <Home line-height="4em"></Home>
        <Login line-height="4em"></Login>
        <Join line-height="4em" stateRefresh={this.stateRefresh}></Join>

      </div>
    );
  }
}

export default App;