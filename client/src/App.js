import React, { Component } from 'react';
import './App.css';
import css from "./Login.module.css"

class App extends Component {
  state = {
    external_id: '',
    password: ''
  };

  redirect(user_type) {
    if(user_type === 1) {
      window.location.href="/student/home"
    }
    else if(user_type === 2) {
      window.location.href="/admin/home"
    }
  }

  handleKeyDown(event) {
    // If Enter key is pressed, attempt to log in
    if(event.keyCode === 13) { 
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const { external_id, password } = this.state;
    const jsonString = JSON.stringify({ external_id: external_id, password: password });

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

  setExternalID(e) {
    this.setState({ external_id: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

render() {
    return (
      <>
        <div>
          <h1 className={css.head}>Group Arrangement</h1>
        </div>

        <div>
          <p className={css.subtitle}>Sign in</p>
          <p className={css.usernameandpassword}><br/>Staff or Student number: </p>
          <input
            id='external_id'
            className={css.input}
            onChange={ this.setExternalID.bind(this) }
            value={ this.state.external_id }
          >
          </input>

          <p className={css.usernameandpassword}><br/>Password: </p>
          <input
            id='password' 
            className={css.input} 
            type="password"
            onChange={ this.setPassword.bind(this) }
            value={ this.state.password }
            onKeyDown={ this.handleKeyDown.bind(this) }
          >
          </input>
          <button className={css.signinbtn} onClick={() => this.handleSubmit()}>Sign in</button>
        </div>

      </>
    );
  }
}
export default App;