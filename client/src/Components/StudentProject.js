import React, {Component} from 'react';
import css from './Student.module.css'
import { signout } from './AuthenticationHelper'

class StudentProject extends Component{
    constructor(props) {
        super(props)
        this.state= {
            btn_BackToStudentHome: true,
            group_color: [
                'lightcoral',
                'lightsalmon',
                'lightpink',
                'lightgreen',
                'violet'
            ],
            selected_color: '',
            //I just test it using 1 as param
            group_id: '1',
            group_number: '1',
            project_id: this.props.match.params.project_id,
            project: {
                User: {
                    first_name: "Something"
                }
            }
        }
    }

    componentDidMount(){
        this._getrandomcolor();

        fetch('http://localhost:6060/api/student/projects/' + this.state.project_id, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            console.log(j)
            this.setState({ project: j });
        })

        fetch('http://localhost:6060/api/student/groups', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            for(var i = 0; i < j.length; i++){
                if(j[i].project_id == this.state.project_id){
                    this.state.group_id = j[i].id;
                }
            }
        })
    }

    _getrandomcolor(){
        var item = this.state.group_color[Math.floor(Math.random() * this.state.group_color.length)];
        this.setState({ selected_color: item })
    }

    handleBackClick()
    {
        this.setState({ btn_BackToStudentHome: !this.state.btn_BackToStudentHome })
        window.location.href="/student/home"
    }
    
    handleGroupClick() {
        this.props.history.push('/student/groups/'+ this.state.group_id)
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
                    <button 
                        className={css.sidebutton1} 
                        onClick={()=>{window.location.href="/student/home"}}
                    >
                        Menu
                    </button>                   
                    <button 
                        className={css.sidebutton2} 
                        onClick={()=>{window.location.href="/student/profile"}}
                    >
                        Profile
                    </button>                 
                    <button 
                        className={css.sidebutton3} 
                        onClick={()=>{window.location.href="/student/notifications"}}
                    >
                        Notification
                    </button>
                    
                    <div className={css.line1}/>   
                    <div className={css.line2}/>  
                    <div className={css.line3}/>                 
                    </nav>
                </div>      
                <div className={css.projectrightcontent}>
                    <button className={css.leaveprojectbtn}>
                        Leave Project
                    </button>
                    <button 
                        className={this.state.btn_BackToStudentHome? css.backbtn_black : css.backbtn_white} 
                        onClick={()=>this.handleBackClick()}
                    >
                        Back
                    </button>
                    </div>  
                <div>
                    <h1 className={css.title}>{this.state.project.name}</h1>
                    {/* buttons' position is related to the title, which is fixed */}
                    <br/>
                    <p className={css.subtitle}>Tutor: {this.state.project.User.first_name}</p>
                    <br/><br/>
                    <p className={css.subtitle}><strong>Your Group:</strong></p>
                    <br/><br/>
                    <button 
                        onClick={()=>this.handleGroupClick()}
                        className={css.toprojectorgroupbtn}
                        style={{backgroundColor: this.state.selected_color}}
                    >
                        <p className={css.toprojectorgroupbtnp}>
                            Group{this.state.group_id}
                        </p>
                    </button>
                </div>   
            </>
        )
    }
}

export default StudentProject;