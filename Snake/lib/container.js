'use strict'

export default class Container {
    constructor() {
        this.__objects = []
    }

    get _objects() {
        return this.__objects
    }

    addObject(obj) {
        this.__objects.push(obj)
    }

    removeObject(obj) {
        this.__objects.splice(this.__objects.indexOf(obj), 1)
    }
}