import React from "react";
import moment from 'moment';
import ControlPanel from "../ControlPanel/ControlPanel";
import GeoData from "../GeoData/GeoData";
import MessageData from "../MessageData/MessageData";
import UserData from "../UserData/UserData";
import "./App.scss";

class App extends React.Component {
  state = {
    data: [],
	activeFilter: (i) => i,
	startDate: moment()
  };

  componentWillMount() {
    const initialWebsocket = new WebSocket("wss://wikimon.hatnote.com/en/");
    initialWebsocket.onclose = (error) => console.log("error", error);
    initialWebsocket.onopen = (open) => console.log("open:", open);
    initialWebsocket.onmessage = (message) => {
      this.setState({ data: [...this.state.data, JSON.parse(message.data)] });
    };
  }

  render() {
    return (
      <div className="app">
        <button onClick={() => console.log(this.state.data)}>
          dump to console
        </button>
		<div>Listening to data since {this.state.startDate.fromNow()}</div>
        <ControlPanel />
        <MessageData data={this.state.activeFilter(this.state.data)} />
        <UserData data={this.state.activeFilter(this.state.data)} />
        <GeoData data={this.state.activeFilter(this.state.data.filter((message) => message.geo_ip))} />
      </div>
    );
  }
}

export default App;
