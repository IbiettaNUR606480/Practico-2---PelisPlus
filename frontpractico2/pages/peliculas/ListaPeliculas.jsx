import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaPeliculas = () => {
    const[listaPeliculas, setListaPeliculas] = useState([]);
    useEffect(() => {
        getListaPeliculas();
        document.title = "Lista de Peliculas";
    }, []);

    const getListaPeliculas = () => {
        axios.get("http://localhost:3000/peliculas")
            .then((response) => {
                setListaPeliculas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar esta pelicula?");
        if(confirm) {
            return;
        }
            axios.delete(`http://localhost:3000/peliculas/${id}`)
                .then(res => {
                    console.log(res.data);
                    getListaPeliculas();
                })
                .catch(error => {
                    console.error(error);
                });
        }
        return (
            <>
                <NavMenu />
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Lista de Peliculas</Card.Title>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Titulo</th>
                                                <th>Descripcion</th>
                                                <th>Estreno</th>
                                                <th>Trailer</th>
                                                <th>Calificacion</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listaPeliculas.map((pelicula) => (
                                                <tr key={pelicula.id}>
                                                    <td>{pelicula.id}</td>
                                                    <td>{pelicula.titulo}</td>
                                                    <td>{pelicula.descripcion}</td>
                                                    <td>{pelicula.estreno}</td>
                                                    <td>{pelicula.trailer}</td>
                                                    <td>{pelicula.calificacion}</td>
                                                    <td>
                                                        <Link to={`/peliculas/${pelicula.id}/imagen`} className="btn btn-primary">
                                                            Imagen
                                                        </Link>
                                                        <Link to={`/peliculas/${pelicula.id}/edit`} className="btn btn-warning">
                                                            Editar
                                                        </Link>
                                                        <Button variant="danger" onClick={() => eliminar(pelicula.id)}>
                                                            Eliminar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
}

export default ListaPeliculas;