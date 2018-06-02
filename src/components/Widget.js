import React from 'react';
import { connect } from 'react-redux';
import { DELETE_WIDGET } from '../constants/index';
import { Panel, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { SELECT_WIDGET_TYPE } from '../constants/index';

const Heading = () => (
    <div>
        <h2>Heading</h2>
        <select>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
        </select>
    </div>
);

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

const Widget = ({widget, dispatch}) => {
    let selectElement;
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
                    <span style={{marginRight: 5}}>{widget.className} Widget</span>
                    <select value={widget.className}
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
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                {widget.className === 'Heading' && <Heading/>}
                {widget.className === 'Paragraph' && <Paragraph/>}
                {widget.className === 'List' && <List/>}
                {widget.className === 'Image' && <Image/>}
            </Panel.Body>
        </Panel>
    )
}
const WidgetContainer = connect()(Widget)
export default WidgetContainer;