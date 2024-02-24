import React from 'react';

const Popup = ({ shoot, newTodo, values, popupActive, setPopupActive, addTodo }) => {
	return <div>

		{popupActive ? (
			<div className="popup">
				<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
				<div className="content">
					<h4>Add Task </h4>
					<input type="text" placeholder='Title' name='text' className="add-todo-input" onChange={shoot} value={newTodo.text} />
					<input type="text" placeholder='Description' name='description' className="add-todo-input" onChange={shoot} value={newTodo.description} />
					<input type="date" placeholder='due date' name="due_date" className="add-todo-input" onChange={shoot} value={newTodo.due_date} />

					{values ?
						(<div className="content">
							<p style={{ marginTop: "5px", color: "red" }}>Please Enter Valid Task</p>
						</div>)
						: ("")}

					<div className="button" onClick={addTodo}>Create Task</div>
				</div>
			</div>
		) : ''}
	</div>;
}



export default Popup;