import React, {Component} from 'react';
import css from './Student.module.css'

class StudentGroup extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            leavegroupbtn: true
        }
    }

    handleleavegroup()
    {
        this.setState({
            leavegroupbtn:!this.state.leavegroupbtn
        })
        window.location.href="/student/project"
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
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/student/home"}}>Menu</button>
                    <line className={css.line1}/>
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/student/profile"}}>Profile</button>
                    <line className={css.line2}/>
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notification"}}>Notification</button>
                    <line className={css.line3}/>
                </div>      
                <div>
                    <h1 className={css.title}>Your Group</h1>
                    <br/>
                    <text className={css.subtitle}>Group Name:</text>
                    <br/><br/>
                    <text className={css.subtitle}>Group Leader:</text>
                    <br/><br/><br/>
                    <table className={css.grouptable} id="tgroup">
                        <tr className={css.grouptr}>
                            <th className={css.groupth}>No</th>
                            <th className={css.groupth}>FirstName</th>
                            <th className={css.groupth}>LastName</th>
                            <th className={css.groupth}>StudentId</th>
                        </tr>  
                        {/* //example only */}
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
                    
                    <button className={this.state.leavegroupbtn?css.leavegroupbtn_black:css.leavegroupbtn_white} onClick={()=>this.handleleavegroup(this)}>Leave Group</button>
                </div>   
            </body>
        )
    }
}

export default StudentGroup;