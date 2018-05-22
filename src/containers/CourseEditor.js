import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import CourseServiceClient from '../services/CourseServiceClient';
import {Link} from 'react-router-dom';
import '../styles/CourseEditor.css';

const modalHeaderStyles = {
    backgroundColor: '#4056a1',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    color: 'white',
    borderColor: '#6d6d6d'
}

const editBtnStyles = {
    backgroundColor: '#4056a1',
    color: 'white'
}

class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.hide = this.hide.bind(this);
        this.findCourseById = this.findCourseById.bind(this);
        this.getCourseName = this.getCourseName.bind(this);
        this.renderModuleList = this.renderModuleList.bind(this);

        this.state = {
            show: false
        };
    }

    hide() {
        this.setState({show: false});
        this.props.history.push('/courses');
    }

    componentDidMount() {
        this.findCourseById(this.props.match.params.courseId);
    }

    findCourseById(id) {
        this.courseService.findCourseById(id)
            .then((course) => {
                this.setState({
                    course: course
                });
                this.findAllModulesForCourse(this.props.match.params.courseId);
            });
    }

    getCourseName() {
        if (this.state.course) {
            return this.state.course.title;
        }
        return null;
    }

    findAllModulesForCourse(id) {
        this.courseService.findAllModulesForCourse(id)
            .then((modules) => {
                this.setState({
                    modules: modules,
                    show: true
                });
            });
    }

    renderModuleList() {
        if (this.state.modules) {
            return this.state.modules.map((mod) => {
                return <Link key={mod.id} to={`/courses/${this.state.course.id}/modules/${mod.id}`}>{mod.title}</Link>
            });
        } else {
            return null;
        }
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.hide} animation>
                <Modal.Header closeButton style={modalHeaderStyles}>
                    <Modal.Title>{this.getCourseName()}</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ height: 500, padding: 0 }}>
                    <div className="sidenav">
                        {this.renderModuleList()}
                    </div>
                    <div id="module-info"></div>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsSize="sm" style={editBtnStyles}>Edit Course</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default CourseEditor;