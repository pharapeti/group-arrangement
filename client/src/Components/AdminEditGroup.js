import React, {Component} from 'react';
import css from './Admin.module.css'
import DragNDrop from './DNDComponents/DragNDrop.js';

class AdminEditGroup extends Component{

    BackToLastPage()
    {
        //var i=this.props.match.params.id    
        this.props.history.goBack();
    }

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

                <div className={css.projectrightcontent}>
                    <text className={css.subtitle}>
                        <br/><br/>
                        <br/>                
                        <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.BackToLastPage()}>Cancel</button>
                        <button className={css.projecttwobutton} style={{marginTop: "595px"}}>Save</button>
                    </text>
                </div>
                
                <div >
                    <h1 className={css.title}>Add/Remove from a group</h1>
                </div>   
                <DragNDrop />

                
            </body>
        )
    }
}

export default AdminEditGroup;