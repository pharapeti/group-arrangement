import React, {Component} from 'react';
import css from './Student.module.css'

class StudentMainMenu extends Component{

    constructor(props){
        super(props)

        //for test only 
        this.state={
        groupcolor: [
            'lightcoral',
            'lightsalmon',
            'lightpink',
            'lightgreen',
            'violet'
        ],
        selectedcolor: '',
        //for test only
        projects :[    
                {id:1, name: "first"},
                {id:2, name: "second"},
                {id:3, name: "third"},
        ]
    }
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

    tonewpage(itemid)
    {
        var i=itemid;
        this.props.history.push(
            '/student/project/'+ i
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
                <div>
                    <h1 className={css.title}>Student Menu</h1>
                    <br/>
                    <text className={css.subtitle}>Your Project(s):</text>
                    <br/><br/>
                    {/* //button for test only */}
                    {this.state.projects.map(item =>(
                        <button key={item.id} onClick={()=>this.tonewpage(item.id)} className={css.toprojectorgroupbtn}
                        style={{backgroundColor: this.state.selectedcolor}} >
                            <text className={css.toprojectorgroupbtntext} key={item.id}><br/><br/><br/><br/><br/><br/>Project&nbsp;{item.id}</text>
                       </button>
                    ))}
                    
                </div>   
            </body>
        )
    }
}

export default StudentMainMenu;