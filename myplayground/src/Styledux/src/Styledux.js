import _ from 'lodash'
//require("babel-polyfill");

export class Styledux {

  constructor(store, activators) {
    this.store         = store
    this.subscriptions = {}
    this.registry      = { empty: null }
    this.accessors     = new Map()
    this.activators    = (activators) ? this.initActivators(activators) : new Map()
  }
  initActivators(activators) {
    const m = new Map()
    Object.entries(activators).forEach(kv => {
      m.set(kv[0], kv[1])
    })
    return m
  }

  registerActivator(path, activator) {
    this.activators.set(path, activator)
  }

  setListenerKeys(keys) {}

  setSlice(sliceName, val, path, listeners) {

    if (path) {
      _.set(this.store, `${sliceName}.${path}`, val)
    }
    else {
      this.store[sliceName] = { ...this.store[sliceName], ...val }
    }
    //_.throttle(() => Object.values(this.subscriptions).forEach(f => f()), 25)

    if (this.activators.has(`${sliceName}.${path}`)) {
      this.activators.get(`${sliceName}.${path}`)(val, this.setSlice.bind(this), this.store)
    }

    if (this.accessors.has(`${sliceName}.${path}`)) {
      this.accessors.get(`${sliceName}.${path}`).forEach(fn => fn())
    }
    else {
      Object.values(this.subscriptions).forEach(f => f())
    }
  }

  forceUpdate() {
    Object.values(this.subscriptions).forEach(f => f())
  }

  forceUpdateForPath(sliceName, path) {
    if (this.accessors.has(sliceName + '.' + path)) {
      this.accessors.get(sliceName + '.' + path).forEach(fn => fn())
    }
    else {
      console.log('No updaters for path: ', sliceName + '.' + path)
    }
  }

  setNestedSlice(sliceName, path, val) {
    Object.values(this.subscriptions).forEach(f => f())
  }


  getStore() {return this.store}

  subscribe(name, fn) {this.subscriptions[name] = fn}

  subscribeWithKey(key, fn) {
    if (this.accessors.has(key)) {
      const fns = this.accessors.get(key)
      fns.push(fn)
    }
    else {
      this.accessors.set(key, [fn])
    }

  }

  unsubscribe(name) {delete this.subscriptions[name] }


}

export default Styledux