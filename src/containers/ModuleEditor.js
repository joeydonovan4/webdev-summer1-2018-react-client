import React, { Component } from 'react';
import LessonTabs from '../containers/LessonTabs';
import {Provider} from 'react-redux';
import WidgetApp from './WidgetList';
import store from "../store/index";
import '../styles/CourseEditor.css';

class ModuleEditor extends Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <div>
                <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId}/>
                <Provider store={store}>
                    <WidgetApp/>
                </Provider>
            </div>
        )
    }
}
export default ModuleEditor;