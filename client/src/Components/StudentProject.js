import React, {Component} from 'react';
import css from './Student.module.css'

class StudentGroup extends Component{

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
            project_id: this.props.match.params.id,
        }
    }

    componentDidMount(){
        this._getrandomcolor();
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
        this.props.history.push('/student/project/'+ this.state.project_id  +'/group/'+ this.state.group_id)
    }
    
    render() {
        return(
            <React.Fragment>
                <div>
                    <h1 className={css.head}>
                            Group Arrangement
                        <button className={css.signout} onClick={()=>window.location.href="/"}>Sign out</button>      
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
                        onClick={()=>{window.location.href="/student/notification"}}
                    >
                        Notification
                    </button>
                    
                    <line className={css.line1}/>   
                    <line className={css.line2}/>  
                    <line className={css.line3}/>                 
                    </nav>
                </div>      
                <div className={css.projectrightcontent}>
                    <button className={css.leaveprojectbtn}>
                        Leave Project
                    </button>
                    <button 
                        className={this.state.btn_BackToStudentHome? css.backbtn_black:css.backbtn_white} 
                        onClick={()=>this.handleBackClick()}
                    >
                        Back
                    </button>
                    </div>  
                <div>
                    <h1 className={css.title}>Project {this.props.match.params.id}</h1>
                    {/* buttons' position is related to the title, which is fixed */}
                    <br/>
                    <p className={css.subtitle}>Tutor:</p>
                    <br/><br/>
                    <p className={css.subtitle}>Description:</p>
                    <br/><br/><br/>
                    <p className={css.subtitle}><strong>Your Group:</strong></p>
                    <br/><br/>
                    <button 
                        onClick={()=>this.handleGroupClick()}
                        className={css.toprojectorgroupbtn}
                        style={{backgroundColor: this.state.selected_color}}
                    >
                        <p className={css.toprojectorgroupbtnp}><br/><br/><br/><br/><br/><br/>Group{this.state.group_id}</p>
                    </button>
                </div>   
            </React.Fragment>
        )
    }
}

export default StudentGroup;