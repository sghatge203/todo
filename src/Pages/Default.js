import React, { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import { Container, Button } from 'react-bootstrap'
import Create from '../Components/Create';
import { TodoModel } from '../Models/Todo.model';
import Todo from '../Components/Todo';

const Default = () => {
    // declared local States 
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle] = useState("Add New Task");
    const [data, setData] = useState(TodoModel);
    const [listData, setListData] = useState([])

    // Open Add new task Modal
    function handleOpen() {
        setModalShow(true)
        setData(TodoModel)
    }
    // Close Modal
    function handleClose() {
        setModalShow(false)
    }
    // Save Data for new Task
    const onSubmit = (evt) => {
        evt.preventDefault()
        var joined = listData.concat(data);
        setListData(joined)
        setModalShow(false)
    }
    // Update form fields
    const onChange = (evt) => {
        evt.persist();
        setData(prevState => ({
            ...prevState,
            currentState: "pending",
            createdAt: new Date(),
            id: new Date().getTime(),
            [evt.target.name]: evt.target.value
        }))
    }

    return (
        <div className="default-page">
            <Container fluid>
                {/* Todo List Layout Component */}
                <Todo
                    listOfItems={listData}
                />
                {/* Add New Fab Button */}

                <Button
                    variant="primary"
                    className="fab-button"
                    title="Add New Task"
                    onClick={handleOpen}><Plus />
                </Button>
            </Container>

            {/* Add new task Modal component */}
            <Create
                show={modalShow}
                onHide={handleClose}
                handleChange={onChange}
                handleSubmit={onSubmit}
                formData={data}
                title={modalTitle}
            />
        </div>
    )
};

export default Default;