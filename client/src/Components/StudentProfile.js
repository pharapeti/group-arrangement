import React, {Component} from 'react';
import css from './Student.module.css'

class StudentProfile extends Component{
    
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
                    <h1 className={css.title}>Profile</h1>
                    <br/>
                    <text className={css.subtitle}>Student id:</text>
                    <br/><br/>
                    <text className={css.subtitle}>Student name:</text>
                    <br/><br/><br/>
                    <text className={css.subtitle}><strong>Preference:</strong></text>
                    <div>
                        <br/><br/><text className={css.textcontent}> • Skills:</text>
                        <select className={css.profileselect}>
                            <option value="C++">C++</option>
                            <option value="Java">Java</option>
                            <option value="JavaScript">JavaScript</option>
                        </select>
                    </div>
                    <div>
                        <br/><br/><text className={css.textcontent}> • Interest:</text>
                        <select className={css.profileselect}>
                            <option value="Games">Games</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                </div>   
            </body>
        )
    }
}

export default StudentProfile;