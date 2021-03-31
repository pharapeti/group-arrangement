import React, {Component} from 'react';
import css from './Student.module.css'

class StudentGroup extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            backbtn: true
        }
    }

    handlebackbtncolor(btn)
    {
        this.setState({
            backbtn:!this.state.backbtn
        })
        window.location.href="/student/home"
    }
    
    render() {


        return(
            <body>
                <div>
                    <h1 className={css.head}>Group Arrangement</h1>
                    <button className={css.signout} onClick={()=>window.location.href="/"}>Sign out</button>
                </div>
                <div>
                    <p className={css.sidebar}></p>
                    <button className={css.sidebutton1} onClick={()=>{window.location.hef="/student/home"}}>Menu</button>
                    <line className={css.line1}/>
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>
                    <line className={css.line2}/>
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notification"}}>Notification</button>
                    <line className={css.line3}/>
                </div>      
                <div>
                    <h1 className={css.title}>Project Name</h1>
                    <br/>
                    <text className={css.subtitle}>Tutor:</text>
                    <br/><br/>
                    <text className={css.subtitle}>Description:</text>
                    <br/><br/><br/>
                    <text className={css.subtitle}><strong>Your Group:</strong></text>
                    <br/><br/>
                    <button onClick={()=>{window.location.href="/student/project/group"}}>to groups(for test only)</button>

                    <button className={css.leaveprojectbtn}>Leave Project</button>
                    <button className={this.state.backbtn? css.backbtn_black:css.backbtn_white} onClick={()=>this.handlebackbtncolor(this)}>Back</button>
                </div>   
            </body>
        )
    }
}

export default StudentGroup;