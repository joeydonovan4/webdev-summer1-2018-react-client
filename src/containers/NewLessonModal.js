import React, {Component} from 'react';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class NewLessonModal extends Component {
    constructor(props) {
        super(props);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.validateTitle = this.validateTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);

        this.state = {
            lessonTitle: ''
        };
    }

    setLessonTitle(event) {
        this.setState({lessonTitle: event.target.value});
    }

    resetForm() {
        this.props.onHide();
        this.setState({lessonTitle: ''});
    }

    validateTitle() {
        return !(this.state.lessonTitle);
    }

    createLesson(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.lessonTitle);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>New Lesson</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <FormGroup>
                            <ControlLabel>Lesson Title</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.lessonTitle}
                                placeholder="Enter lesson title"
                                onChange={this.setLessonTitle}/>
                        </FormGroup>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.resetForm}>Cancel</Button>
                    <Button bsStyle="primary" type="submit" disabled={this.validateTitle()} onClick={this.createLesson}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default NewLessonModal;