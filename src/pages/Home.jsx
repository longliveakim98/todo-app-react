import { useContext } from "react";
import { Container, Badge, Card, Col, Row, Button } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { todos, setTodos } = useContext(TodoContext);
    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id)); // Update todos by filtering out the todo with the given id
    };
    const navigate = useNavigate();

    return (
        <Container>
            <h1 className="my-3">Your Todos</h1>
            <Row>
                <CardGroup todos={todos} handleDelete={handleDelete} navigate={navigate} />
            </Row>
        </Container>
    );
}

function CardGroup({ todos, handleDelete, navigate }) {

    return todos.map((todo) => {
        const completed = todo.completed;
        const bg = completed ? "success" : "danger";
        return (
            <Col md={4} key={todo.id}>
                <Card className="my-3">
                    <Card.Body>
                        <Card.Title>{todo.title}</Card.Title>
                        <Card.Text>{todo.description}</Card.Text>
                        <Badge bg={bg}>{!completed && "Not"} Completed</Badge>
                        <div className="float-end mt-2">
                            <Button
                                variant="secondary"
                                className="mx-1"
                                onClick={() => navigate(`/edit/${todo.id}`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                className="mx-1"
                                onClick={() => handleDelete(todo.id)} // Use handleDelete prop
                            >
                                Delete
                            </Button>
                        </div>

                    </Card.Body>
                </Card>
            </Col>
        );
    });


}


