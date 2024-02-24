import React, { createContext, useContext, useState } from 'react';

const TodosContext = createContext();

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [editTask, seteditTask] = useState([]);
    const [editPopup, seteditPopup] = useState(false);
    const [blur, setblur] = useState("noblur")
    const [loading, setloading] = useState("noloader")

    return (
        <TodosContext.Provider value={{ todos, setTodos, editTask, seteditTask, editPopup, seteditPopup, blur, setblur, loading, setloading }}>
            {children}
        </TodosContext.Provider>
    );
};
