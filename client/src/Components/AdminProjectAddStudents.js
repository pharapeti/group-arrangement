import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminProjectAddStudents extends Component {
    constructor(props){
        super(props);
        this.state = {
            assignedStudents: [],
            unassignedStudents: []
        }
    }

    componentDidMount(){
        this.fetchUnallocatedStudents();
        this.fetchAllocatedStudents();
    }

    fetchUnallocatedStudents() {
        const project_id = this.props.match.params.project_id;

        fetch('http://localhost:6060/api/admin/users?project_id=' + project_id, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {

            const students = j.map(student => {
                const { id, first_name, last_name, external_id } = student;

                return { id, first_name, last_name, external_id };
            })

            this.setState({ unassignedStudents: students })
        })
    }

    fetchAllocatedStudents() {
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

            this.setState({ assignedStudents: students })
        })
    }

    handleAddStudentToProject(external_id) {
        const url = 'http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id + '/project_allocations';
        const jsonString = JSON.stringify({ external_id: external_id });

        fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: jsonString
        })
        .then(response => response.json())
        .then(_j => {
            location.reload();
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
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/admin/notifications"}}>Notifications</button>                 
                         
                    <div className={css.line1}/>   
                    <div className={css.line2}/>                   
                    </nav>
                </div>  

                 <div className={css.projectrightcontent}>
                    <p className={css.subtitle}> Currently in project: </p>
                    { this.state.assignedStudents.map((student, index) => (
                        <li key={index}>{student.first_name} {student.last_name}</li>
                    ))}

                    <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.navigateBack()}>Cancel</button>
                    <button className={css.projecttwobutton} style={{marginTop: "595px"}}>Save</button>
                </div>

                <div >
                    <h1 className={css.title}>Project {this.props.match.params.id}</h1>
                    <p className={css.subtitle}>Unassigned:</p>
                    { this.state.unassignedStudents && this.state.unassignedStudents.map((student, index) => (
                        <div style={{ 'display': 'flex' }} key={index} >
                            <li>{student.first_name} {student.last_name}</li>
                            <button href="#" onClick={() => this.handleAddStudentToProject(student.external_id)}>Add</button>
                        </div>
                    ))}
                </div>
                
            </> 
        )
    }
}

export default AdminProjectAddStudents;