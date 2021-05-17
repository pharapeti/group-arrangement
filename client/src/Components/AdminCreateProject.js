import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminCreateProject extends Component{
    
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
                <div className={css.projectrightcontent}>
                    <button className={css.createprojectfirstbtn}   onClick={()=>window.location.href="/admin/home"}>
                        Create
                        <br/>
                    <button className={css.createprojectsecondbtn}   onClick={()=>window.location.href="/admin/home"}>Cancel</button>
                    </button>    
                </div>
                <div>
                    <h1 className={css.title}>Create Project</h1>
                    <br/>
                    <p className={css.subtitle}>
                        Project Name: 
                        <input className={css.createprojectinput} style={{marginLeft: '50px'}}></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Group Size: 
                        <input className={css.createprojectinput} style={{marginLeft: '80.5px'}}></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Interest: 
                        <input className={css.createprojectinput} style={{marginLeft: '131px'}}></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Skills: 
                        <input className={css.createprojectinput} style={{marginLeft: '160px'}}></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Description: 
                    </p>
                    <br/><br/>
                    <textarea className={css.createprojectdescriptioninput}></textarea>
                    
                </div>   
            </>
        )
    }
}

export default AdminCreateProject;