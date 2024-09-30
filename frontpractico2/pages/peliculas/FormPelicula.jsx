import axios from 'axios';
import { useEffect, useState } from 'react';
import NavMenu from '../../components/NavMenu';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import momento from 'moment';

const FormPelicula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estreno, setEstreno] = useState('');
    const [trailer, setTrailer] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [errorTexto, setErrorTexto] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPeliculaById();
    }, [id])
    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
            .then((response) => {
                const pelicula = response.data;
                setTitulo(pelicula.titulo);
                setDescripcion(pelicula.descripcion);
                setEstreno(pelicula.estreno);
                setTrailer(pelicula.trailer);
                setCalificacion(pelicula.calificacion);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onChangeTitulo = (e) => {
        setTitulo(e.target.value);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        setErrorTexto('');
        const pelicula = {
            titulo,
            descripcion,
            estreno,
            trailer,
            calificacion
        }
        console.log(pelicula);
        if(id) {
            editPelicula(pelicula);
        } else {
            insertPelicula(pelicula);
        }
    }
    
    const editPelicula = (pelicula) => {
        axios.patch(`http://localhost:3000/peliculas/${id}`, pelicula)
            .then(() => {
                navigate('/adm/peliculas');
            })
            .catch((error) => {
                const errorMensaje = error.response.data.message;
                setErrorTexto(errorMensaje);
                console.log(error);
            });
    }
    
    const insertPelicula = (pelicula) => {
        axios.post('http://localhost:3000/peliculas', pelicula)
            .then(() => {
                navigate('/adm/peliculas');
            })
            .catch((error) => {
                const errorMensaje = error.response.data.message;
                setErrorTexto(errorMensaje);
                console.log(error);
            });
    }

    const onChangeTrailer = (e) => {
        const link = e.target.value;
        const linkArray = link.split('=');
        const newLink = `https://www.youtube.com/embed/${linkArray[1]}`;
        setTrailer(newLink);
    }
    return (
        <>
            <NavMenu/>
            <Container>
                <Row className='mt-3 mb-3'>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Tittle>
                                    <h2>Formulario de Pelicula</h2>
                                </Card.Tittle>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    {errorTexto && <Alert variant='danger'>{errorTexto}</Alert>}
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Titulo</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Ingrese el titulo'
                                            value={titulo}
                                            onChange={onChangeTitulo}
                                            required
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            El titulo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            placeholder='Ingrese la descripcion'
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            La descripcion es requerida
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Estreno</Form.Label>
                                        <Form.Control
                                            type='date'
                                            value={estreno}
                                            onChange={(e) => setEstreno(e.target.value)}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            La fecha de estreno es requerida
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Trailer</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Ingrese el link del trailer'
                                            value={trailer}
                                            onChange={onChangeTrailer}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            El trailer es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Calificacion</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Ingrese la calificacion'
                                            value={calificacion}
                                            onChange={(e) => setCalificacion(e.target.value)}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            La calificacion es requerida
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Button type='submit'>Guardar</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default FormPelicula;