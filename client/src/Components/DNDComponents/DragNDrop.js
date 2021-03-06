import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './column';
import css from './dnd.module.css';

class DragNDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.buildState();
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            this.setState(this.buildState());
        }
    }

    unassignedStudentIds() {
        const studentIds = this.props.unassignedStudents.map(student => student.external_id);

        return studentIds;
    }

    buildState() {
        let tempState = {}
        tempState.students = this.buildStudents();
        tempState.columns = this.buildColumns();
        tempState.columnOrder = this.buildColumnOrder();

        return tempState;
    }

    buildStudents() {
        if (this.props.groups.length === 0) {
            return {};
        }

        const usersGroups = this.props.groups.map(group => {
            return group.GroupAllocations.map(group_alloc => group_alloc.User);
        })
        let users = [].concat.apply([], usersGroups);

        const unassignedStudents = this.props.unassignedStudents;
        const allStudentsInThisProject = [...users, ...unassignedStudents];

        let hash = {};
        allStudentsInThisProject.forEach(user => {
            hash[user.external_id] = {
                id: user.external_id,
                content: user.first_name + ' ' + user.last_name
            }
        });

        return hash;
    }

    buildColumns() {
        if (this.props.groups.length === 0) {
            return {
            };
        }

        let columns = {
            'unassigned': {
                id: 'unassigned',
                title: 'Unassigned',
                studentIds: this.unassignedStudentIds()
            }
        }

        this.props.groups.forEach(group => {
            columns[group.id.toString()] = {
                id: group.id.toString(),
                title: "Group " + group.group_number.toString(),
                studentIds: group.GroupAllocations.map(group_alloc => group_alloc.User.external_id)
            }
        })

        return columns;
    }

    buildColumnOrder() {
        if (this.props.groups.length === 0) {
            return [];
        }

        let columnOrder = ['unassigned'];
        this.props.groups.forEach(group => {
            columnOrder.push(group.id.toString());
        });

        return columnOrder;
    }

    onDragEnd = result => {
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

        if (finish.title === 'Unassigned') {
            // delete group allocation with group_id source.droppableId
            // const jsonString = JSON.stringify({ external_id: external_id, group_id: source.droppableId });

            // fetch('http://localhost:6060/api/admin/projects/' + this.props.group.project_id + '/group_allocations', {
            //     method: 'delete',
            //     credentials: 'include',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: jsonString
            // })
            // .then(_response => {
            //     location.reload()
            // })
        }

        if(start.title === 'Unassigned' && finish.title !== 'Unassigned') {
            // only create group allocation with group_id destination.droppableId

            // const jsonString = JSON.stringify({ external_id: external_id, group_id: destination.droppableId });

            // fetch('http://localhost:6060/api/admin/projects/' + this.props.group.project_id + '/group_allocations', {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: jsonString
            // })
            // .then(_response => {
            //     location.reload()
            // })
        }

        if(start.title !== 'Unassigned' && finish.title !== 'Unassigned') {
            // delete old group allocation with group_id source.droppableId
            // create new group allocation with group_id destination.droppableId

            // console.log(source.droppableId);
            // console.log(this.state.students)

            //let jsonString = JSON.stringify({ external_id: external_id, group_id: source.droppableId });
            //console.log({source})
            // fetch('http://localhost:6060/api/admin/projects/' + this.props.group.project_id + '/group_allocations', {
            //     method: 'delete',
            //     credentials: 'include',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: jsonString
            // })
            // .then(_response => {
            //     location.reload()
            // })

            // jsonString = JSON.stringify({ external_id: external_id, group_id: destination.droppableId });

            // fetch('http://localhost:6060/api/admin/projects/' + this.props.group.project_id + '/group_allocations', {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: jsonString
            // })
            // .then(_response => {
            //     location.reload()
            // })
        }

        if (start === finish) {
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
                        const students = column.studentIds.map(studentId => {

                            return this.state.students[studentId]
                        });

                        return <Column key={column.id} column={column} students={students}/>;
                    })}
                </DragDropContext>
            </div>
        );
    }
}

export default DragNDrop;
