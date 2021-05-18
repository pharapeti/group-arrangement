import React, {Component} from 'react';
import css from './Admin.module.css'
import { signout } from './AuthenticationHelper'

class AdminCreateProject extends Component{

    state={
        project_name:'',
        project_max_size:'',
    }

    componentDidMount(){
        fetch('http://localhost:6060/api/admin/projects', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(j => {
            for(var i=0; i<j.length;i++)
            {
                if(j[i].id==this.props.match.params.project_id)
                {
                  console.log(this.props.match.params.project_id);
                  this.setState({ 
                      project_name:j[i].name,
                      project_max_size:j[i].max_group_size,
                  });
                }
            }
            
        })
    }


    setMaxGroupSize(e) {
        if(e.target.value>=0)
        this.setState({ project_max_size: e.target.value });
    }

    HandleCencelBtn()
    {
        this.props.history.goBack();
    }

    //NEED TO FIX
    HandleEditBtn()
    {
        const jsonString = JSON.stringify({ name: this.state.project_name, max_group_size: this.state.max_group_size });
        fetch('http://localhost:6060/api/admin/projects/' + this.props.match.params.project_id, {
            method:'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json', 
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "PUT"},
            body: jsonString
        })
        .then(response => response.json())
        .then(j => {
            console.log(j)
            this.props.history.goBack()
            return j;
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
                    <button className={css.sidebutton1} onClick={()=>{window.location.href="/admin/home"}}>Menu</button>                   
                    <button className={css.sidebutton2} onClick={()=>{window.location.href="/admin/notifications"}}>Notifications</button>                 
                         
                    <div className={css.line1}/>   
                    <div className={css.line2}/>                   
                    </nav>
                </div>      
                <div className={css.projectrightcontent}>
                    <button className={css.createprojectfirstbtn} onClick={()=>this.HandleEditBtn()}>
                        Edit
                        <br/>
                    <button className={css.createprojectsecondbtn} onClick={()=>this.HandleCencelBtn()}>Cancel</button>
                    </button>    
                </div>
                <div>
                    <h1 className={css.title}>Edit Project {this.props.match.params.project_id}</h1>
                    <br/>
                    <p className={css.subtitle}>
                        Project Name: 
                        <input className={css.createprojectinput} style={{marginLeft: '50px'}} defaultValue={this.state.project_name}></input>
                    </p>
                    <p className={css.subtitle}>
                        Max Group Size: 
                        <input className={css.createprojectinput} 
                          style={{marginLeft: '16px'}} 
                          type='number'
                          value={this.state.project_max_size}
                          onChange={ this.setMaxGroupSize.bind(this) }
                        ></input>
                    </p>
                    <p className={css.subtitle}>
                        Interest: 
                        <input className={css.createprojectinput} style={{marginLeft: '131px'}}></input>
                    </p>
                    <p className={css.subtitle}>
                        Skills: 
                        <input className={css.createprojectinput} style={{marginLeft: '160px'}}></input>
                    </p>
                    <p className={css.subtitle}>
                        Description: 
                    </p>
                    <textarea className={css.createprojectdescriptioninput}></textarea>
                    
                </div>   
            </>
        )
    }
}

export default AdminCreateProject;