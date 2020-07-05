import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const Confirm = (props) => {
    const { show, onHide, handleSubmit } = props;

    return (
        <div className="create-component">
            <Modal
                {...props}
                size="sm"
                area-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <div>Are you sure you want to delete this?</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="text-right">
                            <Button type="submit" variant="secondary" className="mr-1" onClick={onHide}>No</Button>
                            <Button type="submit" variant="success" className="mr-1" onClick={handleSubmit}>Yes</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default Confirm;