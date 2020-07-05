import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash, CaretUp, CaretDown } from 'react-bootstrap-icons';
import { formatDate } from '../Shared/Helper';


const TodoTable = (props) => {
    // Props from Parent Component
    const { 
            filterData,
            groupBy, 
            sortAction, 
            deleteAction, 
            reOpenAction, 
            doneAction, 
            editAction } = props;

    
    return (
        <div>
            {
                filterData.length > 0 ?
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="text-left">Summary <Button className="sortButton" onClick={() => sortAction('title')}><CaretUp /><CaretDown /> </Button></th>
                                <th className="text-left">Priority <Button className="sortButton" onClick={() => sortAction('priority')}><CaretUp /><CaretDown /> </Button></th>
                                <th className="text-left">Created On</th>
                                <th className="text-left">Due Date</th>
                                <th className="text-left">Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterData.map((item, index) => {
                                    return <tr key={index} className={ (groupBy) &&( item.priority == 'low') ? 'low' :(groupBy) &&( item.priority) =='medium' ? 'medium' :(groupBy) &&( item.priority) =='high' ? 'high' : (groupBy) &&(item.priority) == 'none' ? 'nonePrority':'none'}>
                                        <td className="text-left"><div className={item.currentState === 'completed' ? 'strikethrough' : 'none'}>{item.title}</div></td>
                                        <td className="text-left"><div className={item.currentState === 'completed' ? 'strikethrough' : 'none'}>{item.priority}</div></td>
                                        <td className="text-left"><div className={item.currentState === 'completed' ? 'strikethrough' : 'none'}>{formatDate(item.createdAt)}</div></td>
                                        <td className="text-left"><div className={item.currentState === 'completed' ? 'strikethrough' : 'none'}>{item.dueDate}</div></td>
                                        <td className="text-left">
                                            <div className="flexCss">
                                                <Button variant="primary" className="mr-1 actionButton" onClick={() => editAction(item, index)}><PencilSquare /></Button>
                                                <div>
                                                    {item.currentState == 'all' || item.currentState == 'completed' ? <Button variant="info" className="mr-1 actionButton" onClick={() => reOpenAction(item, index)}>Re-Open</Button> : <Button variant="success" className="mr-1 actionButton" onClick={() => doneAction(item, index)}>Done</Button>}</div>
                                                <Button variant="danger" className="mr-1 actionButton" onClick={() => deleteAction(index)}><Trash /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </Table> : <div className="text-center">No Data Available</div> }
        </div>
    )
};

export default TodoTable