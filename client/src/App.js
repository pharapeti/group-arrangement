import React, { Component } from 'react';
// import logo from './logo.svg'; // commented out because it's not being used
import './App.css';
import css from "./Login.module.css"

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    userList: []
  };

  redirect(user_type) {
    if(user_type === 1) {
      window.location.href="/student/home"
    }
    else if(user_type === 2) {
      window.location.href="/admin/home"
    }
  }

  handleLogin() {
    // external_id and password should be pulled from the input fields
    const jsonString = JSON.stringify({ external_id: 'something', password: 'somePassword' });

    fetch('http://localhost:6060/api/users/auth', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: jsonString
    })
      .then(response => response.json())
      .then(j => {
        console.log(j)
        this.redirect(j.user_type)
      })
  }

render() {
    return (
      <React.Fragment>
        <div>
          <h1 className={css.head}>Group Arrangement</h1>
        </div>

        <div>
          <p className={css.subtitle}>Sign in</p>
          <p className={css.usernameandpassword}><br/>Staff or Student number: </p>
          <input className={css.input}></input>

          <p className={css.usernameandpassword}><br/>Password: </p>
          <input className={css.input} type="password"></input>
          <button className={css.signinbtn} onClick={()=>this.handleLogin()}>Sign in</button>
        </div>
        {/*I just do not change your code so make it as commit
         <div>
          {this.state.userList.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </div>
        <p>Number of users: {this.state.userList.length}</p>*/} 
      </React.Fragment>
    );
  }
}
export default App;