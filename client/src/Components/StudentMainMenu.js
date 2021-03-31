import React, {Component} from 'react';
import css from './Student.module.css'

class StudentMainMenu extends Component{
    
    render() {
        return(
            <body>
                <div>
                    <h1 className={css.head}>Group Arrangement</h1>
                    <button className={css.signout} onClick={()=>window.location.href="/"}>Sign out</button>
                </div>
                <div>
                    <p className={css.sidebar}></p>
                    <button className={css.sidebutton1} onClick={()=>{window.location.hef="/student/home"}}>Menu</button>
                    <line className={css.line1}/>
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>
                    <line className={css.line2}/>
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notification"}}>Notification</button>
                    <line className={css.line3}/>
                </div>      
                <div>
                    <h1 className={css.title}>Student Menu</h1>
                    <br/>
                    <text className={css.subtitle}>Your Project(s):</text>
                    <br/><br/>
                    {/* //button for test only */}
                    <button onClick={()=>{window.location.href="/student/project"}}>to Project1(for test)</button>
                </div>   
            </body>
        )
    }
}

export default StudentMainMenu;