import React, {Component} from 'react';
import css from './Student.module.css'

class StudentGroup extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            btn_BackToStudentHome: true,
            groupcolor: [
                'lightcoral',
                'lightsalmon',
                'lightpink',
                'lightgreen',
                'violet'
            ],
            selectedcolor: '',
            //I just test it using 1 as param
            groupid: '1',
            projectid: this.props.match.params.id,
        }
    }

    HandleBackBtn(btn)
    {
        this.setState({
            btn_BackToStudentHome:!this.state.btn_BackToStudentHome
        })
        window.location.href="/student/home"
    }

    componentDidMount(){
        this._getrandomcolor();
    }

    _getrandomcolor(){
        var item = this.state.groupcolor[Math.floor(Math.random()*this.state.groupcolor.length)];
        this.setState({
            selectedcolor: item,
        })
    }
    
    ToGroupPage()
    {
        var gi=this.state.groupid;
        var pi=this.state.projectid;
        this.props.history.push(
            '/student/project/'+pi+'/group/'+ gi
            )
    }
    
    render() {


        return(
            <body>
                <div>
                    <headers>
                        <h1 className={css.head}>
                             Group Arrangement
                            <button className={css.signout} onClick={()=>window.location.href="/"}>Sign out</button>      
                        </h1>          
                    </headers>   
                </div>
                <div>
                    <nav className={css.sidebar}>
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/student/home"}}>Menu</button>                   
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>                 
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notification"}}>Notification</button>
                    
                    <line className={css.line1}/>   
                    <line className={css.line2}/>  
                    <line className={css.line3}/>                 
                    </nav>
                </div>      
                <div className={css.projectrightcotent}>
                    <button className={css.leaveprojectbtn}>
                        Leave Project
                        <button className={this.state.btn_BackToStudentHome? css.backbtn_black:css.backbtn_white} onClick={()=>this.HandleBackBtn(this)}>Back</button> 
                        </button>
                    </div>  
                <div>
                    <h1 className={css.title}>Project {this.props.match.params.id}</h1>
                    {/* buttons' position is related to the title, which is fixed */}
                    <br/>
                    <text className={css.subtitle}>Tutor:</text>
                    <br/><br/>
                    <text className={css.subtitle}>Description:</text>
                    <br/><br/><br/>
                    <text className={css.subtitle}><strong>Your Group:</strong></text>
                    <br/><br/>
                    <button onClick={()=>this.ToGroupPage()} className={css.toprojectorgroupbtn}
                    style={{backgroundColor: this.state.selectedcolor}}>
                        <text className={css.toprojectorgroupbtntext}><br/><br/><br/><br/><br/><br/>Group{this.state.groupid}</text>
                    </button>
                </div>   
            </body>
        )
    }
}

export default StudentGroup;