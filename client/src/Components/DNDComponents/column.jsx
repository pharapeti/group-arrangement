import React from 'react';
import Student from './student';
import { Droppable } from 'react-beautiful-dnd';
import css from './dnd.module.css';

export default class Column extends React.Component {
    render() {
        return (
            <div className={css.columnContainer}>
                <h3 className={css.title}>{this.props.column.title}</h3>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={css.studentList} >
                            {this.props.students.map((student, index) => <Student key={student.id} student={student} index={index}/>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}
