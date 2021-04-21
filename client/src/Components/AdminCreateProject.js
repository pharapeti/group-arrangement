import React, {Component} from 'react';
import css from './Admin.module.css'

class AdminCreateProject extends Component{
    
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
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/admin/home"}}>Menu</button>                   
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/admin/notification"}}>Notification</button>                 
                         
                    <line className={css.line1}/>   
                    <line className={css.line2}/>                   
                    </nav>
                </div>      
                <div className={css.projectrightcotent}>
                    <button className={css.createprojectfirstbtn}   onClick={()=>window.location.href="/admin/home"}>
                        Create/Edit
                        <br/>
                    <button className={css.createprojectsecondbtn}   onClick={()=>window.location.href="/admin/home"}>Cancel</button>
                    </button>    
                </div>
                <div>
                    <h1 className={css.title}>Create/Edit Project</h1>
                    <br/>
                    <text className={css.subtitle}>
                        Project Name: 
                        <input className={css.createprojectinput} style={{marginLeft: '50px'}}></input>
                    </text>
                    <br/><br/>
                    <text className={css.subtitle}>
                        Group Size: 
                        <input className={css.createprojectinput} style={{marginLeft: '80.5px'}}></input>
                    </text>
                    <br/><br/>
                    <text className={css.subtitle}>
                        Interest: 
                        <input className={css.createprojectinput} style={{marginLeft: '131px'}}></input>
                    </text>
                    <br/><br/>
                    <text className={css.subtitle}>
                        Skills: 
                        <input className={css.createprojectinput} style={{marginLeft: '160px'}}></input>
                    </text>
                    <br/><br/>
                    <text className={css.subtitle}>
                        Description: 
                    </text>
                    <br/><br/>
                    <textarea className={css.createprojectdescriptioninput}></textarea>
                    
                </div>   
            </body>
        )
    }
}

export default AdminCreateProject;