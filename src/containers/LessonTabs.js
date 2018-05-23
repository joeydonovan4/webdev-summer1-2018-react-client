import React, {Component} from 'react';
import CourseServiceClient from '../services/CourseServiceClient';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);

        this.state = {
            courseId: this.props.match.params.courseId,
            moduleId: this.props.match.params.moduleId
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

    renderLessons() {
        if (this.state.lessons) {
            return this.state.lessons.map((lesson) => {
                return <ListGroupItem key={lesson.id}>{lesson.title}</ListGroupItem>
            });
        }
        return null;
    }

    render() {
        return (
            <div id="module-info">
                <ListGroup>
                    {this.renderLessons()}
                </ListGroup>
            </div>
        )
    }
}
export default LessonTabs;