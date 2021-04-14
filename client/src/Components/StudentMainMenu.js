import React, {Component} from 'react';
import css from './Student.module.css'

class StudentMainMenu extends Component{
    
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