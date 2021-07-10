// import React, { useEffect, useState } from 'react';
// import { createGlobalStyle } from 'styled-components';
// import TodoTemplate from './components/TodoTemplate';
// import TodoHead from './components/TodoHead';
// import TodoList from './components/TodoList';
// import TodoCreate from './components/TodoCreate';
// import { TodoProvider } from './TodoContext';
// import axios from "axios";
//
// const GlobalStyle = createGlobalStyle`
//   body {
//     background: #e9ecef;
//   }
// `;
//
// function App() {
//   const [ user, setUser ] = useState("");
//   useEffect(() => {
//       axios.post("/todo").then((response) => {
//           if (response.data) {
//               console.log(response.data);
//               setUser(response.data);
//           } else {
//               alert("failed to ");
//           }
//       });
//   }, []);
//
//   return (
//     <TodoProvider>
//       <GlobalStyle />
//       <TodoTemplate>
//         <TodoHead />
//         <TodoList />
//         <TodoCreate />
//       </TodoTemplate>
//     </TodoProvider>
//   );
// }
//
// export default App;
//
