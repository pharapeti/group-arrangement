import React, {Component} from 'react';
import css from './Student.module.css'
import { signout } from './AuthenticationHelper'

class StudentGroup extends Component{

    constructor(props) {
        super(props)
        this.state = {
            can_leave_group: true,
            group: {}
        }
    }

    componentDidMount(){
        const project_id = this.props.match.params.project_id;
        const group_id = this.props.match.params.group_id;
        const url = 'http://localhost:6060/api/student/groups/' + group_id;

        fetch(url, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            this.setState({ group: j });
            console.log(j)
        })
    }

    handleGroupLeave() {
        // Make request to leave group
        this.setState({ can_leave_group: !this.state.can_leave_group })
        //this.props.history.goBack();
    }

    canLeaveGroupCss() {
        return this.state.can_leave_group ? css.leavegroupbtn_black : css.leavegroupbtn_white;
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
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/student/home"}}>Menu</button>                   
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>                 
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notifications"}}>Notification</button>
                    
                    <div className={css.line1}/>   
                    <div className={css.line2}/>  
                    <div className={css.line3}/>                 
                    </nav>
                </div>     
                <div className={css.projectrightcontent}>
                    <button className={this.canLeaveGroupCss()} onClick={()=>this.handleGroupLeave(this)}>Leave Group</button>
                </div>
                <div>
                    <h1 className={css.title}>Your Group {this.props.match.params.id}</h1>
                    {/* buttons' position is related to the title, which is fixed */}
                   <br/>
                    <p className={css.subtitle}>Group Number:</p>
                    <br/><br/>
                    <p className={css.subtitle}>Group Leader:</p>
                    <br/><br/><br/>
                    <table className={css.grouptable} id="tgroup">
                        <tr className={css.grouptr}>
                            <th className={css.groupth}>No</th>
                            <th className={css.groupth}>FirstName</th>
                            <th className={css.groupth}>LastName</th>
                            <th className={css.groupth}>StudentId</th>
                        </tr>  
                        {/* //example only, feel free to edit */}
                        <tr className={css.grouptr}>
                            <td className={css.grouptd}>1</td>
                            <td className={css.grouptd}>AAA</td>
                            <td className={css.grouptd}>BBB</td>
                            <td className={css.grouptd}>111111111</td>
                        </tr>
                        <tr className={css.grouptr}>
                            <td className={css.grouptd}>2</td>
                            <td className={css.grouptd}>CCC</td>
                            <td className={css.grouptd}>DDD</td>
                            <td className={css.grouptd}>222222222</td>
                        </tr>
                    </table>
                </div>   
            </>
        )
    }
}

export default StudentGroup;