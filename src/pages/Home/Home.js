import { useEffect, useState } from 'react';
import Add from '../../Components/Add';
import './home.css'
import Popup from '../../Components/Popup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useTodos } from '../../context/TodosContext';
import EditTask from '../../Components/EditTask';
const api_base = 'https://mern-assignment-backend.onrender.com';

function Home(props) {
	const { todos, setTodos, blur, setblur, loading, setloading } = useTodos();
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState({
		text: "",
		description: "",
		due_date: "",
	});
	const [values, setvalues] = useState(false);


	useEffect(() => {
		GetTodos();
	}, []);
	const history = useNavigate();

	const GetTodos = async () => {

		try {
			const response = await fetch(api_base + '/todos', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					userId: localStorage.getItem("user_login")
				})
			});
			const movies = await response.json();
			setTodos(movies);
			console.log(movies)
		}

		catch (err) {
			// console.log(err);
		}

	}

	const completeTodo = async id => {
		const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));

	}

	const addTodo = async () => {

		setblur("blur");
		setloading("loader");
		if (newTodo.text && newTodo.description && newTodo.due_date) {
			const data = await fetch(api_base + "/todo/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},

				body: JSON.stringify({
					userId: localStorage.getItem("user_login"),
					text: newTodo?.text,
					description: newTodo?.description,
					due_date: newTodo?.due_date
				})

			}
			).then(res => res.json());

			setTodos([...todos, data]);
			setblur("noblur");
			setloading("noloader")

			setPopupActive(false);
			setNewTodo("");
			setvalues(false);
		}
		else {
			setvalues(true);
			setblur("noblur");
			setloading("noloader")
		}

	}

	const deleteTodo = async id => {
		setblur("blur");
		setloading("loader");
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json()
		);
		setblur("noblur");
		setloading("noloader");
		setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
	}

	const shoot = (e) => {
		const { name, value } = e.target;
		setNewTodo({ ...newTodo, [name]: value });
	}

	const [click, setClick] = useState(false);
	const [close, setclose] = useState("on");

	const handleClick = () => {
		setClick(!click);
		if (close == "on")
			setclose("off")
		else
			setclose("on")
	}



	return (
		<>


			<Navbar click={click} setClick={setClick} handleClick={handleClick} name={props.name} />
			<div className={close} >


				<div className=" col-md-6 offset-md-3"> 	<h4>Your tasks</h4></div>


				<div className="todos col-md-6 offset-md-3">
					<Add deleteTodo={deleteTodo} completeTodo={completeTodo} todos={todos} />
				</div>
				{localStorage.getItem("user_login") ?
					(<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>) : ""}


				<Popup shoot={shoot} popupActive={popupActive} addTodo={addTodo} setPopupActive={setPopupActive} newTodo={newTodo} values={values} />
				<EditTask />
				<div className={blur}>
					<div className={loading}></div>
				</div>
			</div>
		</>

	);
}

export default Home;
