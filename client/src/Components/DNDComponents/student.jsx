import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import css from './dnd.module.css'

export default class Student extends React.Component {
    render() {
        return(
           <Draggable draggableId={this.props.student.id} index={this.props.index}>
               {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={css.studentContainer}>
                        {this.props.student.content}
                    </div>
               )}    
            </Draggable>
        )
        
    }
}
