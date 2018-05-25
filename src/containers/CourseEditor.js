import React, {Component} from 'react';
import {Modal, Button, ButtonGroup, FormGroup, Form, FormControl} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import CourseServiceClient from '../services/CourseServiceClient';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
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
    color: 'white',
    border: 'none'
}

class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.hide = this.hide.bind(this);
        this.findCourseById = this.findCourseById.bind(this);
        this.getCourseName = this.getCourseName.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.updateCourseNameMode = this.updateCourseNameMode.bind(this);
        this.updateCourseName = this.updateCourseName.bind(this);
        this.saveCourseName = this.saveCourseName.bind(this);
        this.state = {
            show: false,
            updateNameMode: false
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

    getCourseId() {
        if (this.state.course) {
            return this.state.course.id;
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

    updateCourseNameMode() {
        if (!this.state.updateNameMode) {
            this.setState({courseName: this.state.course.title});
        }
        this.setState({updateNameMode: !this.state.updateNameMode});
    }

    updateCourseName(event) {
        this.setState({courseName: event.target.value});
    }

    saveCourseName() {
        let updatedCourse = {title: this.state.courseName, id: this.getCourseId()};
        this.courseService.updateCourse(this.getCourseId(), updatedCourse)
            .then((course) => {
                console.log('Course name updated from ' + this.state.course.title + ' to ' + course.title);
                this.setState({course: course});
                this.updateCourseNameMode();
            });
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.hide} animation>
                <Modal.Header closeButton style={modalHeaderStyles}>
                    <Modal.Title>
                        { this.state.updateNameMode ?
                            <Form inline>
                                <FormGroup>
                                   <FormControl type="text" value={this.state.courseName} placeholder="Course name" onChange={this.updateCourseName}/> 
                                </FormGroup>{' '}
                                <ButtonGroup>
                                    <Button bsSize="small" bsStyle="danger" title="Cancel changes" onClick={this.updateCourseNameMode}>
                                        <span className="fa fa-times"></span>
                                    </Button>
                                    <Button bsSize="small" bsStyle="success" title="Save changes" onClick={this.saveCourseName}>
                                        <span className="fa fa-check"></span>
                                    </Button>
                                </ButtonGroup>
                            </Form>
                            :
                            this.getCourseName()
                        }
                        { !this.state.updateNameMode &&
                            <Button onClick={this.updateCourseNameMode} bsSize="small" style={editBtnStyles} title="Edit course name">
                                <span className="fa fa-pencil"></span>
                            </Button>
                        }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ height: 500, padding: 0 }}>
                    <ModuleList courseId={this.getCourseId()} modules={this.state.modules}/>
                    <Route path={`/courses/:courseId/modules/:moduleId`} component={LessonTabs}/>
                </Modal.Body>
            </Modal>
        )
    }
}
export default CourseEditor;