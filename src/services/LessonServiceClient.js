let _singleton = Symbol();
const HOST = 'https://webdev-java-server.herokuapp.com';
const LESSON_URI = '/api/lessons';

class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton];
    }

    findAllLessons() {
        return fetch(HOST + LESSON_URI)
            .then((resp) => {
                return resp.json();
            });
    }

    deleteLesson(id) {
        return fetch(HOST + LESSON_URI + '/' + id, {
            method: 'DELETE'
        }).then((resp) => {
            return resp.json();
        });
    }

    findLessonById(id) {
        return fetch(HOST + LESSON_URI + '/' + id)
            .then((resp) => {
                return resp.json();
            });
    }

    updateLesson(id, lesson) {
        return fetch(HOST + LESSON_URI + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lesson)
        }).then((resp) => {
            return resp.json();
        })
    }

    createTopic(id, topic) {
        return fetch(HOST + LESSON_URI + '/' + id + '/topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(topic)
        }).then((resp) => {
            return resp.json();
        });
    }

    findTopicsByLesson(id) {
        return fetch(HOST + LESSON_URI + '/' + id + '/topics')
            .then((resp) => {
                return resp.json();
            });
    }
}
export default LessonServiceClient;