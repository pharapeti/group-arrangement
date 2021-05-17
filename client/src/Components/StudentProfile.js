import React, {Component} from 'react';
import css from './Student.module.css'
import InputTag from './InputTag.js'
import PreferenceCategories from './PreferenceCategories'

class StudentProfile extends Component {

    state = {
        first_name: 'Bob',
        last_name: 'Higgins',
        external_id: '12345678',
        preference_categories: [
            { name: 'Skills', values: ['Maths', 'Skateboarding'] },
            { name: 'Interests', vaues: ['Astronomy', 'Physics'] }
        ],
        interests: []
      };

    async componentDidMount() {
        fetch('http://localhost:6060/api/student/profile', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(j => {
                console.log(j);
                const { external_id, first_name, last_name, PreferenceSelections } = j;

                this.setState({ 
                    external_id: external_id,
                    first_name: first_name,
                    last_name: last_name
                 })
            })
    }

    render() {
        return(
            <>
                <div>
                    <h1 className={css.head}>
                            Group Arrangement
                        <button className={css.signout} onClick={()=>window.location.href="/"}>Sign out</button>      
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
                    <h1 className={css.title}>Profile</h1>
                    <br/>
                    <p className={css.subtitle}>ID: {this.state.external_id}  </p>
                    <br/><br/>
                    <p className={css.subtitle}>Name: {this.state.first_name} {this.state.last_name}</p>
                    <br/><br/><br/>

                    {/* Display Preference Categories and preferences within each category
                    {this.state.preference_categories.map((category, index) => (
                        <p key={index}>Hello!</p>
                    ))} */}
                    <PreferenceCategories categories={this.state.preference_categories} />

                    {/* <p className={css.subtitle}><strong>Preferences:</strong></p> */}
                    {/* <div>
                        <br/><br/><p className={css.pcontent}> • Skills:</p>
                    </div>
                    <div style={{marginLeft:350}}>
                        <InputTag existingTags={this.state.skills} />
                    </div>
                    <div>
                        <br/><br/><p className={css.pcontent}> • Interest:</p>
                    </div>
                    <div style={{marginLeft:350}}>
                        <InputTag existingTags={this.state.interests} />
                    </div> */}
                </div>   
            </>
        )
    }
}

export default StudentProfile;