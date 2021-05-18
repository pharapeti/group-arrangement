import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminProject extends Component{

    constructor(props){
        super(props)
        this.state = {
            project_name:'',
            project_id:'',
            project_group_size:'',
            project_groups:[],
            students_in_projects:[]

        }
    }

    componentDidMount(){
        fetch('http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            for(var i=0; i<j.length;i++)
            {
                if(j[i].id==this.props.match.params.project_id)
                {
                  console.log(this.props.match.params.project_id);
                  this.setState({ 
                      project_name:j[i].name,
                      project_group_size:j[i].max_group_size,
                  });
                }
            }
            
        })

        
        fetch('http://localhost:6060/api/admin/projects/'+ this.props.match.params.project_id +'/groups', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(j => {
    
            this.setState({ project_groups:j })
            //console.log(this.state.project_groups)
        })

        fetch('http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id + '/project_allocations', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(j => {
    
            this.setState({ students_in_projects:j })
            console.log(this.state.students_in_projects)
        })
        
    }


    goToAddStudentPage() {
        const project_id = this.props.match.params.project_id;  
        this.props.history.push('/admin/projects/' + project_id +'/add_student')
    }

    goToCreateGroupPage() {
        const project_id = this.props.match.params.project_id;  
        this.props.history.push('/admin/projects/' + project_id + '/groups/create');
    }

    goToEditGroupPage() {
        const project_id = this.props.match.params.project_id;

        //this.props.history.push('/admin/projects/' + project_id + '/groups');
        alert('NOT IMPLEMENTED!!!!')
    }

    goToSettingsPage() {
        const project_id = this.props.match.params.project_id; 
        this.props.history.push('/admin/projects/'+ project_id +'/edit')
    }
    
    //NEED TO FIX
    handleDelete()
    {
        if(window.confirm("Are you sure?"))
        {
          window.location.href="/admin/home"
          fetch('http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id , {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*",
              'Access-Control-Allow-Methods': "DELETE"},
              credentials: 'include',
          })
          .then(response => response.json())
          .then(j => {
            console.log(j)
          })
        }
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
                        <br/>
                        {this.state.students_in_projects.map(students_in_project =>( 
                            <li className={css.textcontent} key={students_in_project.id}>
                                {students_in_project.first_name} {students_in_project.last_name}
                                <br/><br/>
                            </li>
                        ))}                 
                        <button className={css.addstudentbtn} onClick={()=>this.goToAddStudentPage()}>Add Student</button> 
                        <button className={css.projecttwobutton} onClick={()=>this.goToCreateGroupPage()}>Create Groups</button>
                        <button className={css.projecttwobutton} onClick={()=>this.goToEditGroupPage()}>Edit Groups</button>
                    </p>
                </div>

                <div >
                    <h1 className={css.title}>
                        Project {this.props.match.params.project_id}
                        <button className={css.projectgraybutton} onClick={()=>this.goToSettingsPage()}>Edit Setting</button>
                        <button className={css.projectgraybutton} onClick={()=>this.handleDelete()}>Delete</button>
                    </h1> 
                    <p className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Description: {this.state.project_name}</p>
                    <p className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Max Group Size: {this.state.project_group_size}</p>
                    <p className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Interest:</p>
                    <p className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Skill:</p>
                    <br/>
                    <p className={css.textcontent} style={{fontSize: "35px"}}>&nbsp;&nbsp;Groups:</p>
                      {this.state.project_groups.map(project_group =>( 
                            <li className={css.textcontent} key={project_group.id}>
                                Group Id: {project_group.id}&nbsp;
                                Group Number: {project_group.group_number}
                                <br/><br/>
                            </li>
                      ))}
                    
                </div>   
            </>
        )
    }
}

export default AdminProject;