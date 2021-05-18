import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminMainMenu extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            groupcolor: [
                'lightcoral',
                'lightsalmon',
                'lightpink',
                'lightgreen',
                'violet'
            ],
            selectedcolor: '',
            projects: []
        }
    }

    componentDidMount(){
        this._getrandomcolor();

        fetch('http://localhost:6060/api/admin/projects', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            this.setState({ projects: j });
            console.log(j)
        })
    }

    _getrandomcolor(){
        var item = this.state.groupcolor[Math.floor(Math.random() * this.state.groupcolor.length)];
        this.setState({
            selectedcolor: item,
        })
    }

    goToProject(project_id) {
        this.props.history.push('/admin/projects/'+ project_id)
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
                    <button className={css.createprojectbtn} onClick={()=>{window.location.href="/admin/projects/new"}}>Create Project</button>
                </div>
                <div>
                    <h1 className={css.title}>
                        Projects
                    </h1>
                    <br/>
                    <p className={css.subtitle}>Your Project(s):</p>
                    <br/><br/>

                    {this.state.projects.map(project =>(
                        <button 
                            key={project.id} 
                            onClick={()=>this.goToProject(project.id)} 
                            className={css.toprojectorgroupbtn}
                            style={{backgroundColor: this.state.selectedcolor}}
                        >
                            <p className={css.toprojectorgroupbtnp} key={project.id}>
                                {project.name}
                            </p>
                       </button>
                    ))}    
                </div> 
            </>
        )
    }
}

export default AdminMainMenu;