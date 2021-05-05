const PlaceHolderData = {
    students: {
        'student-1': {id: 'student-1', content: 'Bob Smith' },
        'student-2': {id: 'student-2', content: 'Alex Coleman'},
        'student-3': {id: 'student-3', content: 'Test Name'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Students to be allocated',
            studentIds: ['student-1', 'student-2', 'student-3'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Group-1',
            studentIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2'],

};

export default PlaceHolderData;
