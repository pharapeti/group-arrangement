import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminProjectAddStudents extends Component {

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
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/admin/notification"}}>Notification</button>                 
                         
                    <line className={css.line1}/>   
                    <line className={css.line2}/>                   
                    </nav>
                </div>  

                 <div className={css.projectrightcontent}>
                    <p className={css.subtitle}>
                        <br/><br/>Student in the project: 
                        <br/>                
                        <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.navigateBack()}>Cancel</button>
                        <button className={css.projecttwobutton} style={{marginTop: "595px"}}>Save</button>
                    </p>
                </div>

                <div >
                    <h1 className={css.title}>Project {this.props.match.params.id}</h1>
                    <p className={css.subtitle}>All students:</p>
                </div> 
                
            </> 
        )
    }
}

export default AdminProjectAddStudents;