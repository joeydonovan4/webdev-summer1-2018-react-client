import React, {Component} from 'react';
import {Navbar, Button} from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import NewCourseModal from '../containers/NewCourseModal';
import CourseServiceClient from '../services/CourseServiceClient';
import '../styles/NavBar.css';

bootstrapUtils.addStyle(Navbar, 'primary');

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.showNewCourseModal = this.showNewCourseModal.bind(this);
        this.hideNewCourseModal = this.hideNewCourseModal.bind(this);
        this.createCourse = this.createCourse.bind(this);

        this.state = {
            newCourseModal: false
        };
    }

    showNewCourseModal() {
        this.setState({newCourseModal: true});
    }

    hideNewCourseModal() {
        this.setState({newCourseModal: false});
    }

    createCourse(courseTitle) {
        let course = {title: courseTitle};
        this.courseService.createCourse(course)
            .then((newCourse) => {
                console.log('Created new course ' + newCourse.title + ' with id ' + newCourse.id);
                this.hideNewCourseModal();
            });
    }

    render() {
        return (
            <div>
                <NewCourseModal
                    show={this.state.newCourseModal}
                    onHide={this.hideNewCourseModal}
                    onSubmit={this.createCourse}/>
                <Navbar fixedTop fluid bsStyle="primary">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <span>Course Manager</span>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullRight>
                            <Button type="button" bsStyle="danger" onClick={this.showNewCourseModal}>
                                New Course
                            </Button>
                        </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
export default NavBar;