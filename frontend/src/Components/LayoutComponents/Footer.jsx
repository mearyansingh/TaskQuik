import { Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {

   return (
      <Container>
         <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
            <Col md={4} className="col-md-4 d-flex flex-wrap align-items-center">
               <Link to="/" className="fw-bold navbar-brand mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                  TaskQuik
               </Link>
               <small className="mb-3 mb-md-0 text-body-secondary">© 2024 Made with ❤️ by <a href='https://devaryan.online' target='_blank'>Dev Aryan</a></small>
            </Col>
            <ul className="nav col-md-4 d-flex gap-3 justify-content-end list-unstyled">
               <li className=""><a className="text-body-secondary" href="https://instagram.com/devaryan.online" rel="noreferrer" target='_blank'><i className='bi bi-instagram'></i></a></li>
               <li className=""><a className="text-body-secondary" href="https://github.com/mearyansingh" rel="noreferrer" target='_blank'><i className='bi bi-github'></i></a></li>
            </ul>
         </footer>
      </Container>
   )
}

export default Footer