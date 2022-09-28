import React from 'react';
import Accordion from 'react-bootstrap/Accordion'

const PersonalInfo = () => {
    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>How do I create a new account?</Accordion.Header>
                        <Accordion.Body>
                        Click on the profile icon at the top right of the screen, select sign up, and follow the on-screen instructions.
                        </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Where can I update my profile picture?</Accordion.Header>
                    <Accordion.Body>
                    Click the settings icon at the top right of the screen to navigate to your profile settings. From the profile settings page, you can select a new profile picture from your device and upload it to your profile.
                    </Accordion.Body>

                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                    <Accordion.Header>What is a display name?</Accordion.Header>
                    <Accordion.Body>
                    A display name is the name that you share with other users on Meet 'N Eat. 
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>How do I change my username/email/display name?</Accordion.Header>
                    <Accordion.Body>
                    Click the settings icon at the top right of the screen to navigate to your profile settings. From the profile settings page, you can edit and update your username, email, and display name associated with your account.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>How can I update my bio?</Accordion.Header>
                    <Accordion.Body>
                    Click the settings icon at the top right of the screen to navigate to your profile settings. From the profile settings page, you can edit and update your bio which is shown to other Meet 'N Eat users.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default PersonalInfo;