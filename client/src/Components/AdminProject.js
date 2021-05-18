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
        fetch('http://localhost:6060/api/admin/projects/', {
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
                                        
                        <button className={css.addstudentbtn} onClick={()=>this.goToAddStudentPage()}>Add Student</button> 
                        <button className={css.projecttwobutton} onClick={()=>this.goToCreateGroupPage()}>Create Groups</button>
                        <button className={css.projecttwobutton} onClick={()=>this.goToEditGroupPage()}>Edit Groups</button>
                    </p>
                </div>

                <div >
                    <h1 className={css.title}>
                        Project {this.props.match.params.project_id}
                    </h1> 
                    <p className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Description: {this.state.project_name}</p>
                    <p className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Max Group Size: {this.state.project_group_size}</p>
                    <br/>
                    <p className={css.textcontent} style={{fontSize: "35px"}}>&nbsp;&nbsp;Groups:</p>
                      {this.state.project_groups.map(project_group =>( 
                            <li className={css.textcontent} key={project_group.id}>
                                Id: {project_group.id}&nbsp;
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