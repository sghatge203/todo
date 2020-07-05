import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Todo = React.lazy(() => import("./Pages/Default"));
const gitHub = React.lazy(()=>import("./Pages/GitHub"));
const Routes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Route exact path="/" component={Todo} />
                <Route path="/github" component={gitHub} />
            </Router>
        </Suspense>
    )
}
export default Routes;