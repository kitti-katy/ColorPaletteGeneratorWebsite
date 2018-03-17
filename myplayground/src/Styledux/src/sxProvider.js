import React, { createFactory, Component } from 'react'
import PropTypes from 'prop-types'


export const sxProvider = function (styleduxInst) {
  return (BaseComponent => {
    const factory = createFactory(BaseComponent)

    class StyleduxProvider extends Component {
      getChildContext = () => ({
        styleduxInst : { get: () => styleduxInst },
        styleduxStore: { get: () => styleduxInst.getStore() }
      })

      render() {
        return factory(this.props)
      }
    }

    StyleduxProvider.childContextTypes = {
      styleduxInst : PropTypes.object,
      styleduxStore: PropTypes.object
    }
    return StyleduxProvider
  })
}

export default sxProvider