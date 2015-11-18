const React = require('react')
const ReactDOM = require('react-dom')
const ColorPicker = require('react-color')

const Tint = React.createClass({

  displayName: 'Tint',

  render() {
    return (
      <ColorPicker
        id='foo'
        onChange={this.handleChange}
        type='sketch'
      />
    )
  }
})

ReactDOM.render(<Tint />, document.getElementById('picker'))
