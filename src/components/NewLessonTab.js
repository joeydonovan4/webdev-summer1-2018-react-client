import React, { Component } from 'react';
import { NavItem } from "react-bootstrap";

class NewLessonTab extends Component {
    render() {
        return (
            <NavItem id="new-lesson-tab" title="Create new lesson" onClick={this.props.test}>
                <span className="fa fa-plus"></span>
            </NavItem>
        )
    }
}
export default NewLessonTab;