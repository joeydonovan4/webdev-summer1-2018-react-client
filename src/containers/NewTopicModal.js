import React, {Component} from 'react';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class NewTopicModal extends Component {
    constructor(props) {
        super(props);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.validateTitle = this.validateTitle.bind(this);
        this.createTopic = this.createTopic.bind(this);

        this.state = {
            topicTitle: ''
        };
    }

    setTopicTitle(event) {
        this.setState({topicTitle: event.target.value});
    }

    resetForm() {
        this.props.onHide();
        this.setState({topicTitle: ''});
    }

    validateTitle() {
        return !(this.state.topicTitle);
    }

    createTopic(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.topicTitle);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.resetForm} bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title>New Topic</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <FormGroup>
                            <ControlLabel>Topic Title</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.topicTitle}
                                placeholder="Enter topic title"
                                onChange={this.setTopicTitle}/>
                        </FormGroup>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.resetForm}>Cancel</Button>
                    <Button bsStyle="primary" type="submit" disabled={this.validateTitle()} onClick={this.createTopic}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default NewTopicModal;