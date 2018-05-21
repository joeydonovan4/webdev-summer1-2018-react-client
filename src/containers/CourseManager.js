import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from '../components/NavBar';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';

class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>

                    <Route path="/courses" component={CourseList}></Route>
                    <Route path="/courses/:courseId" component={CourseEditor}></Route>
                </div>
            </Router>
        )
    }
}
export default CourseManager;