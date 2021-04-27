import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PlaceHolderData from './PlaceHolderData';
import Column from './column';
import css from './dnd.module.css';

class DragNDrop extends React.Component {
    
    state = PlaceHolderData;
    onDragEnd= result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start == finish) {
            const newStudentIds = Array.from(start.studentIds);
            newStudentIds.splice(source.index, 1);
            newStudentIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                studentIds: newStudentIds,
            };
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                },
            }
    
            this.setState(newState)
            return;
        }
       

        const startStudentIds = Array.from(start.studentIds);
        startStudentIds.splice(source.index, 1);
        const newStart = {
            ...start,
            studentIds: startStudentIds,
        };
        
        const finishStudentIds = Array.from(finish.studentIds);
        finishStudentIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            studentIds: finishStudentIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);
    };

    render() {
        return(
            <div className={css.mainContainer}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {this.state.columnOrder.map(columnId =>{
                        const column = this.state.columns[columnId];
                        const students = column.studentIds.map(studentId => this.state.students[studentId]);

                        return <Column key={column.id} column={column} students={students}/>;
                    })}
                </DragDropContext>
            </div>
        );
    }
}

export default DragNDrop;
