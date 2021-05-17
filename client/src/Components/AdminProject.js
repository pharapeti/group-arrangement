import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

// this page is like a sample for all the admin project pageXOffset, each project
// has one project page and also the url should change  e.g. /admin/home/project 1
class AdminProject extends Component{

    ToAddStudentPage()
    {
        var Id=this.props.match.params.id    
        this.props.history.push(
            '/admin/project/'+ Id +'/add'
            )
    }

    toCreateGroupPage()
    {
        var Id=this.props.match.params.id    
        this.props.history.push(
            '/admin/project/'+ Id +'/group/create'
            )

    }

    ToEditGroupPage()
    {
        var Id=this.props.match.params.id    
        this.props.history.push(
            '/admin/project/'+ Id +'/group/edit'
            )

    }

    ToSettingPage()
    {
        var Id=this.props.match.params.id    
        this.props.history.push(
            '/admin/project/'+ Id +'/edit'
            )
    }
    
    render() {
        return(
            <body>
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
                    <text className={css.subtitle}>
                        <br/>
                        Student List:                 
                        <button className={css.addstudentbtn} onClick={()=>this.ToAddStudentPage()}>Add Student</button> 
                        <button className={css.projecttwobutton} onClick={()=>this.toCreateGroupPage()}>Create Groups</button>
                        <button className={css.projecttwobutton} onClick={()=>this.ToEditGroupPage()}>Edit Groups</button>
                    </text>
                </div>

                <div >
                    <h1 className={css.title}>
                        Project {this.props.match.params.id}
                        <button className={css.projectgraybutton} onClick={()=>this.ToSettingPage()}>Edit Setting</button>
                        <button className={css.projectgraybutton}>Delete</button>
                    </h1> 
                    <text className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Description:</text>
                    <text className={css.textcontent}><br/><br/>&nbsp;&nbsp;&nbsp;Group Size:</text>
                    <text className={css.textcontent}><br/><br/>&nbsp;&nbsp;&nbsp;Interest:</text>
                    <text className={css.textcontent}><br/><br/>&nbsp;&nbsp;&nbsp;Skill:</text>
                    <br/><br/><br/>
                    <text className={css.textcontent} style={{fontSize: "35px"}}>&nbsp;&nbsp;Groups:</text>
                </div>   
                
            </body>
        )
    }
}

export default AdminProject;