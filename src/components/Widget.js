import React from 'react';
import { connect } from 'react-redux';
import { DELETE_WIDGET } from '../constants/index';
import { Panel, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { SELECT_WIDGET_TYPE } from '../constants/index';
import HeadingContainer from './Heading';
import { widgetNameUpdated } from '../actions/index';

const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
);

const Image = () => (
    <h2>Image</h2>
);

const List = () => (
    <h2>List</h2>
);

const Widget = ({widget, widgetNameUpdated, dispatch}) => {
    let selectElement;
    let widgetName;
    return (
        <Panel id={`widget-${widget.id}`}>
            <Panel.Heading style={{backgroundColor: '#c5cbe3'}}>
                <div className="pull-right">
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button bsStyle="warning" bsSize="xsmall" title="Move up"><span className="fa fa-arrow-up"></span></Button>
                            <Button bsStyle="warning" bsSize="xsmall" title="Move down"><span className="fa fa-arrow-down"></span></Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button bsStyle="danger" bsSize="xsmall" onClick={e => (
                                dispatch({type: DELETE_WIDGET, id: widget.id})
                            )} title="Delete widget">
                                <span className="fa fa-trash"></span>
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <Panel.Title componentClass="h2">
                    <select value={widget.className} style={{marginRight: 5}}
                        onChange={e =>
                            dispatch({
                                type: SELECT_WIDGET_TYPE,
                                id: widget.id,
                                className: selectElement.value
                            })} ref={node => selectElement = node}>
                        <option>Heading</option>
                        <option>Paragraph</option>
                        <option>List</option>
                        <option>Image</option>
                    </select>
                    <span>&nbsp;Widget</span>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <form>
                    {widget.className === 'Heading' && <HeadingContainer widget={widget}/>}
                    {widget.className === 'Paragraph' && <Paragraph/>}
                    {widget.className === 'List' && <List/>}
                    {widget.className === 'Image' && <Image/>}
                    <div className="form-group">
                        <input className="form-control" placeholder="Widget name"
                            value={widget.name}
                            onChange={() => widgetNameUpdated(widget.id, widgetName.value)}
                            ref={node => widgetName = node}/>
                    </div>
                </form>
            </Panel.Body>
        </Panel>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    widgetNameUpdated: (widgetId, updatedName) =>
        widgetNameUpdated(dispatch, widgetId, updatedName)
});

const WidgetContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Widget)
export default WidgetContainer;