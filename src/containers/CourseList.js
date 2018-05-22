import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import '../styles/CourseList.css';
import CourseServiceClient from '../services/CourseServiceClient';
import CourseRow from '../components/CourseRow';
class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }

    renderCourses() {
        if (this.state) {
            return this.state.courses.map((course) => {
                return <CourseRow key={course.id} course={course}/>
            });
        } else {
            return <tr><td align="center" colSpan="4">No courses!</td></tr>
        }
    }

    render() {
        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned By</th>
                        <th>Last Modified</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderCourses()}
                </tbody>
            </Table>
        )
    }
}
export default CourseList;