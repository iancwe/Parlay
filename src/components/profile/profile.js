import React from 'react'
import axios from 'axios'
import TeamList from '../teamlist/TeamList'

class Profile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      apiLeague: ' ',
      teams: [],
      team1: '',
      team2: ''
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

  // Function to run the chosen league
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
      console.log(teamList)
      this.setState({
        apiLeague: data,
        teams: teamList
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // selected team from List
  teamSelect (e) {
    e.preventDefault()
    console.log(e.target.value, this.state.teams[e.target.value])
    let chosenTeamData = this.state.teams[e.target.value]
    console.log('team1 ' + chosenTeamData.name)
    this.setState({
      team1: chosenTeamData.name
    })
  }

  // selected team from List
  teamSelect2 (e) {
    e.preventDefault()
    console.log(e.target.value, this.state.teams[e.target.value])
    let chosenTeamData = this.state.teams[e.target.value]
    console.log('team2 ' + chosenTeamData.name)
    this.setState({
      team2: chosenTeamData.name
    })
  }

  render () {
    return (
      <div>
        <h1>Head to Head</h1>
        <h4>Leagues</h4>
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
        </form>
        <TeamList teams={this.state.teams} handleChoice={(e) => this.teamSelect(e)} />
        <TeamList teams={this.state.teams} handleChoice={(e) => this.teamSelect2(e)} />
      </div>
    )
  }

}

export default Profile
