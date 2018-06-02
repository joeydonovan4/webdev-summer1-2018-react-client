import React, { Component } from 'react';
import { Nav, NavItem, Button } from "react-bootstrap";
import NewTopicModal from './NewTopicModal';
import LessonServiceClient from '../services/LessonServiceClient';
import '../styles/CourseEditor.css';

class TopicTabs extends Component {
    constructor(props) {
        super(props);
        this.lessonService = LessonServiceClient.instance;
        this.showNewTopicModal = this.showNewTopicModal.bind(this);
        this.hideNewTopicModal = this.hideNewTopicModal.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            lesson: props.lesson,
            newTopicModal: false
        };
    }

    componentDidUpdate(prevProps) {
        let oldLesson = prevProps.lesson;
        let newLesson = this.props.lesson;

        if (oldLesson !== newLesson) {
            this.setState({
                lesson: newLesson,
                selectedTopic: null
            });
            this.props.onTopicSelect(null);
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
                    <NavItem key={topic.id} eventKey={topic.id} className="nav-item">
                        {topic.title}
                    </NavItem>
                )
            });
        }
        return null;
    }

    showNewTopicModal() {
        this.setState({newTopicModal: true});
    }

    hideNewTopicModal() {
        this.setState({newTopicModal: false});
    }

    createTopic(topicTitle) {
        let topic = {title: topicTitle};
        this.lessonService.createTopic(
            this.state.lesson.id,
            topic
        ).then((newTopic) => {
            let topics = this.state.topics;
            topics.push(newTopic);
            this.setState({topics: topics});
            console.log('Created new topic ' + newTopic.title + ' with id ' + newTopic.id);
            this.hideNewTopicModal();
        });
    }

    handleSelect(selectedKey) {
        let topics = this.state.topics;
        for (var i = 0; i < topics.length; i++) {
            if (topics[i].id === selectedKey) {
                this.setState({selectedTopic: topics[i]});
                this.props.onTopicSelect(topics[i]);
            }
        }
    }

    getSelectedTopicID() {
        if (this.state.selectedTopic) {
            return this.state.selectedTopic.id;
        }
        return null;
    }

    render() {
        return (
            <div>
                <h4>
                    <span style={{marginRight: 10}}>Topics</span>
                    <Button bsSize="xsmall" bsStyle="success" title="New Topic" onClick={this.showNewTopicModal}>
                        <span className="fa fa-plus"></span>
                    </Button>
                </h4>
                <Nav bsStyle="pills" onSelect={this.handleSelect} activeKey={this.getSelectedTopicID()}>
                    {this.renderTopics()}
                </Nav>
                <NewTopicModal
                    show={this.state.newTopicModal}
                    onHide={this.hideNewTopicModal}
                    onSubmit={this.createTopic}/>
            </div>
        )
    }
}
export default TopicTabs;