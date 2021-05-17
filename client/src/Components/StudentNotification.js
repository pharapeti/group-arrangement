import React, {Component} from 'react';
import css from './Student.module.css'
import { signout } from './AuthenticationHelper'

class StudentNotification extends Component {

    constructor(props){
        super(props)
        this.state = {
            notifications: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:6060/api/student/notifications', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(j => {
            this.setState({ notifications: j });
        })
    }

    handleRead(notification_id) {
        fetch('http://localhost:6060/api/student/notifications/' + notification_id + '/read', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(_response => {
            this.forceUpdate();
        })
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
                    <button className={css.sidebutton3} onClick={()=>{window.location.href="/student/notification"}}>Notification</button>
                    
                    <line className={css.line1}/>   
                    <line className={css.line2}/>  
                    <line className={css.line3}/>                 
                    </nav>
                </div>
                <div>
                    <h1 className={css.title}>Unread Notifications</h1>
                    <br/>

                    { this.state.notifications.map((notification, index) => (
                        <div key={index}>
                            <p>{notification.message}</p>
                            <button onClick={() => this.handleRead(notification.id)}>Read</button>
                        </div>
                    ))}
                </div>   
            </>
        )
    }
}

export default StudentNotification;