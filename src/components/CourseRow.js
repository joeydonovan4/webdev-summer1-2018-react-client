import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DeleteCourseButton from './DeleteCourseButton';

const verticalAlignStyle = { verticalAlign: 'middle'}

class CourseRow extends Component {
    render() {
        return (
            <tr>
                <td style={verticalAlignStyle}>
                    <Link to={`/courses/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td style={verticalAlignStyle}>
                    me
                </td>
                <td style={verticalAlignStyle}>
                    {this.props.course.updatedAt}
                </td>
                <td style={verticalAlignStyle} className="text-center">
                    <DeleteCourseButton course={this.props.course}/>
                </td>
            </tr>
        )
    }
}
export default CourseRow;