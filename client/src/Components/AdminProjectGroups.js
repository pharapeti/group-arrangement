import React, {Component} from 'react';
import css from './Admin.module.css'
import DragNDrop from './DNDComponents/DragNDrop.js';
import { signout } from './AuthenticationHelper'

class AdminProjectGroups extends Component{
    constructor(props) {
        super(props);
        this.state = {
            unassignedStudents: [],
            groups: [],
            project: { name: '' }
        }
    }

    componentDidMount(){
        const project_id = this.props.match.params.project_id;

        this.fetchUnassignedStudents();
        this.fetchGroups();

        fetch('http://localhost:6060/api/admin/projects/' + project_id, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            this.setState({ project: j })
        })
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

            this.setState({ unassignedStudents: students })
        })
    }

    fetchGroups() {
        const url = 'http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id + '/groups';
        fetch(url, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            this.setState({ groups: j })
        })
    }

    randomiseGroups() {
        const url = 'http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id + '/arrange';

        fetch(url, {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
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
                    <p className={css.subtitle}>
                    <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.randomiseGroups()}>Randomise</button>
                    <button className={css.projecttwobutton} style={{marginTop: "595px"}} onClick={()=>this.navigateBack()}>Back</button>
                    </p>
                </div>
                
                <div >
                    <h1 className={css.title}>{this.state.project.name}</h1>
                </div>
                <DragNDrop groups={this.state.groups} unassignedStudents={this.state.unassignedStudents}/>
            </>
        )
    }
}

export default AdminProjectGroups;
