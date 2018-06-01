import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Nav, NavItem} from 'react-bootstrap';
import ConfirmModal from '../containers/ConfirmModal';
import CourseServiceClient from '../services/CourseServiceClient';
import ModuleServiceClient from '../services/ModuleServiceClient';
import '../styles/CourseEditor.css';
class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.moduleService = ModuleServiceClient.instance;
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.getModuleToDeleteTitle = this.getModuleToDeleteTitle.bind(this);
        this.renderNewModuleButton = this.renderNewModuleButton.bind(this);
        this.newModuleMode = this.newModuleMode.bind(this);
        this.updateNewModuleName = this.updateNewModuleName.bind(this);
        this.saveNewModule = this.saveNewModule.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            courseId: props.courseId,
            newModuleMode: false
        };
    }

    componentDidMount() {
        this.findAllModulesForCourse(this.state.courseId);
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
        if (this.state.modules) {
            let modules = this.state.modules.map((mod) => {
                return (
                    <NavItem key={mod.id}
                        eventKey={mod.id}
                        className="module-item"
                        componentClass={Link}
                        href={`/courses/${this.state.courseId}/modules/${mod.id}`}
                        to={`/courses/${this.state.courseId}/modules/${mod.id}`}>
                        {mod.title}
                    </NavItem>
                )
            });
            let newModuleBtn = this.renderNewModuleButton();
            return (
                <Nav stacked bsStyle="pills" onSelect={this.handleSelect} activeKey={this.getSelectedModuleID()}>
                    {newModuleBtn}
                    {modules}
                </Nav>
            )
        }
        return <span className="fa fa-spinner"></span>
    }

    renderNewModuleButton() {
        return (
            <NavItem id="new-module-btn" key="new-module-btn" title="Create new module" onClick={this.newModuleMode} disabled={this.state.newModuleMode}>
                Create New Module
            </NavItem>
        )
    }

    getSelectedModuleID() {
        if (this.state.selectedModule) {
            return this.state.selectedModule.id;
        }
        return null;
    }

    handleSelect(selectedKey) {
        let modules = this.state.modules;
        for (var i = 0; i < modules.length; i++) {
            if (modules[i].id === selectedKey) {
                this.setState({selectedModule: modules[i]});
            }
        }
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

    newModuleMode() {
        this.setState({
            newModuleMode: !this.state.newModuleMode,
            newModuleName: ''
        });
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
            <div className="col-xs-4" style={{paddingRight: 0}}>
                <div className="sidenav">
                    {this.renderModuleList()}
                    {this.state.newModuleMode &&
                        <div className="input-group">
                            <input type="text" className="form-control" value={this.state.newModuleName} placeholder="New module" onChange={this.updateNewModuleName}/>
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
            </div>
        )
    }
}
export default ModuleList;