import React, {Component} from 'react';
import {Navbar, Button} from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import '../styles/NavBar.css';

bootstrapUtils.addStyle(Navbar, 'primary');

class NavBar extends Component {
    render() {
        return (
            <Navbar fixedTop fluid bsStyle="primary">
                <Navbar.Header>
                    <Navbar.Brand>
                        <span>Course Manager</span>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <Button type="button" bsStyle="danger">
                            New Course
                        </Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavBar;