import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import css from "./Login.module.css"

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
      <body>
        <div>
          <headers>
            <h1 className={css.head}>Group Arrangement</h1>               
          </headers>   
        </div>   

        <div>
          <p className={css.subtitle}>Sign in</p>
          <p className={css.usernameandpassword}><br/>Staff or Student number: </p>
          <input className={css.input}></input>

          <p className={css.usernameandpassword}><br/>Password: </p>
          <input className={css.input} type="password"></input>
          <button className={css.signinbtn}>Sign in</button>
        </div>
        {/*I just do not change your code so make it as commit
         <div>
          {this.state.userList.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </div>
        <p>Number of users: {this.state.userList.length}</p> */}  
        </body>   
    );
  }
}
export default App;