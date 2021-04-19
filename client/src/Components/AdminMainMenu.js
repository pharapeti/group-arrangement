import React, {Component} from 'react';
import css from './Admin.module.css'

class AdminMainMenu extends Component{
    
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
                <div>
                    <h1 className={css.title}>Projects</h1>
                    {/* test only button, free to edit */}
                    <button>to project page</button>
                    <button className={css.createprojectbtn}onClick={()=>{window.location.href="/admin/project/create"}}>Create Project</button>
                </div> 
            </body>
        )
    }
}

export default AdminMainMenu;