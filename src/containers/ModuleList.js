import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/CourseEditor.css';
class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: props.courseId,
            modules: props.modules
        };
    }

    renderModuleList() {
        if (this.state.modules) {
            return this.state.modules.map((mod) => {
                return <Link key={mod.id} to={`/courses/${this.state.courseId}/modules/${mod.id}`}>{mod.title}</Link>
            });
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="sidenav">
                {this.renderModuleList()}
            </div>
        )
    }
}
export default ModuleList;