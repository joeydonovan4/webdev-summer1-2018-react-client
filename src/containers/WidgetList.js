import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button, PanelGroup } from 'react-bootstrap';
import WidgetContainer from "../components/Widget";

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets();
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
                <PanelGroup id="widget-panels">
                    {this.renderWidgets()}
                </PanelGroup>
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