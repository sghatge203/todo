import React, { useEffect, useState } from 'react';
import { gitHubServices } from '../Services/github.service';
import { ExclamationCircle, ChatLeft,Bezier } from 'react-bootstrap-icons';

const Github = () => {
    const [listOfissues, setListOfissues] = useState([])
    const [isLoading,setIsLoading] = useState(false);

;    useEffect(() => {
        getGithubIssues()
    }, [])

    const getGithubIssues = () => {
        setIsLoading(true)
        gitHubServices().then((result) => {
            setIsLoading(false)
            setListOfissues(result)
        }, (error) => {
            setIsLoading(false)
            console.log(error)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row issues-row-head">
                <div className="col-md-1"> <ExclamationCircle /> </div>
                <div className="col-md-10">Github Repo Issues</div>
            </div>
            {
               listOfissues? listOfissues.map((issue, index) => {
                    return <div className="row issues-row" key={index}>
                        <div className="col-md-1"> <ExclamationCircle className={issue.state == 'open' ? 'unlocked' : 'locked'} /> </div>
                        <div className="col-md-8 text-left">
                            <div className="title">{issue.title}</div>
                            <span className="details">#{issue.number} opened by {issue.user.login}</span>
                        </div>
                        <div className="col-md-1"><img src={issue.user.avatar_url} className="avatar" /> </div>
                <div className="col-md-1"><Bezier /> </div>
                        <div className="col-md-1"><ChatLeft /> <span>{issue.comments}</span> </div>
                    </div>
                }):null
            }

        </div>
    )
};

export default Github;