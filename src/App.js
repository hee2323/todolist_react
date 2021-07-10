import React, { useReducer, createContext, useContext, useRef } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import axios from "axios";
import useAsync from "./useAsync";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

// async function getList() {
//   const response = await axios({
//         method: 'GET',
//         url: 'http://localhost:8080/api/todo',
//       })
//   return response.data;
// }

const getList = async () => {
  try {
    await axios({
      method: 'GET',
      url: 'http://localhost:8080/api/todo',
    }).then(res => console.log(res.data));
    //   }).then(res => {
    //     const { id, contents, done } = res.data;
    //     return { id, contents, done };
    // });
  } catch (e) {
    console.error(e);
  }
}

// async function getList() {
//   const res = await axios({
//     method: 'GET',
//     url: 'http://localhost:8080/api/todo',
//   });
//   return res.status == 200 ? res.data : "error";
// }

// async function getList() {
//   const res = await axios.get("http://localhost:8080/api/todo")
//       .then(function (response) {
//         return response.data;
//       }).catch(function (error) {
//         return error;
//       });
// }

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      console.log(action.todo);
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, getList());
  const nextId = useRef(5);

  console.log(state)
  console.log(getList.data)

  return (
      <TodoStateContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
          <TodoNextIdContext.Provider value={nextId}>
            {children}
          </TodoNextIdContext.Provider>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
  );
}

// 커스텀 Hooks
// TodoList에서 사용
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

// TodoCreate에서 사용
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

function App() {
  // const [state, refetch] = useAsync(getList);
  //
  // const { loading, data: todolist, error } = state;
  //
  // if (loading) return <div>로딩중..</div>
  // if (error) return <div>에러가 발생했습니다.</div>
  // if (!todolist) return null;

  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;

