import React from 'react'
import axios from 'axios'
import TeamList from '../teamlist/TeamList'
import FilteredTeam from '../filteredteam/FilteredTeam'
import DataText from '../datatext/DataText'
import { Grid, Col } from 'react-bootstrap'
import LeagPic from '../leagpic/LeagPic'

class Homedogs extends React.Component {

  constructor (props) {
    console.log('test')
    super(props)
    this.state = {
      apiLeague: '426',
      teams: [],
      team: <FilteredTeam img={'//upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg'} />,
      datatext: '//api.football-data.org/v1/teams/65/fixtures',
      teamName: 'Manchester City FC',
      leaguePic: '//www.thesportsdb.com/images/media/league/logo/qrsvwu1467456743.png'
    }
  }

  // Function to be run when you select EPL
  eng () {
    this.display('426')
    this.setState({
      leaguePic: '//www.thesportsdb.com/images/media/league/logo/qrsvwu1467456743.png'
    })
  }

  // Function to be run when you select Laliga
  spain () {
    console.log('laliga Chosen')
    this.display('436')
    this.setState({
      leaguePic: '//files.laliga.es/seccion_logos/laliga-v-600x600.png'
    })
  }

  // Function to be run when you select Bundesliga
  german () {
    console.log('Bundesliga Chosen')
    this.display('430')
    this.setState({
      leaguePic: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/695px-Bundesliga_logo_%282017%29.svg.png'
    })
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
      url: '//api.football-data.org/v1/competitions/' + data + '/teams',
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
        <h1>Team Filter</h1>
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
          <LeagPic leaguePic={this.state.leaguePic} />
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
