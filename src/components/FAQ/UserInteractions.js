import Accordion from 'react-bootstrap/Accordion'

const UserInteractions = () => {
    return (
        <div>
            <Accordion variant='alert'>

                <Accordion.Item eventKey="0">
                    <Accordion.Header>how do I set up a meeting with someone?</Accordion.Header>
                        <Accordion.Body>
                        on another user's page, pick a restaurant and invite them to a meet up.  
                        </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>how do I add/remove a friend?</Accordion.Header>
                    <Accordion.Body>
                    navigate to your friends list and click the "remove" button.
                    </Accordion.Body>

                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                    <Accordion.Header>where can I view another user's schedule?</Accordion.Header>
                    <Accordion.Body>
                    click on their picture to go to their profile and look on the right side of their profile page to view their itinerary.
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>

        </div>
    );
};

export default UserInteractions;