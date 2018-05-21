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
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map((course) => {
                return <CourseRow key={course.id} course={course}/>
            });
        }
        return (
            courses
        )
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