import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class StudentNotification extends Component{
    
    render() {
        return(
            <>
                <div>
                    <headers>
                        <h1 className={css.head}>
                             Group Arrangement
                            <button className={css.signout} onClick={()=>signout()()}>Sign out</button>      
                        </h1>          
                    </headers>   
                </div>
                <div>
                    <nav className={css.sidebar}>
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/admin/home"}}>Menu</button>                   
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/admin/notification"}}>Notification</button>                 
                         
                    <line className={css.line1}/>   
                    <line className={css.line2}/>                   
                    </nav>
                </div>        
                <div>
                    <h1 className={css.title}>Notification</h1>
                    <br/>
                    <p className={css.subtitle}>• Project Notification:</p>
                    <br/><br/><br/>
                    <p className={css.subtitle}>• Group Notification:</p>
                </div>   
            </>
        )
    }
}

export default StudentNotification;