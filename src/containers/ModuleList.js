import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import ConfirmModal from '../containers/ConfirmModal';
import CourseServiceClient from '../services/CourseServiceClient';
import ModuleServiceClient from '../services/ModuleServiceClient';
import '../styles/CourseEditor.css';
class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.moduleService = ModuleServiceClient.instance;
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.getModuleToDeleteTitle = this.getModuleToDeleteTitle.bind(this);
        this.renderNewModuleButton = this.renderNewModuleButton.bind(this);
        this.newModuleMode = this.newModuleMode.bind(this);
        this.updateNewModuleName = this.updateNewModuleName.bind(this);
        this.saveNewModule = this.saveNewModule.bind(this);
        this.state = {
            courseId: props.courseId,
            modules: props.modules,
            newModuleMode: false
        };
    }

    showModal(event) {
        let moduleId = parseInt(event.currentTarget.id, 10);
        let moduleToDelete = this.state.modules.filter((mod) => {
            return mod.id === moduleId;
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
                    return m.id !== moduleId;
                });
                this.setState({
                    modules: modules,
                    showConfirmModal: false
                });
            });
    }

    renderModuleList() {
        if (this.state.modules.length > 0) {
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
            return <p>This course has no modules!</p>;
        }
    }

    newModuleMode() {
        this.setState({
            newModuleMode: !this.state.newModuleMode,
            newModuleName: ''
        });
    }

    renderNewModuleButton() {
        return (
            <Button id="new-module-btn" bsStyle="success" title="Create new module" onClick={this.newModuleMode} disabled={this.state.newModuleMode}>
                <span className="fa fa-plus"></span>
            </Button>
        )
    }

    saveNewModule() {
        let newModule = {title: this.state.newModuleName};
        this.courseService.createModule(this.state.courseId, newModule)
            .then((mod) => {
                console.log('New module ' + mod.title + ' created');
                this.state.modules.push(mod);
                this.newModuleMode();
            });
    }

    updateNewModuleName(event) {
        this.setState({newModuleName: event.target.value});
    }

    render() {
        return (
            <div className="sidenav">
                {this.renderNewModuleButton()}
                {this.renderModuleList()}
                {this.state.newModuleMode &&
                    <div className="input-group">
                        <input type="text" className="form-control" value={this.state.newModuleName} placeholder="Enter module name" onChange={this.updateNewModuleName}/>
                        <span className="input-group-btn">
                            <Button bsSize="small" bsStyle="danger" title="Cancel changes" onClick={this.newModuleMode}>
                                <span className="fa fa-times"></span>
                            </Button>
                            <Button bsSize="small" bsStyle="success" title="Save changes" onClick={this.saveNewModule}>
                                <span className="fa fa-check"></span>
                            </Button>
                        </span>
                    </div>
                }
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