import React from 'react'
import axios from 'axios'
import TeamList from '../teamlist/TeamList'

class Homedogs extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      apiLeague: '426',
      teamcrest: ' ',
      teams: []
    }
  }

  // Function to be run when you select EPL
  eng () {
    this.display('426')
  }

  // Function to be run when you select Laliga
  spain () {
    console.log('laliga Chosen')
    this.display('436')
  }

  // Function to be run when you select Bundesliga
  german () {
    console.log('Bundesliga Chosen')
    this.display('430')
  }

  display (data) {
    axios({
      headers: { 'X-Auth-Token': process.env.REACT_APP_footballAPI },
      method: 'get',
      url: 'http://api.football-data.org/v1/soccerseasons/' + data + '/teams',
      responseType: 'json',
      crossDomain: true
    })
    .then((response) => {
      let teamList = response.data.teams
      return teamList
    })
    .then((teamList) => {
      console.log('teamList is 1', teamList)
      this.setState({
        apiLeague: data,
        teams: teamList
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.display('426')
  }

  render () {
    return (
      // div for the main layout component
      <div>
        <h3>Matches Filter</h3>
        {/* container for result module component */}
        <div>
          {/* container for the league choices */}
          <div>
            <label>Leagues</label>
            <form>
              <label>
                <input type='radio' name='league' value='epl' onClick={() => this.eng()} /> English
            </label>
              <label>
                <input type='radio' name='league' value='laliga' onClick={() => this.spain()} /> Spanish
            </label>
              <label>
                <input type='radio' name='league' value='germ' onClick={() => this.german()} /> German
            </label>
              <label> Team:
              <TeamList teams={this.state.teams} />
              </label>
            </form>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <table>
            <thead>
              <tr>
                <th>Return of Investment (ROI)</th>
                <th>5%</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    )
  }

}

export default Homedogs
