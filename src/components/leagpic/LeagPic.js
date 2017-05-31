import React from 'react'

class LeagPic extends React.Component {
  render () {
    return (
      <div>
        <img src={this.props.leaguePic} height='250' width='350' />
      </div>
    )
  }

}

export default LeagPic
