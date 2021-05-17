import React, {Component} from 'react';
import css from './Student.module.css'
import { signout } from './AuthenticationHelper'

class StudentMainMenu extends Component {

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

        fetch('http://localhost:6060/api/student/projects', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            this.setState({ projects: j });
        })
    }

    _getrandomcolor(){
        var item = this.state.groupcolor[Math.floor(Math.random()*this.state.groupcolor.length)];
        this.setState({
            selectedcolor: item,
        })
    }

    handleProjectClick(project_id) {
        this.props.history.push(
            '/student/projects/'+ project_id
        )
    }
    
    render() {
        return(
            <React.Fragment>
                <div>
                    <h1 className={css.head}>
                            Group Arrangement
                        <button className={css.signout} onClick={()=>signout()()}>Sign out</button>      
                    </h1>          
                </div>
                <div>
                    <nav className={css.sidebar}>
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/student/home"}}>Menu</button>                   
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>                 
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notifications"}}>Notification</button>

                    <div className={css.line1}/>   
                    <div className={css.line2}/>  
                    <div className={css.line3}/>                 
                    </nav>
                </div>      
                <div>
                    <h1 className={css.title}>Student Menu</h1>
                    <br/>
                    <p className={css.subtitle}>Your Project(s):</p>
                    <br/><br/>
                    {/* //button for test only */}
                    {this.state.projects.map(project =>(
                        <button key={project.id} onClick={()=>this.handleProjectClick(project.id)} className={css.toprojectorgroupbtn}
                        style={{backgroundColor: this.state.selectedcolor}} >
                            <p className={css.toprojectorgroupbtntext} key={project.id}><br/><br/><br/><br/><br/><br/>{project.name}</p>
                       </button>
                    ))}
                    
                </div>   
            </React.Fragment>
        )
    }
}

export default StudentMainMenu;