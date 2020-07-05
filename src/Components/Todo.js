import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Tab, Tabs, Button } from 'react-bootstrap';
import TodoTable from './TodoTable';
import Create from './Create';
import { TodoModel } from '../Models/Todo.model';
import Search from './Search';
import { createFilter } from 'react-search-input'
import { dynamicSort } from '../Shared/Helper';
import Confirm from './Confirm';
import { withRouter } from 'react-router-dom';

const Todo = (props) => {
    // prop from Parent Component
    const {
        handleChange,
        listOfItems,
        history
            } = props;
    // Decalred local States

    const [key, setKey] = useState('all')
    const [filterData, setFilterData] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState(TodoModel);
    const [modalTitle] = useState('Edit Task')
    const [selectedIndex, setSelectedIndex] = useState();
    const [clicked, setClicked] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false);
    const [groupByFlag, setGroupByFlag] = useState(false);
    const filterKeys = ['title', 'priority']

    useEffect(() => {
        setFilterData(listOfItems)
    }, [listOfItems])

    // Tabs Fliter function based on current State
    const filterList = (value) => {
        setKey(value)
        let tempArray = [...listOfItems];
        let selectedData = tempArray.filter(function (e) {
            if (value == 'pending') {
                return e.currentState == 'pending'
            }
            else if (value == "completed") {
                return e.currentState == 'completed'
            }
            else {
                return e.currentState == 'completed' || e.currentState == 'pending'
            }
        });
        setFilterData(selectedData)
    }

    // Delete Task confirmation alert
    const handleDelete = (index) => {
        setConfirmShow(true)
        setSelectedIndex(index)
    }

    // Confirm Delete task function
    const confirmSubmit = () => {
        const copyArray = [...filterData];
        copyArray.splice(selectedIndex, 1)
        setFilterData(copyArray)
        setConfirmShow(false)
    }
    // Close Alert Modal
    const confirmClose = () => {
        setConfirmShow(false);
    }
    // Open Edit modal from updating task
    const handleEdit = (item, index) => {
        setModalShow(true)
        setData(item)
    }

    // Close Modal
    const handleClose = () => {
        setModalShow(false);
    }

    // Update Edit form Fields
    const onChange = (evt) => {
        evt.persist();
        setData({
            ...data, [evt.target.name]: evt.target.value
        })
    }

    // Update form Data
    const onSubmit = (evt) => {
        evt.preventDefault();
        setData(data);
        setModalShow(false);
        let arrayItems = [...filterData];
        for (let i in arrayItems) {
            if (arrayItems[i].id == data.id) {
                arrayItems[i] = data;
                setFilterData(arrayItems)
            }
        }
    }

    // action to make task completed
    const handleComplete = (item, index) => {
        let filter = [...filterData]
        filter[index].currentState = "completed";
        setFilterData(filter);
    }
    // action to reopen completed task
    const handleReOpen = (item, index) => {
        let filter = [...filterData]
        filter[index].currentState = "pending";
        setFilterData(filter);
    }
    // Search task
    const handleSearch = (evt) => {
        const searchFilters = filterData.filter(createFilter(evt, filterKeys))
        setFilterData(searchFilters)
    }
    // Sort Ascending
    function sortAsc(value) {
        let data = [...filterData]
        alternateSort(data, value)
    }
    // sort alternate
    function alternateSort(data, value) {
        if (clicked) {
            data.sort(dynamicSort('-' + value));
            setFilterData(data)
        }
        else {
            data.sort(dynamicSort(value));
            setFilterData(data)
        }
        setClicked(!clicked);
    }
    // Handled group by functionality
    const handleGroupBy = (evt) => {
        evt.persist();
        let groupname = evt.target.value
        switch (groupname) {
            case 'priority':
                groupBy(groupname)
                setGroupByFlag(true)
                break;
            case 'pendingOn':
                pendingOn(groupname)
                break;
            case 'none':
                noneFilter(groupname)
            default:
                break;
        }
    }

    function groupBy(value) {
        let copyData = [...filterData]
        copyData.sort(dynamicSort(value));
        setFilterData(copyData)
    }
    function githubArea() {
        history.push('/github')
    }
    function pendingOn (value){
        let pendingData = [...filterData]
        let selectedData = pendingData.filter(function (e) {
            if (value == 'pendingOn') {
                return e.currentState == 'pending'
            }
        });
        setFilterData(selectedData)
    }

    function noneFilter (value){
            let noneData = [...filterData]
            let selectedData = noneData.filter(function (e) {
                if (value == 'none') {
                    return e.currentState == 'pending' || e.currentState == 'completed'
                }
            });
            setFilterData(selectedData)
    }
    return (
        <div className="todo-component">
            <Container>
                <Row>
                    <Col><h2 className="text-left"> ToDo App</h2></Col>
                    <Col className="text-right"><Button onClick={githubArea} className="actionButton">Github Assignments</Button> </Col>
                </Row>

                <Row className="filter-header">
                    <Col xs={4}><Form.Group controlId="groupby">
                        <Form.Label>Group By</Form.Label>
                        <Form.Control as="select" name="groupby"
                            onChange={handleGroupBy}>
                            <option value="">Select</option>
                            <option value="none">None</option>
                            <option value="createdOn">Created On</option>
                            <option value="pendingOn">Pending On</option>
                            <option value="priority">Priority</option>
                        </Form.Control>
                    </Form.Group></Col>
                    <Col>
                        <Form.Group controlId="search">
                            <Form.Label>Search</Form.Label>
                            <Search
                                handleSearch={handleSearch}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <Tabs activeKey={key}
                            onSelect={(key) => filterList(key)} id="filters">
                            <Tab eventKey="all" title="All">
                                <TodoTable
                                    filterData={filterData}
                                    deleteAction={handleDelete}
                                    reOpenAction={handleReOpen}
                                    doneAction={handleComplete}
                                    editAction={handleEdit}
                                    sortAction={sortAsc}
                                    groupBy={groupByFlag}
                                />
                            </Tab>
                            <Tab eventKey="pending" title="Pending">
                                <TodoTable
                                    filterData={filterData}
                                    deleteAction={handleDelete}
                                    reOpenAction={handleReOpen}
                                    doneAction={handleComplete}
                                    editAction={handleEdit}
                                    groupBy={groupByFlag}
                                />
                            </Tab>
                            <Tab eventKey="completed" title="Completed">
                                <TodoTable
                                    filterData={filterData}
                                    deleteAction={handleDelete}
                                    reOpenAction={handleReOpen}
                                    doneAction={handleComplete}
                                    editAction={handleEdit}
                                    groupBy={groupByFlag}


                                />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
            <Create
                show={modalShow}
                onHide={handleClose}
                handleChange={onChange}
                handleSubmit={onSubmit}
                formData={data}
                title={modalTitle}
            />
            <Confirm
                show={confirmShow}
                onHide={confirmClose}
                handleSubmit={confirmSubmit}
            />
        </div>
    )
};

export default withRouter(Todo);