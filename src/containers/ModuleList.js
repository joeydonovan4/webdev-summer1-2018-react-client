import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ConfirmModal from '../containers/ConfirmModal';
import ModuleServiceClient from '../services/ModuleServiceClient';
import '../styles/CourseEditor.css';
class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleServiceClient.instance;
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.getModuleToDeleteTitle = this.getModuleToDeleteTitle.bind(this);
        this.state = {
            courseId: props.courseId,
            modules: props.modules
        };
    }

    showModal(event) {
        let moduleId = event.currentTarget.id;
        let moduleToDelete = this.state.modules.filter((mod) => {
            return mod.id == moduleId;
        })[0];
        this.setState({
            showConfirmModal: true,
            moduleToDelete: moduleToDelete
        });
    }

    hideModal() {
        this.setState({showConfirmModal: false});
    }

    getModuleToDeleteTitle() {
        if (this.state.moduleToDelete) {
            return this.state.moduleToDelete.title;
        }
        return null;
    }

    deleteModule() {
        let moduleId = this.state.moduleToDelete.id;
        this.moduleService.deleteModule(moduleId)
            .then((mod) => {
                let modules = this.state.modules.filter((m) => {
                    return m.id != mod.id;
                });
                this.setState({
                    modules: modules,
                    showConfirmModal: false
                });
            });
    }

    renderModuleList() {
        if (this.state.modules) {
            return this.state.modules.map((mod) => {
                return (
                    <Link key={mod.id} to={`/courses/${this.state.courseId}/modules/${mod.id}`}>
                        {mod.title}
                        <button type="button" className="close" id={mod.id} onClick={this.showModal} title="Delete module">
                            <span aria-hidden="true">x</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Link>
                )
            });
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="sidenav">
                {this.renderModuleList()}
                <ConfirmModal
                    show={this.state.showConfirmModal}
                    onHide={this.hideModal}
                    action="delete"
                    resource={this.getModuleToDeleteTitle()}
                    onSubmit={this.deleteModule}/>
            </div>
        )
    }
}
export default ModuleList;