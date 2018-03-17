import React, { createFactory, Component, Children, createElement } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'


  const sxConnect = (sliceName, slicePathsToListenTo, activatorsToListenTo) => BaseComponent => {
  const factory       = createFactory(BaseComponent)
  const componentName = (BaseComponent.type && BaseComponent.type.name) ? BaseComponent.type.name : BaseComponent.name

  class StyleduxConnect extends Component {
    componentDidMount() {

      if (slicePathsToListenTo) {
        slicePathsToListenTo.forEach(path => {
          console.log('withKey: ', path)
          this.context.styleduxInst.get().subscribeWithKey(path, () => this.forceUpdate())
        })
      }
      else {
        this.context.styleduxInst.get().subscribe("" + sliceName + factory.type.name, () => this.forceUpdate())
        console.log('bad.')
      }

      //if(activatorsToListenTo){
      //  activatorsToListenTo.forEach(activator => {
      //    console.log('registering activator: ', activator)
      //
      //
      //  })
      //}
    }

    componentWillUnmount() {
      this.context.styleduxInst.get().unsubscribe(factory.type.name)
    }

    addSlicePathToListenTo(path) {
      console.log('withKey: ', path)
      this.context.styleduxInst.get().subscribeWithKey(path, () => this.forceUpdate())
    }

    getSlice(sliceName, styleduxInst) {
      const handler     = {
        get(sliceTarget, key, receiver) {
          if (key.includes('.')) {
            const path = sliceName + '.' + key
            const keys = key.split('.')
            let item   = sliceTarget(styleduxInst.getStore())[sliceName][keys[0]]
            for (let i = 1; i < keys.length; i++) {
              item = item[keys[i]]
            }

            return (item !== null) ? item : null

          }
          else {

            const item = (key === '_') ? sliceTarget(styleduxInst.getStore())[sliceName] : sliceTarget(styleduxInst.getStore())[sliceName][key]
            return (item !== null) ? item : null
          }
        },
        set(sliceTarget, key, value) {
          if (key.includes('.')) {
            const path = sliceName + "." + key
            styleduxInst.setSlice(sliceName, value)
            return true
          }
          else {

            //styleduxInst.setSlice(sliceName, { [key]: value }, key)
            styleduxInst.setSlice(sliceName, value, key)
            return true
          }
        },

      }
      const sliceTarget = (store) => ({
        [sliceName]: {
          setSlice          : (path, val) => {
            styleduxInst.setSlice(sliceName, val, path)
          },
          forceUpdate       : () => {
            styleduxInst.forceUpdate()
          },
          forceUpdateForPath: (path) => {
            styleduxInst.forceUpdateForPath(sliceName, path)
          },
          subscribeWithKey  : (key) => {
            styleduxInst.subscribeWithKey(key, this.forceUpdate.bind(this))
          },
          ...store[sliceName]
        }
      })
      return new Proxy(sliceTarget, handler)
    }

    getSlices(sliceNames, styleduxInst) {
      if (sliceNames === null) {
        sliceNames = Object.keys(styleduxInst.getStore())
      }
      return (
        sliceNames.map(sliceName => {
          //[sliceName]: {
          //  setSlice: function (val) {styleduxInst.setSlice(sliceName, val)}, ...this.context.styleduxInst.get().store[sliceName]
          //}
          return ({ [sliceName]: this.getSlice(sliceName, styleduxInst) })
        }).reduce((acc, item) => {
          let result = {}
          Object.entries(item).forEach(kv => {
            result = { ...acc, ...{ [kv[0]]: kv[1] } }

          })
          return result
        }, {})
      )

    }

    render() {
      const styleduxInst = this.context.styleduxInst.get()

      const slices = Array.isArray(sliceName) ?
        this.getSlices(sliceName, styleduxInst) :
        (sliceName == null) ?
          this.getSlices(null, styleduxInst)
          :
          { [sliceName]: this.getSlice(sliceName, styleduxInst) }

      //styleduxInst.subscribe(factory.type.name, () => this.forceUpdate())
      const props = { ...this.props, ...slices }

      return (
        //createElement(componentName, props))
        factory(Object.assign({}, this.props, slices, { addSlicePathToListenTo: (path) => this.addSlicePathToListenTo.bind(this)(path) })))
    }
  }

  StyleduxConnect.contextTypes = {
    styleduxInst : PropTypes.object,
    styleduxStore: PropTypes.object
  }

  return StyleduxConnect
}

export default sxConnect