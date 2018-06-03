import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button, PanelGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import WidgetContainer from "../components/Widget";
import '../styles/Widgets.css';

class WidgetList extends Component {
    componentDidMount() {
        this.props.findWidgetsForLessonTopic(this.props.lessonId, this.props.topicId);
    }

    componentDidUpdate(prevProps) {
        let oldTopicId = prevProps.topicId;
        let newTopicId = this.props.topicId;
        if (oldTopicId !== newTopicId) {
            this.props.findWidgetsForLessonTopic(this.props.lessonId, newTopicId);
        }
    }

    renderWidgets() {
        return this.props.widgets.map(widget => (
            <WidgetContainer widget={widget} key={widget.id}/>
        ));
    }

    render() {
        return (
            <div>
                <h4>
                    <span style={{marginRight: 10}}>Widgets</span>
                    <Button className="pull-right" bsSize="xsmall" bsStyle="success" title="Save changes">
                        Save
                    </Button>
                </h4>
                <div id="preview-btns">
                    <ButtonToolbar bsSize="small">
                        <ToggleButtonGroup type="radio" name="preview-btns" defaultValue="off" className="pull-right">
                            <ToggleButton value="off">Preview Off</ToggleButton>
                            <ToggleButton value="on">Preview On</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </div>
                <PanelGroup id="widget-panels">
                    {this.renderWidgets()}
                </PanelGroup>
                <Button id="new-widget-btn" className="pull-right" title="New widget">
                    New Widget
                </Button>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => (
    { widgets: state.widgets }
);

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    findWidgetsForLessonTopic: (lessonId, topicId) =>
        actions.findWidgetsForLessonTopic(dispatch, lessonId, topicId),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch)
});

const WidgetApp = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(WidgetList);

export default WidgetApp;