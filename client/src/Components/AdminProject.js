import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminProject extends Component{

    constructor(props){
        super(props)
        this.state = {
            name: 'Project',
            max_group_size: '',

        }
    }

    componentDidMount(){
        fetch('http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            this.setState({ name: j.name, max_group_size: j.max_group_size });
        })
    }


    goToAddStudentPage() {
        const project_id = this.props.match.params.project_id;  
        this.props.history.push('/admin/projects/' + project_id +'/add_student')
    }

    goToProjectGroups() {
        const project_id = this.props.match.params.project_id;  
        this.props.history.push('/admin/projects/' + project_id + '/groups');
    }

    goToSettingsPage() {
        const project_id = this.props.match.params.project_id; 
        this.props.history.push('/admin/projects/'+ project_id +'/edit')
    }
    
    render() {
        return(
            <>
                <div>
                    <h1 className={css.head}>
                            Group Arrangement
                        <button className={css.signout} onClick={()=>signout()()}>Sign out</button>      
                    </h1>
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
                        <br/>
                        Student List:                 
                        <button className={css.addstudentbtn} onClick={()=>this.goToAddStudentPage()}>Add Student</button> 
                        <button className={css.projecttwobutton} onClick={()=>this.goToProjectGroups()}>Create Groups</button>
                    </p>
                </div>

                <div >
                    <h1 className={css.title}>
                        { this.state.name }
                        <button className={css.projectgraybutton} onClick={()=>this.goToSettingsPage()}>Edit Setting</button>
                        <button className={css.projectgraybutton}>Delete</button>
                    </h1> 
                    <p className={css.textcontent}><br/><br/>Max Group Size: {this.state.max_group_size}</p>
                    <p className={css.textcontent}><br/><br/>Interests:</p>
                    <p className={css.textcontent}><br/><br/>Skills:</p>
                    <br/><br/><br/>
                    <p className={css.textcontent} style={{fontSize: "35px"}}>&nbsp;&nbsp;Groups:</p>
                </div>   
            </>
        )
    }
}

export default AdminProject;