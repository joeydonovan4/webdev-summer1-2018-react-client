import React, {Component} from 'react';
import CourseServiceClient from '../services/CourseServiceClient';
import LessonServiceClient from '../services/LessonServiceClient';
import {Nav, NavItem} from 'react-bootstrap';
import '../styles/CourseEditor.css';
import NewLessonModal from './NewLessonModal';
import NewLessonTab from '../components/NewLessonTab';

class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.lessonService = LessonServiceClient.instance;
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.showNewLessonModal = this.showNewLessonModal.bind(this);
        this.hideNewLessonModal = this.hideNewLessonModal.bind(this);
        this.getSelectedLessonTitle = this.getSelectedLessonTitle.bind(this);
        this.getSelectedLessonID = this.getSelectedLessonID.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.createLesson = this.createLesson.bind(this);

        this.state = {
            courseId: this.props.courseId,
            moduleId: this.props.moduleId,
            newLessonModal: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let oldModuleId = prevProps.moduleId;
        let newModuleId = this.props.moduleId;

        if (oldModuleId !== newModuleId) {
            this.setState({moduleId: newModuleId});
            this.findAllLessonsForModule(this.state.courseId, newModuleId);
        }

        let oldLesson = prevState.selectedLesson;
        let newLesson = this.state.selectedLesson;

        if (oldLesson !== newLesson) {
            this.props.onLessonSelect(newLesson);
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
                if (lessons.length > 0) {
                    this.setState({selectedLesson: lessons[0]});
                } else {
                    this.setState({selectedLesson: null});
                }
            });
        this.props.onLessonSelect(this.state.selectedLesson);
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

    showNewLessonModal() {
        this.setState({newLessonModal: true});
    }

    hideNewLessonModal() {
        this.setState({newLessonModal: false});
    }

    createLesson(lessonTitle) {
        let lesson = {title: lessonTitle};
        this.courseService.createLesson(
            this.state.courseId,
            this.state.moduleId,
            lesson
        ).then((newLesson) => {
            let lessons = this.state.lessons;
            lessons.push(newLesson);
            this.setState({lessons: lessons});
            console.log('Created new lesson ' + newLesson.title + ' with id ' + newLesson.id);
            this.hideNewLessonModal();
        });
    }

    getSelectedLessonTitle() {
        if (this.state.selectedLesson) {
            return this.state.selectedLesson.title;
        }
        return null;
    }

    renderLessons() {
        let lessons = null;
        if (this.state.lessons) {
            lessons = this.state.lessons.map((lesson) => {
                return (
                    <NavItem key={lesson.id} eventKey={lesson.id} className="nav-item">
                        {lesson.title}
                    </NavItem>
                )
            });
        }
        return ([
            lessons,
            <NewLessonTab key="new-lesson" test={this.showNewLessonModal}/>
        ]);
    }

    getSelectedLessonID() {
        if (this.state.selectedLesson) {
            return this.state.selectedLesson.id;
        }
        return null;
    }

    handleSelect(selectedKey) {
        let lessons = this.state.lessons;
        for (var i = 0; i < lessons.length; i++) {
            if (lessons[i].id === selectedKey) {
                this.setState({selectedLesson: lessons[i]});
            }
        }
    }

    render() {
        return (
            <div>
                <h4>Lessons</h4>
                <Nav bsStyle="tabs" onSelect={this.handleSelect} activeKey={this.getSelectedLessonID()}>
                    {this.renderLessons()}
                </Nav>
                <NewLessonModal
                    show={this.state.newLessonModal}
                    onHide={this.hideNewLessonModal}
                    onSubmit={this.createLesson}/>
            </div>
        )
    }
}
export default LessonTabs;