import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const Create = (props) => {
    const { show, onHide, handleSubmit, handleChange, formData, title, updateAction } = props;

    return (
        <div className="create-component">
            <Modal
                {...props}
                size="lg"
                area-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="summary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Summary"
                                maxLength={140}
                                minLength={10}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                maxLength={500}
                                minLength={10}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="dueDate">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        placeholder="Due Date" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="priority">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Control as="select" name="priority" value={formData.priority}
                                        onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="none">None</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-right">
                                <Button type="submit" variant="secondary" className="mr-1" onClick={onHide}>Close</Button>
                                <Button type="submit" variant="success" className="mr-1">{title == 'Add New Task' ? "Save" : "Update"} </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default Create;