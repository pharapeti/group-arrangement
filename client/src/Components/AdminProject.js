import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

// this page is like a sample for all the admin project pageXOffset, each project
// has one project page and also the url should change  e.g. /admin/home/project 1
class AdminProject extends Component{

    constructor(props){
        super(props)
        this.state = {
            name:'',
            id:'',
            group_size:'',

        }
    }

    componentDidMount(){
        fetch('http://localhost:6060/api/admin/projects', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(j => {
            for(var i=0; i<j.length;i++)
            {
                if(j[i].id==this.props.match.params.id)
                {
                  console.log(j[i]);
                  this.setState({ 
                      name:j[i].name,
                      group_size:j[i].max_group_size,
                  });
                }
            }
            
        })
    }


    ToAddStudentPage() {
        const project_id = this.props.match.params.project_id;  
        this.props.history.push('/admin/projects/' + project_id +'/add_student')
    }

    toCreateGroupPage() {
        const project_id = this.props.match.params.project_id;  
        this.props.history.push('/admin/projects/' + project_id + '/groups/create');
    }

    ToEditGroupPage() {
        const project_id = this.props.match.params.project_id;

        //this.props.history.push('/admin/projects/' + project_id + '/groups');
        alert('NOT IMPLEMENTED!!!!')
    }

    ToSettingPage() {
        const project_id = this.props.match.params.project_id; 
        this.props.history.push('/admin/projects/'+ Id +'/edit')
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
                    <p className={css.subtitle}>
                        <br/>
                        Student List:                 
                        <button className={css.addstudentbtn} onClick={()=>this.ToAddStudentPage()}>Add Student</button> 
                        <button className={css.projecttwobutton} onClick={()=>this.toCreateGroupPage()}>Create Groups</button>
                        <button className={css.projecttwobutton} onClick={()=>this.ToEditGroupPage()}>Edit Groups</button>
                    </p>
                </div>

                <div >
                    <h1 className={css.title}>
                        Project {this.props.match.params.id}
                        <button className={css.projectgraybutton} onClick={()=>this.ToSettingPage()}>Edit Setting</button>
                        <button className={css.projectgraybutton}>Delete</button>
                    </h1> 
                    <p className={css.textcontent}><br/>&nbsp;&nbsp;&nbsp;Description: {this.state.name}</p>
                    <p className={css.textcontent}><br/><br/>&nbsp;&nbsp;&nbsp;Max Group Size: {this.state.group_size}</p>
                    <p className={css.textcontent}><br/><br/>&nbsp;&nbsp;&nbsp;Interest:</p>
                    <p className={css.textcontent}><br/><br/>&nbsp;&nbsp;&nbsp;Skill:</p>
                    <br/><br/><br/>
                    <p className={css.textcontent} style={{fontSize: "35px"}}>&nbsp;&nbsp;Groups:</p>
                </div>   
            </>
        )
    }
}

export default AdminProject;