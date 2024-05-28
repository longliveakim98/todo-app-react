import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import useLocalStorage from 'use-local-storage';
import { TodoContext } from './contexts/TodoContext';
import './App.css'

function Layout() {
  return (
    <>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav>
            <Nav.Link href='/add'>Add Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )

}

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="add" element={<AddTodo />}></Route>
            <Route path="edit/:id" element={<EditTodo />}></Route>
            <Route path='*' element={<ErrorPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App
