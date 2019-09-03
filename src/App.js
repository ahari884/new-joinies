import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import ViewMap from './components/ViewMap/ViewMap';
import Report from './components/Report/Report';
import Timeline from './components/Timline/Timeline';

class App extends React.Component {

  state = {
    active: "view-map"
  }

  optionChanged = (option) => {
    this.setState({
      active: option
    })
  }

  render() {
    return (
      <div className="App">
        <SideBar optionChanged={this.optionChanged}/>
        <Header />
        <div style={{marginLeft:186}}>
        {this.state.active == "view-map" ? <ViewMap /> : 
         this.state.active == "report" ? <Report /> :
         this.state.active == "timeline" ? <Timeline />: null}
        </div>
      </div>
    );
  }
}

export default App;
