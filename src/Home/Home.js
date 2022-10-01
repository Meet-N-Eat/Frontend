import { Container, Row } from 'react-bootstrap'
import Search from '../components/Search'
import CuisineCategory from './CuisineCategory'

const Home = () => {
// State
const categories = ['Italian', 'Southern', 'American (Traditional)']


return (
    <Container style={{height:'90vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Row>
            <Search />
        </Row>
        <h2 style={{paddingTop:'10%', marginBottom:'5%'}}>not sure where to go? start with a cuisine and see where it leads!</h2>
        <Row className="d-flex">
            {categories.map((category, index) => <CuisineCategory key={index} category={category} />)}
        </Row>
    </Container>
)
}

export default Home