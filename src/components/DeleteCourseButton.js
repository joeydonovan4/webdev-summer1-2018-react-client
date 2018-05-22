import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class DeleteCourseButton extends Component {
    render() {
        return (
            <Button bsStyle="danger" title="Delete course" bsSize="small"><span className="fa fa-times"></span></Button>
        )
    }
}
export default DeleteCourseButton;