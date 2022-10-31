import Accordion from 'react-bootstrap/Accordion'

const SearchQuestions = () => {
    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>how do I use the filters in the search bar?</Accordion.Header>
                        <Accordion.Body>
                        select your city, category or cuisine of your choice, and the price range you'd like, then enter your search in the "find restaurants" search bar to search using filters
                        </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>how can I change my location?</Accordion.Header>
                    <Accordion.Body>
                    by navigating to the home page, selecting filters, and opening the dropdown menu called "select city", you can change the area that you are searching for restaurants.
                    </Accordion.Body>

                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                    <Accordion.Header>what areas does meet-n-eat support?</Accordion.Header>
                    <Accordion.Body>
                    we currently only support some major cities in California, but are looking into expanding our areas in the future.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default SearchQuestions;