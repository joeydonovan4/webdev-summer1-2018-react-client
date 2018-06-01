import React, { Component } from 'react';
import { Nav, NavItem } from "react-bootstrap";

class TopicTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lesson: props.lesson
        };
    }

    componentDidUpdate(prevProps) {
        let oldLesson = prevProps.lesson;
        let newLesson = this.props.lesson;

        if (oldLesson !== newLesson) {
            this.setState({lesson: newLesson});
            let topics = null;
            if (newLesson) {
                topics = newLesson.topics;
            }
            this.setState({topics: topics});
        }
    }

    renderTopics() {
        if (this.state.topics) {
            return this.state.topics.map((topic) => {
                return (
                    <NavItem key={topic.id} eventKey={topic.id}>
                        {topic.title}
                    </NavItem>
                )
            });
        }
        return null;
    }

    render() {
        return (
            <div>
                <Nav bsStyle="pills">
                    {this.renderTopics()}
                </Nav>
            </div>
        )
    }
}
export default TopicTabs;