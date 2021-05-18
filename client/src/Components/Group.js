import React, {Component} from 'react';

class Group extends Component{

	handleRemoveStudentFromGroup(external_id) {
		const jsonString = JSON.stringify({ external_id: external_id, group_id: this.props.group.id });

		fetch('http://localhost:6060/api/admin/projects/' + this.props.group.project_id + '/group_allocations', {
        method: 'delete',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
				body: jsonString
    })
    .then(_response => {
      location.reload()
    })
	}

	render() {
			return(
					<div style={{ display: 'block' }}>
						<b>Group {this.props.group.group_number}</b>
						{ this.props.group.GroupAllocations.map((group_alloc, index) => (
							<li key={index} onClick={() => this.handleRemoveStudentFromGroup(group_alloc.User.external_id)}>
								{ group_alloc.User.first_name } { group_alloc.User.last_name }
							</li>
						))}
					</div>
			)
	}
}

export default Group;