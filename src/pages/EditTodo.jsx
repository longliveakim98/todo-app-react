// ./pages/EditTodo.js
import { useState, useContext, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
    const { id } = useParams(); // Get the id from the URL
    const { todos, setTodos } = useContext(TodoContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const todoToEdit = todos.find(todo => todo.id === parseInt(id));
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setCompleted(todoToEdit.completed);
        }
    }, [id, todos]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setTodos(todos.map(todo =>
            todo.id === parseInt(id)
                ? { ...todo, title, description, completed }
                : todo
        ));
        navigate("/");
    };

    return (
        <Container>
            <h1 className="my-3">Edit Todo</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Get Software developer jobs"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder={`1. Create amazing projects\n2. Apply Google & Netflix\n3. Crush interview`}
                        required
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
}
