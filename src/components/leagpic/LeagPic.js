import React from 'react'

class LeagPic extends React.Component {
  render () {
    return (
      <div>
        <img src={this.props.leaguePic} alt={this.props.leaguePic} height='240' width='350' />
      </div>
    )
  }

}

export default LeagPic
