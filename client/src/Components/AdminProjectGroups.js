import React, {Component} from 'react';
import css from './Admin.module.css'
import DragNDrop from './DNDComponents/DragNDrop.js';
import Group from './Group';
import { signout } from './AuthenticationHelper'

class AdminProjectGroups extends Component{
    constructor(props) {
        super(props);
        this.state = {
            unassignedStudents: [],
            groups: []
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {

    //     console.log({ shouldUpdate: nextState.unassignedStudents.length != [] &&
    //         nextState.groups.length != []});

    //     return nextState.unassignedStudents.length != [] &&
    //     nextState.groups.length != []
    // }

    componentDidMount(){
        this.fetchUnassignedStudents();
        this.fetchGroups();
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
                    <h1 className={css.title}>Group Allocation</h1>
                    <p className={css.subtitle}>Unassigned:</p>
                    { this.state.unassignedStudents && this.state.unassignedStudents.map((student, index) => (
                        <div style={{ 'display': 'flex' }} key={index} >
                            <li>{student.first_name} {student.last_name}</li>
                        </div>
                    ))}

                    {/* <p className={css.subtitle}>Groups:</p>
                    <div style={{ 'display': 'flex' }}>
                        { this.state.groups && this.state.groups.map((group, index) => (
                            <Group group={group} key={index} />
                        ))}
                    </div> */}
                </div>
                <DragNDrop groups={this.state.groups} unassignedStudents={this.state.unassignedStudents}/>
            </>
        )
    }
}

export default AdminProjectGroups;