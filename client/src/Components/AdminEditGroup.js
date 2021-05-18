import React, {Component} from 'react';
import css from './Admin.module.css'
import DragNDrop from './DNDComponents/DragNDrop.js';
import { signout } from './AuthenticationHelper'

class AdminEditGroup extends Component{

    navigateBack() {
        this.props.history.goBack();
    }

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
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/admin/notifications"}}>Notifications</button>                 
                         
                    <div className={css.line1}/>   
                    <div className={css.line2}/>                   
                    </nav>
                </div>  

                <div className={css.projectrightcontent}>
                    <p className={css.subtitle}>
                        <br/><br/>
                        <br/>                
                        <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.navigateBack()}>Cancel</button>
                        <button className={css.projecttwobutton} style={{marginTop: "595px"}}>Save</button>
                    </p>
                </div>
                
                <div >
                    <h1 className={css.title}>Add/Remove from a group</h1>
                </div>   
                <DragNDrop />

                
            </>
        )
    }
}

export default AdminEditGroup;