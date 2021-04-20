import React, {Component} from 'react';
import {BrowserRouter as Router, Link, NavLink, Route} from 'react-router-dom';
import StudentMainMenu from './Components/StudentMainMenu.js'
import StudentProfile from './Components/StudentProfile.js'
import StudentNotification from './Components/StudentNotification.js'
import StudentProject from './Components/StudentProject.js'
import StudentGroup from './Components/StudentGroup.js'
import AdminMainMenu from './Components/AdminMainMenu'
import AdminNotification from './Components/AdminNotification.js'
import AdminCreateProject from './Components/AdminCreateProject.js'
import AdminProject from './Components/AdminProject.js'
import AdminCreateGroup from './Components/AdminCreateGroup.js'
import AdminProjectAddStudents from './Components/AdminProjectAddStudents.js'
import AdminEditGroup from './Components/AdminEditGroup.js'
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
              <Route path="/admin/home" exact strict component={AdminMainMenu}/>  
              <Route path="/admin/notification" exact strict component={AdminNotification}/> 
              <Route path="/admin/project/create" exact strict component={AdminCreateProject}/> 
              <Route path="/admin/project" exact strict component={AdminProject}/> 
              <Route path="/admin/project/group/create" exact strict component={AdminCreateGroup}/> 
              <Route path="/admin/project/add" exact strict component={AdminProjectAddStudents}/>
              <Route path="/admin/project/group/edit" exact strict component={AdminEditGroup}/>  
            </div>
          </Router>
        )
    }
}
export default UrlSet;