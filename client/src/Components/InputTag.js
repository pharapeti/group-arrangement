import React, {Component} from 'react';
import css from './Student.module.css'

class InputTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ tags: this.props.existingTags });
        console.log("INSIDE INPUT TAG " + this.state.tags)
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.tags.find(tag => tag.toString().toLowerCase === val.toLowerCase())) {
                return;
            }
            this.setState({tags: [...this.state.tags, val]});
            this.tagInput.value = null;
            this.props.addedTags(val);
        }
        else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
          }
    }

    removeTag = (i) => {
        const newTags = [ ...this.state.tags ];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
      }

    render() {

        return (
            <body>
                <div className={css.input_tag}>
                    <ul className={css.input_tag__tags}>
                       { this.state.tags.map((tag, i) => (
                            <li key={tag}>
                                {tag}
                                <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                            </li>   
                       ))}                 
                        <li className={css.input_tag__tags__input}>
                            <input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} />
                        </li>
                    </ul>
                </div>
            </body>
        );
    }
}


export default InputTag;