/**
 * Renders the 404 page
 **/
import { Button, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NotFoundImg from '../assets/images/404-not-found.png'

function NoMatch() {

   return (
      <section className="py-3 py-md-4 py-xl-5">
         <Container>
            <div className="d-flex align-items-center justify-content-center">
               <div className="text-center">
                  <Image src={NotFoundImg} alt='Page not found' fluid width={500} height={300} />
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