import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Personas" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/personas"}>Lista de Personas</Link>
                            <Link className="dropdown-item" to={"/adm/personas/create"}>
                                Crear Persona
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Peliculas" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/peliculas"}>Lista de Peliculas</Link>
                            <Link className="dropdown-item" to="/adm/peliculas/create">
                                Crear Pelicula
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;