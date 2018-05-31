import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';

class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/courses" component={CourseList}/>
                    <Route path="/courses/:courseId" component={CourseEditor}/>
                </div>
            </Router>
        )
    }
}
export default CourseManager;