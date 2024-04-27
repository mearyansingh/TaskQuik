import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NoMatch() {
   return (
      <section className="p-3 p-md-4 p-xl-5">
         <Container>
            <div className="d-flex align-items-center justify-content-center">
               <div className="text-center">
                  <h1 className="display-1 fw-bold">404</h1>
                  <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                  <p className="lead">
                     The page you’re looking for doesn’t exist.
                  </p>
                  <Button as={Link} to="/" variant="primary" type='button'>Back to Home</Button>
               </div>
            </div>
         </Container>
      </section>
   )
}

export default NoMatch 