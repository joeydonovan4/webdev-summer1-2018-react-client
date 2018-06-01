import React, { Component } from 'react';
import LessonTabs from './LessonTabs';
import TopicTabs from './TopicTabs';
import {Provider} from 'react-redux';
import WidgetApp from './WidgetList';
import store from "../store/index";
import '../styles/CourseEditor.css';

class ModuleEditor extends Component {
    constructor(props) {
        super(props);
        this.setSelectedLesson = this.setSelectedLesson.bind(this);
        this.getSelectedLesson = this.getSelectedLesson.bind(this);

        this.state = {
            courseId: this.props.match.params.courseId,
            moduleId: this.props.match.params.moduleId,
            newLessonModal: false
        };
    }

    componentDidUpdate(prevProps) {
        let oldModuleId = prevProps.match.params.moduleId;
        let newModuleId = this.props.match.params.moduleId;

        if (oldModuleId !== newModuleId) {
            this.setState({moduleId: newModuleId});
        }
    }

    setSelectedLesson(lesson) {
        this.setState({selectedLesson: lesson});
    }

    getSelectedLesson() {
        if (this.state.selectedLesson) {
            return this.state.selectedLesson;
        }
        return null;
    }

    render() {
        return (
            <div>
                <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId} onLessonSelect={this.setSelectedLesson}/>
                <TopicTabs courseId={this.state.courseId} moduleId={this.state.moduleId} lesson={this.getSelectedLesson()}/>
                <Provider store={store}>
                    <WidgetApp/>
                </Provider>
            </div>
        )
    }
}
export default ModuleEditor;