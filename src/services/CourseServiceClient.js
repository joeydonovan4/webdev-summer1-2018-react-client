let _singleton = Symbol();
const HOST = 'https://webdev-java-server.herokuapp.com';
const COURSE_URI = '/api/courses';

class CourseServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseServiceClient(_singleton);
        return this[_singleton];
    }

    createCourse(course) {
        return fetch(HOST + COURSE_URI, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            return resp.json();
        });
    }

    deleteCourse(id) {
        return fetch(HOST + COURSE_URI + '/' + id, {
            method: 'DELETE'
        }).then((resp) => {
            return resp.json();
        });
    }

    findAllCourses() {
        return fetch(HOST + COURSE_URI)
            .then((resp) => {
                return resp.json();
            });
    }

    findCourseById(id) {
        return fetch(HOST + COURSE_URI + '/' + id)
            .then((resp) => {
                return resp.json();
            });
    }

    updateCourse(id, course) {
        return fetch(HOST + COURSE_URI + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        }).then((resp) => {
            return resp.json();
        })
    }

    createModule(id, mod) {
        return fetch(HOST + COURSE_URI + '/' + id + '/modules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mod)
        }).then((resp) => {
            return resp.json();
        });
    }

    findAllModulesForCourse(id) {
        return fetch(HOST + COURSE_URI + '/' + id + '/modules')
            .then((resp) => {
                return resp.json();
            });
    }

    createLesson(course_id, module_id, lesson) {
        return fetch(HOST + COURSE_URI + '/' + course_id + '/modules/' +
            module_id + '/lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lesson)
        }).then((resp) => {
            return resp.json();
        })
    }

    findAllLessonsForModule(course_id, module_id) {
        return fetch(HOST + COURSE_URI + '/' + course_id + '/modules/' +
            module_id + '/lessons')
            .then((resp) => {
                return resp.json();
            });
    }
}
export default CourseServiceClient;