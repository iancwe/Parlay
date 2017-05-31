import React from 'react'
import axios from 'axios'
import TeamList from '../teamlist/TeamList'
import FilteredTeam from '../filteredteam/FilteredTeam'
import DataText from '../datatext/DataText'
import { Grid, Col } from 'react-bootstrap'

class Homedogs extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      apiLeague: '426',
      teams: [],
      team: <FilteredTeam img={'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg'} />,
      datatext: 'http://api.football-data.org/v1/teams/65/fixtures',
      teamName: 'Manchester City FC'
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

  // selected team from List
  teamSelect (e) {
    e.preventDefault()
    console.log(e.target.value, this.state.teams[e.target.value])
    let chosenTeamData = this.state.teams[e.target.value]
    this.setState({
      team: <FilteredTeam img={chosenTeamData.crestUrl} alt={chosenTeamData.code} />,
      datatext: chosenTeamData._links.fixtures.href,
      teamName: chosenTeamData.name
    })
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

  componentDidMount () {
    this.display('426')
  }

  render () {
    return (
      // div for the main layout component
      <Grid>
        <h1>Matches Filter</h1>
        {/* container for result module component */}
        <Col xs={4} md={4}>
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
        </Col>
        <Col xs={4} md={4}>
          {this.state.team}
        </Col>
        <DataText datatext={this.state.datatext} name={this.state.teamName} update={false} />
      </Grid>
    )
  }

}

export default Homedogs
