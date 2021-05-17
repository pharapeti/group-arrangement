import React, {Component} from 'react';

class Preference extends Component {
  render() {
    return(
      <>
        <p>{this.props.value}</p>
      </>
    )
  }
}

export default Preference;