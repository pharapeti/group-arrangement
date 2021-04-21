import React, {Component} from 'react';
import css from './Student.module.css'
import InputTag from './InputTag.js'

class StudentProfile extends Component{


    render() {
        return(
            <body>
                <div>
                    <headers>
                        <h1 className={css.head}>
                             Group Arrangement
                            <button className={css.signout} onClick={()=>window.location.href="/"}>Sign out</button>      
                        </h1>          
                    </headers>   
                </div>
                <div>
                    <nav className={css.sidebar}>

                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/student/home"}}>Menu</button>                   
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>                 
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notification"}}>Notification</button>
                    
                    <line className={css.line1}/>   
                    <line className={css.line2}/>  
                    <line className={css.line3}/>                 
                    </nav>
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
                    </div>
                    <div style={{marginLeft:350}}>
                        <InputTag />
                    </div>
                    <div>
                        <br/><br/><text className={css.textcontent}> • Interest:</text>
                    </div>
                    <div style={{marginLeft:350}}>
                        <InputTag />
                    </div>
                </div>   
            </body>
        )
    }
}

export default StudentProfile;