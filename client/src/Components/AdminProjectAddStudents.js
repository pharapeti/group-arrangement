import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminProjectAddStudents extends Component {
    constructor(props){
        super(props);
        this.state = {
            studentsInProject: [
                { id: '', first_name: '', last_name: '' }
            ],
            studentsInSystem: [
                { id: '', first_name: '', last_name: '' }
            ]
        }
    }

    componentDidMount(){
        this.queryAllStudents();
        this.queryAllStudentsInProject();
    }

    queryAllStudents() {
        fetch('http://localhost:6060/api/admin/users', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {

            const students = j.map(student => {
                const { id, first_name, last_name } = student;

                return { id, first_name, last_name };
            })

            this.setState({ studentsInSystem: students })
        })
    }

    queryAllStudentsInProject() {
        const url = 'http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id + '/project_allocations';
        fetch(url, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {

            const students = j.map(group_allocation => {
                const user = group_allocation['User'];
                const { id, first_name, last_name } = user;
                
                return { id, first_name, last_name };
            })

            this.setState({ studentsInProject: students })
        })
    }

    navigateBack() {
        this.props.history.goBack();
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
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/admin/notifications"}}>Notification</button>                 
                         
                    <div className={css.line1}/>   
                    <div className={css.line2}/>                   
                    </nav>
                </div>  

                 <div className={css.projectrightcontent}>
                    <p className={css.subtitle}> Student in the project: </p>
                    { this.state.studentsInProject.map((student, index) => (
                        <li key={index}>{student.first_name} {student.last_name}</li>
                    ))}

                    <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.navigateBack()}>Cancel</button>
                    <button className={css.projecttwobutton} style={{marginTop: "595px"}}>Save</button>
                </div>

                <div >
                    <h1 className={css.title}>Project {this.props.match.params.id}</h1>
                    <p className={css.subtitle}>All students:</p>
                    { this.state.studentsInSystem.map((student, index) => (
                        <li key={index}>{student.first_name} {student.last_name}</li>
                    ))}
                </div>
                
            </> 
        )
    }
}

export default AdminProjectAddStudents;