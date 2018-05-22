import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import ConfirmModal from '../containers/ConfirmModal';
import CourseServiceClient from '../services/CourseServiceClient';

class DeleteCourseButton extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

        this.state = {
            showConfirmModal: false
        };
    }

    showModal() {
        this.setState({showConfirmModal: true});
    }

    hideModal() {
        this.setState({showConfirmModal: false});
    }

    deleteCourse() {
        this.courseService.deleteCourse(this.props.course.id)
            .then((course) => {
                console.log('Deleted course ' + course.title + ' with id ' + course.id);
                this.hideModal();
            });
    }

    render() {
        return (
            <div>
                <ConfirmModal
                    show={this.state.showConfirmModal}
                    onHide={this.hideModal}
                    action="delete"
                    resource={this.props.course.title}
                    onSubmit={this.deleteCourse}/>
                <Button onClick={this.showModal} bsStyle="danger" title="Delete course" bsSize="small"><span className="fa fa-times"></span></Button>
            </div>
        )
    }
}
export default DeleteCourseButton;