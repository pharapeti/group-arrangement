import React, {Component} from 'react';
import Preference from './Preference'

class PreferenceCategories extends Component {
  render() {
    return(
      <>
        {this.props.categories.map((category, index) => (
          // <p key={index}>Hello, {category.name} from {category.values}</p>
          <Preference value={category.values}/>
        ))}
      </>
    )
  }
}

export default PreferenceCategories;