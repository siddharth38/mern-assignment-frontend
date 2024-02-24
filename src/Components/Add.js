import React, { useState } from 'react';
import tick from './tick.png';
import { useTodos } from '../context/TodosContext';
import API from "../api/index";

const Add = (props) => {
	const { todos, seteditTask, seteditPopup, blur, setblur, loading, setloading } = useTodos();
	const itemsPerPage = 2;
	const [currentPage, setCurrentPage] = useState(1);
	const [activeFilter, setActiveFilter] = useState('all');

	const indexOfLastTodo = currentPage * itemsPerPage;
	const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;


	let filteredTodos = todos;
	if (activeFilter === 'complete') {
		filteredTodos = todos.filter(todo => todo.complete);
	} else if (activeFilter === 'incomplete') {
		filteredTodos = todos.filter(todo => !todo.complete);
	}

	const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
	const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleFilterChange = (filter) => {
		setActiveFilter(filter);
		setCurrentPage(1);
	};

	const editTodo = (e, id) => {
		setblur("blur");
		setloading("loader");
		API.get(`/todo/get/${id}`)
			.then(res => {
				seteditTask(res.data)
				setblur("noblur");
				setloading("noloader")
				seteditPopup(true)
			}).catch((error) => {
				console.log(error)
				setblur("noblur");
				setloading("noloader")
			})
	}

	return (
		<>
			{localStorage.getItem("user_login") ?
				<div>
					<div className="filter-tabs">
						<button className={activeFilter === 'all' ? 'active' : ''} onClick={() => handleFilterChange('all')}>All</button>
						<button className={activeFilter === 'complete' ? 'active' : ''} onClick={() => handleFilterChange('complete')}>Complete</button>
						<button className={activeFilter === 'incomplete' ? 'active' : ''} onClick={() => handleFilterChange('incomplete')}>Incomplete</button>
					</div>
					{totalPages > 1 && (
						<div className="pagination">
							{Array.from({ length: totalPages }, (_, index) => (
								<button
									key={index}
									onClick={() => handlePageChange(index + 1)}
									className={currentPage === index + 1 ? 'active' : ''}
								>
									{index + 1}
								</button>
							))}
						</div>
					)}
					{currentTodos.length > 0 ? (
						currentTodos.map((todo) => (
							<div
								className={"todo" + (todo.complete ? " is-complete" : "")}
								key={todo._id}

							>
								{todo.complete ? (
									<span onClick={() => props.completeTodo(todo._id)}>
										<img
											style={{
												marginLeft: "1vh",
												marginRight: "2vh",
												width: "30px",
												height: "30px",
											}}
											src={tick}
											alt="tick"
										></img>
									</span>
								) : (
									<input type='checkbox' className='checkbox' onClick={() => props.completeTodo(todo._id)} />
								)}

								<div onClick={() => props.completeTodo(todo._id)}>
									<div>{`due on ${todo.due_date}`} </div>
									<div className="text">{todo?.text} </div>
									<div style={{ marginRight: "60px" }}>{todo?.description} </div>

								</div>
								<div className="bell" onClick={(e) => editTodo(e, todo._id)}>
									<i class="fa fa-edit" style={{ fontSize: "28px" }} ></i>
								</div>
								<div
									className="delete-todo"
									onClick={() => props.deleteTodo(todo._id)}
								>
									x
								</div>
							</div>
						))
					) : (
						<p>You currently have no tasks</p>
					)}
				</div> : (<p>You currently have no tasks</p>)
			}
			<div className={blur}>
				<div className={loading}></div>
			</div>

		</>
	);
};

export default Add;
