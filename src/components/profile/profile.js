import React from 'react'
import axios from 'axios'
import TeamList from '../teamlist/TeamList'
import FilteredTeam from '../filteredteam/FilteredTeam2'

class Profile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      apiLeague: ' ',
      teams: [],
      team1: '',
      team2: '',
      team1name: 'Team A',
      team2name: 'Team B',
      team1Crest: '',
      team2Crest: ''
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
    this.setState({
      team1name: chosenTeamData.shortName,
      team1Crest: chosenTeamData.crestUrl
    })
  }

  // selected team from List
  teamSelect2 (e) {
    e.preventDefault()
    console.log(e.target.value, this.state.teams[e.target.value])
    let chosenTeamData = this.state.teams[e.target.value]
    this.setState({
      team2name: chosenTeamData.shortName,
      team2Crest: chosenTeamData.crestUrl

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
        <label>{this.state.team1name}</label>
        <TeamList teams={this.state.teams} handleChoice={(e) => this.teamSelect(e)} />
        <FilteredTeam h2hpic={this.state.team1Crest} />
        <label>{this.state.team2name}</label>
        <TeamList teams={this.state.teams} handleChoice={(e) => this.teamSelect2(e)} />
        <FilteredTeam h2hpic={this.state.team2Crest} />
      </div>
    )
  }

}

export default Profile
