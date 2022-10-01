import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"


const CuisineCategory = ( { category } ) => {

return (
    <Col style={{maxWidth: '200px', margin: '10px'}}>
        <Link 
            style={{
                textDecoration: 'none'
            }} 
            to={`/results/${category.toLowerCase()}`}
        >
            <div className="d-flex align-items-center justify-content-center"
                style={{
                    borderRadius:'10px',
                    border:'1px solid #D6300F',
                    backgroundImage: `url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800")`,
                    height: '200px',
                    width: '200px',
                    fontWeight: "bold",
                    fontSize: '28px',
                    backgroundSize: 'cover',
                    color: 'black',
                }}
            >
                {category}
            </div>
        </Link>
    </Col>
)
}

export default CuisineCategory