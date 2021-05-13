import React, { Component } from 'react';
// import logo from './logo.svg';
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

  HandleLogin()
  {
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
        // this.redirect(j.user_type)
      })
  }

  HandleProjectFetch()
  {
    fetch('http://localhost:6060/api/student/projects', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(j => {
              console.log(j)
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
          <button className={css.signinbtn} onClick={()=>this.HandleLogin()}>Sign in</button>
          <button className={css.signinbtn} onClick={()=>this.HandleProjectFetch()}>Get Projects</button>
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