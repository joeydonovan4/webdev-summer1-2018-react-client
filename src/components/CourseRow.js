import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class CourseRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <Link to={`/courses/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>
                    Me
                </td>
                <td>
                    {this.props.course.updatedAt}
                </td>
                <td>
                </td>
            </tr>
        )
    }
}
export default CourseRow;