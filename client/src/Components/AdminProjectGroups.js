import React, {Component} from 'react';
import css from './Admin.module.css'
import DragNDrop from './DNDComponents/DragNDrop.js';
import { signout } from './AuthenticationHelper'

class AdminProjectGroups extends Component{
    constructor(props) {
        super(props);
        this.state = {
            unassigned_students: []
        }
    }

    componentDidMount(){
        this.fetchUnassignedStudents();
    }

    fetchUnassignedStudents() {
        const project_id = this.props.match.params.project_id;

        fetch('http://localhost:6060/api/admin/users/unassigned?project_id=' + project_id, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {

            const students = j.map(student => {
                const { id, first_name, last_name, external_id } = student;

                return { id, first_name, last_name, external_id };
            })

            this.setState({ unassigned_students: students })
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
                    <p className={css.subtitle}>
                    <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.navigateBack()}>Back</button>
                    </p>
                </div>
                
                <div >
                    <h1 className={css.title}>Groups</h1>
                    <p className={css.subtitle}>Unassigned:</p>
                    { this.state.unassigned_students && this.state.unassigned_students.map((student, index) => (
                        <div style={{ 'display': 'flex' }} key={index} >
                            <li>{student.first_name} {student.last_name}</li>
                        </div>
                    ))}
                </div>
                {/* <DragNDrop /> */}
            </>
        )
    }
}

export default AdminProjectGroups;