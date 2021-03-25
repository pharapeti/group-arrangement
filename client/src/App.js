import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    userList: []
  };

  componentDidMount() {
    fetch('http://localhost:6060/api/users')
      .then(response =>
        response.json()
          .then((j) => this.setState({ userList: j.map(user => user['first_name']) })))
  }

render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to the Group Arrangement project!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          {this.state.userList.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </div>
        <p>Number of users: {this.state.userList.length}</p>
      </div>
    );
  }
}
export default App;