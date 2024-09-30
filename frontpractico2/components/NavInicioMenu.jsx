import { Container, Navbar, /*Nav, NavDropdown*/ } from "react-bootstrap";
// import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/peliculas">PelisPlus</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    );
}

export default NavMenu;