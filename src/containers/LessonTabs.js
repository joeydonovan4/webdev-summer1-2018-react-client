import React, {Component} from 'react';
import CourseServiceClient from '../services/CourseServiceClient';
import LessonServiceClient from '../services/LessonServiceClient';
import {Nav, NavItem} from 'react-bootstrap';
import ConfirmModal from '../containers/ConfirmModal';
import '../styles/CourseEditor.css';
import {Provider} from 'react-redux';
import WidgetApp from './WidgetList';
import store from "../store/index";

class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.lessonService = LessonServiceClient.instance;
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getSelectedLessonTitle = this.getSelectedLessonTitle.bind(this);
        this.getFirstLesson = this.getFirstLesson.bind(this);

        this.state = {
            courseId: this.props.match.params.courseId,
            moduleId: this.props.match.params.moduleId,
            showConfirmModal: false
        };
    }

    componentDidUpdate(prevProps) {
        let oldModuleId = prevProps.match.params.moduleId;
        let newModuleId = this.props.match.params.moduleId;

        if (oldModuleId !== newModuleId) {
            this.setState({moduleId: newModuleId});
            this.findAllLessonsForModule(this.state.courseId, newModuleId);
        }
    }

    componentDidMount() {
        this.findAllLessonsForModule(
            this.state.courseId,
            this.state.moduleId
        );
    }

    findAllLessonsForModule(cid, mid) {
        this.courseService.findAllLessonsForModule(cid, mid)
            .then((lessons) => {
                this.setState({lessons: lessons});
            });
    }

    deleteLesson() {
        let lessonId = this.state.selectedLesson.id;
        this.lessonService.deleteLesson(lessonId)
            .then((lesson) => {
                let lessons = this.state.lessons.filter((l) => {
                    return l.id !== lessonId;
                });
                this.setState({
                    lessons: lessons,
                    showConfirmModal: false
                });
            });
    }

    showModal(event) {
        let lessonId = parseInt(event.currentTarget.id, 10);
        let selectedLesson = this.state.lessons.filter((l) => {
            return l.id === lessonId;
        })[0];
        this.setState({
            showConfirmModal: true,
            selectedLesson: selectedLesson
        });
    }

    hideModal() {
        this.setState({showConfirmModal: false});
    }

    getSelectedLessonTitle() {
        if (this.state.selectedLesson) {
            return this.state.selectedLesson.title;
        }
        return null;
    }

    renderLessons() {
        if (this.state.lessons) {
            return this.state.lessons.map((lesson) => {
                return (
                    <NavItem key={lesson.id} eventKey={lesson.id}>
                        {lesson.title}
                        <button type="button" className="close" id={lesson.id} onClick={this.showModal} title="Delete lesson">
                            <span aria-hidden="true">x</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </NavItem>
                )
            });
        }
        return null;
    }

    getFirstLesson() {
        if (this.state.lessons) {
            if (typeof this.state.lessons[0] !== 'undefined') {
                console.log(this.state.lessons[0].id);
                return this.state.lessons[0].id;
            }
        }
        return null;
    }

    handleSelect(selectedKey) {
        alert(`selected ${selectedKey}`);
    }

    render() {
        return (
            <div id="module-info">
                <Nav bsStyle="tabs" activeKey={this.getFirstLesson()} justified>
                    {this.renderLessons()}
                </Nav>
                <Provider store={store}>
                        <WidgetApp/>
                </Provider>
                <ConfirmModal
                    show={this.state.showConfirmModal}
                    onHide={this.hideModal}
                    action="delete"
                    resource={this.getSelectedLessonTitle()}
                    onSubmit={this.deleteLesson}/>
            </div>
        )
    }
}
export default LessonTabs;