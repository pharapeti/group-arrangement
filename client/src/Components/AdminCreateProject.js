import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminCreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project_name: '',
            max_group_size: 3,
            preference_categories: [
                { name: '', values: [] }
            ]
        }
    }

    handleSubmit() {
        const { project_name, max_group_size } = this.state;
        const jsonString = JSON.stringify({ name: project_name, max_group_size: max_group_size });

        fetch('http://localhost:6060/api/admin/projects', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: jsonString
        })
        .then(response => response.json())
        .then(j => {
            window.location.href = '/admin/projects/' + j.id;
        })
    }

    setProjectName(e) {
        this.setState({ project_name: e.target.value });
    }

    setMaxGroupSize(e) {
        this.setState({ max_group_size: e.target.value });
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
                    <button className={css.createprojectfirstbtn}   onClick={()=>this.handleSubmit()}>
                        Create
                    </button>
                    <button className={css.createprojectsecondbtn} onClick={()=>window.location.href="/admin/home"}>
                        Cancel
                    </button>    
                </div>
                <div>
                    <h1 className={css.title}>Create Project</h1>
                    <br/>
                    <p className={css.subtitle}>
                        Project Name: 
                        <input
                            className={css.createprojectinput}
                            style={{marginLeft: '50px'}}
                            onChange={ this.setProjectName.bind(this) }
                            value={ this.state.project_name }
                        ></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Max Group Size:
                        <input
                            type='number'
                            className={css.createprojectinput}
                            style={{marginLeft: '80.5px'}}
                            onChange={ this.setMaxGroupSize.bind(this) }
                            value={ this.state.max_group_size }
                        ></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Interest:
                        <input className={css.createprojectinput} style={{marginLeft: '131px'}}></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Skills:
                        <input className={css.createprojectinput} style={{marginLeft: '160px'}}></input>
                    </p>
                    <br/><br/>
                    <p className={css.subtitle}>
                        Description:
                    </p>
                    <br/><br/>
                    <textarea className={css.createprojectdescriptioninput}></textarea>
                </div>
            </>
        )
    }
}

export default AdminCreateProject;