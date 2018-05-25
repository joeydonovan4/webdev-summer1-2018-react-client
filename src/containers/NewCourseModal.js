import React, {Component} from 'react';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class NewCourseModal extends Component {
    constructor(props) {
        super(props);
        this.setCourseTitle = this.setCourseTitle.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.validateTitle = this.validateTitle.bind(this);
        this.createCourse = this.createCourse.bind(this);

        this.state = {
            courseTitle: ''
        };
    }

    setCourseTitle(event) {
        this.setState({courseTitle: event.target.value});
    }

    resetForm() {
        this.props.onHide();
        this.setState({courseTitle: ''});
    }

    validateTitle() {
        return !(this.state.courseTitle);
    }

    createCourse() {
        this.props.onSubmit(this.state.courseTitle);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>New Course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <FormGroup>
                            <ControlLabel>Course Title</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.courseTitle}
                                placeholder="Enter course title"
                                onChange={this.setCourseTitle}/>
                        </FormGroup>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.resetForm}>Cancel</Button>
                    <Button bsStyle="primary" type="submit" disabled={this.validateTitle()} onClick={this.createCourse}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default NewCourseModal;