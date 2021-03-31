import React, {Component} from 'react';
import css from './Student.module.css'

class StudentNotification extends Component{
    
    render() {
        return(
            <body>
                <div>
                    <h1 className={css.head}>Group Arrangement</h1>
                    <button className={css.signout} onClick={()=>window.location.href="/"}>Sign out</button>
                </div>
                <div>
                    <p className={css.sidebar}></p>
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/student/home"}}>Menu</button>
                    <line className={css.line1}/>
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>
                    <line className={css.line2}/>
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notification"}}>Notification</button>
                    <line className={css.line3}/>
                </div>      
                <div>
                    <h1 className={css.title}>Notification</h1>
                    <br/>
                    <text className={css.subtitle}>• Project Notification:</text>
                    <br/><br/><br/>
                    <text className={css.subtitle}>• Group Notification:</text>
                </div>   
            </body>
        )
    }
}

export default StudentNotification;