import React, {Component} from 'react';
import css from './Student.module.css'
import InputTag from './InputTag.js'

class StudentProfile extends Component{

    state = {
        response: '',
        post: '',
        responseToPost: '',
        preferencesObjects: [],
        id:"",
        name: [],
        student: [],
        skills: [],
        interests: []
      };

    componentDidMount() {
        fetch('http://localhost:6060/api/student/profile', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(j => {
                this.loadUser(j.external_id, j.first_name + " " + j.last_name)
            })

        fetch('http://localhost:6060/api/student/preference_selections', {
            credentials: 'include',
            headers: { 'Content-Type': 'applications/json' }
        })
            .then(response => response.json())
            .then(p => {
                this.loadPreferences(p);
            })
    }

    loadUser(id, full_name) {
        this.setState({
            name: full_name,
            student: id
        })
    }

    loadPreferences(p) {
        for (var i = 0; i < p.length; i++) {
            if (p[i].preference_category_id == 1) {
                this.setState({ skills: [...this.state.skills, p[i].name] });
                console.log(this.state.skills);
            }
            else if (p[i].preference_category_id == 2) {
                this.setState({ interests: [...this.state.interests, p[i].name] });
                console.log(this.state.interests);
            }
        }
    }

    handleSkillAdd = (val) => {
        const jsonString = JSON.stringify({ name: val, preference_category_id: 1 });

        fetch('http://localhost:6060/api/student/preference_selections', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: jsonString
        })
        .then(response => response.json())
        .then(j => {
            console.log(j)
        })
    }

    handleInterestAdd = (val) => {
        const jsonString = JSON.stringify({ name: val, preference_category_id: 2 });

        fetch('http://localhost:6060/api/student/preference_selections', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: jsonString
        })
        .then(response => response.json())
        .then(j => {
            console.log(j)
        })
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
                <div>
                    <h1 className={css.title}>Profile</h1>
                    <br/>
                    <text className={css.subtitle}>Student id:  {this.state.student}  </text>
                    <br/><br/>
                    <text className={css.subtitle}>Student name: {this.state.name}</text>
                    <br/><br/><br/>
                    <text className={css.subtitle}><strong>Preference:</strong></text>
                    <div>
                        <br/><br/><text className={css.textcontent}> • Skills:</text>
                    </div>
                    <div style={{marginLeft:350}}>
                        <InputTag existingTags={this.state.skills} addedTags={this.handleSkillAdd} />
                    </div>
                    <div>
                        <br/><br/><text className={css.textcontent}> • Interest:</text>
                    </div>
                    <div style={{marginLeft:350}}>
                        <InputTag existingTags={this.state.interests} addedTags={this.handleInterestAdd} />
                    </div>
                </div>   
            </body>
        )
    }
}

export default StudentProfile;