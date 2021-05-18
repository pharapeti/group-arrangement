import React, {Component} from 'react';
import css from './Student.module.css'
import InputTag from './InputTag.js'
import { signout } from './AuthenticationHelper'

class StudentProfile extends Component {
	state = {
		name: '',
		external_id: '',
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
			this.setState({ external_id: j.external_id, name: j.first_name + " " + j.last_name })
		})

		fetch('http://localhost:6060/api/student/preference_selections', {
			credentials: 'include',
			headers: { 'Content-Type': 'applications/json' }
		})
		.then(response => response.json())
		.then(p => this.loadPreferences(p))
	}

	loadPreferences(p) {
		for (var i = 0; i < p.length; i++) {
			if (p[i].preference_category_id == 1) {
				this.setState({ skills: [...this.state.skills, p[i].name] });
				// console.log(this.state.skills);
			}
			else if (p[i].preference_category_id == 2) {
				this.setState({ interests: [...this.state.interests, p[i].name] });
				// console.log(this.state.interests);
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
				<div>
					<h1 className={css.title}>Profile</h1>
					<br/>
					<p className={css.subtitle}>ID: {this.state.external_id}  </p>
					<br/><br/>
					<p className={css.subtitle}>Name: {this.state.name}</p>
					<br/><br/><br/>

					{ <p className={css.subtitle}><strong>Preferences:</strong></p> }
					<div>
						<br/><br/><p className={css.pcontent}> • Skills:</p>
					</div>
					<div style={{marginLeft:350}}>
						<InputTag existingTags={this.state.skills} addedTags={this.handleSkillAdd} />
					</div>
					<div>
						<br/><br/><p className={css.pcontent}> • Interest:</p>
					</div>
					<div style={{marginLeft:350}}>
						<InputTag existingTags={this.state.interests} addedTags={this.handleInterestAdd} />
					</div>
				</div>   
			</>
		)
	}
}

export default StudentProfile;