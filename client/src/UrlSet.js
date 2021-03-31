import React, {Component} from 'react';
import {BrowserRouter as Router, Link, NavLink, Route} from 'react-router-dom';
import StudentMainMenu from './Components/StudentMainMenu.js'
import StudentProfile from './Components/StudentProfile.js'
import StudentNotification from './Components/StudentNotification.js'
import StudentProject from './Components/StudentProject.js'
import StudentGroup from './Components/StudentGroup.js'
import App from './App'

//here to set all the urls 
//free to add and change
class UrlSet extends Component{   
    render() {
        return(
          <Router>    
            <div>
             <Route path="/" exact strict component={App}/>     
              <Route path="/student/home" exact strict component={StudentMainMenu}/>     
              <Route path="/student/profile" exact strict component={StudentProfile}/>   
              <Route path="/student/notification" exact strict component={StudentNotification}/> 
              <Route path="/student/project" exact strict component={StudentProject}/>   
              <Route path="/student/project/group" exact strict component={StudentGroup}/>  
            </div>
          </Router>
        )
    }
}
export default UrlSet;