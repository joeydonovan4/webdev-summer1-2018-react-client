import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class ConfirmModal extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Changes</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to {this.props.action} <strong>{this.props.resource}</strong>?</Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.props.onSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default ConfirmModal;