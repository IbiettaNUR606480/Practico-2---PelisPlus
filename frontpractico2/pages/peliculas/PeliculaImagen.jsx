import axios from 'axios';
import { useState } from 'react';
import NavMenu from '../../components/NavInicioMenu';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PeliculaImagen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profilePhoto, setProfilePhoto] = useState(null);

    const onChangeProfilePhoto = (e) => {
        setProfilePhoto(e.target.files[0]);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const formData = new FormData();
        formData.append('profilePhoto', profilePhoto);
        axios.post(`http://localhost:3000/peliculas/${id}/imagen`, formData)
            .then((res) => {
                console.log(res.data);
                navigate('/peliculas');
            })
            .catch((error) => {
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
                                <Card.Title>Subir Imagen</Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Imagen</Form.Label>
                                        <Form.Control type="file" required onChange={onChangeProfilePhoto} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Guardar
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )

}


export default PeliculaImagen;