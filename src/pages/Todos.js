import useAxios from "../hook/useAxios";
import { Constants } from "../constants";
import { useState } from "react"
const { BASE_API_URL } = Constants;

export const Todos = () => {
  const [data, error, loading] = useAxios(`${BASE_API_URL}/todos`)
  const [todoPage, setTodoPage] = useState(1);
  const todoPerPage = 10;
  const lastTodos = todoPage * todoPerPage;
  const firstTodos = lastTodos - todoPerPage;

  const todosCount = Math.ceil(data.length / todoPerPage);
  const currentTodos = data.slice(firstTodos, lastTodos)

  if (error) {
    return <h3>Ops, error : {error.message}</h3>;
  } if (loading) {
    return <h3>Loading</h3>
  }

  const handleClick = (e) => {
    const { step } = e.target.dataset;
    if (
      (todoPage === 1 && step > 0) ||
      (todoPage === todosCount && step < 0) ||
      (todoPage > 1 && todoPage < todosCount)
    ) {
      setTodoPage(todoPage + Number(step))
    }
  }
  const todoList = currentTodos.map((todos) => (
    <li key={todos.id} className="p-3 m-2 border-2 border-blue-400 border-solid">
      <div className="flex flex-col">
        <h2>{todos.title}</h2>
        <h2>{todos.id}</h2>
        <h2>{todos.completed ? "Completed" : "Not Completed"}</h2>
      </div>
    </li>
  ))
  return (
    <div>
      <h1 className="flex justify-center mb-2 text-2xl font-bold dark:text-white md:text-5xl lg:text-6xl">Todos</h1>
      <ul>{todoList}
        <button onClick={handleClick} data-step={-1}>←</button>
        <span>Page {todoPage} of {todosCount}</span>
        <button onClick={handleClick} data-step={1}>→</button>
      </ul>
    </div>
  );
};

//ottenere l'elenco delle todo dal server con il link mandato e messo dentro const import.
//renderizzare una tabella che ci fa vedere i todo impaginandoli a gruppi di 10. ogni pagina 10 todo
//nella tabella una colonna con la possibilità di eliminare uno dei todo 