let _singleton = Symbol();
const HOST = 'https://webdev-java-server.herokuapp.com';
const MODULE_URI = '/api/modules';

class ModuleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton];
    }

    findAllModules() {
        return fetch(HOST + MODULE_URI)
            .then((resp) => {
                return resp.json();
            });
    }

    deleteModule(id) {
        return fetch(HOST + MODULE_URI + '/' + id, {
            method: 'DELETE'
        }).then((resp) => {
            return resp.json();
        });
    }

    findModuleById(id) {
        return fetch(HOST + MODULE_URI + '/' + id)
            .then((resp) => {
                return resp.json();
            });
    }

    updateModule(id, mod) {
        return fetch(HOST + MODULE_URI + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mod)
        }).then((resp) => {
            return resp.json();
        })
    }
}
export default ModuleServiceClient;