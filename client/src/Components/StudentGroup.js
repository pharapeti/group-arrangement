import React, {Component} from 'react';
import css from './Student.module.css'

class StudentGroup extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            ableToLeaveGroup: true
        }
    }

    handleleavegroup()
    {
        var i=this.props.match.params.id;
        this.setState({
            ableToLeaveGroup:!this.state.ableToLeaveGroup
        })
        this.props.history.goBack();
        
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
                    <button className={this.state.ableToLeaveGroup?css.leavegroupbtn_black:css.leavegroupbtn_white} onClick={()=>this.handleleavegroup(this)}>Leave Group</button>
                </div>
                <div>
                    <h1 className={css.title}>Your Group {this.props.match.params.id}</h1>
                    {/* buttons' position is related to the title, which is fixed */}
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
            </body>
        )
    }
}

export default StudentGroup;