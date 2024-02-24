import React, { useState } from 'react';
import { useTodos } from '../context/TodosContext';
import API from "../api/index";
const EditTask = () => {
    const { editTask, editPopup, seteditTask, seteditPopup, blur, setblur, loading, setloading } = useTodos();

    const [values, setvalues] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        seteditTask({ ...editTask, [name]: value })

    }

    const editHandler = (e) => {
        setblur("blur");
        setloading("loader");
        if (editTask.text && editTask.description && editTask.due_date) {
            API.put(`/todo/update/${editTask._id}`, editTask).then(res => {

                setblur("noblur");
                setloading("noloader")
                seteditPopup(false);
                setvalues(false);
                window.location.reload();
            });



        }
        else {
            setvalues(true);
            setblur("noblur");
            setloading("noloader")
        }
    }
    return <div>
        {editPopup ? (
            <div className="popup">
                <div className="closePopup" onClick={() => seteditPopup(false)}>X</div>
                <div className="content">
                    <h4>Edit Task </h4>
                    <input type="text" placeholder='Title' name='text' className="add-todo-input" onChange={handleChange} value={editTask?.text || ""} />
                    <input type="text" placeholder='Description' name='description' className="add-todo-input" onChange={handleChange} value={editTask?.description || ""} />
                    <input type="date" placeholder='due date' name="due_date" className="add-todo-input" onChange={handleChange} value={editTask?.due_date || ""} />
                    {values ?
                        (<div className="content">
                            <p style={{ marginTop: "5px", color: "red" }}>Please Enter Valid Task</p>
                        </div>)
                        : ("")}


                    <div className="button" onClick={editHandler} >Edit Task</div>

                </div>;
            </div>
        ) : ''}
        <div className={blur}>
            <div className={loading}></div>
        </div>
    </div>;
}

export default EditTask;