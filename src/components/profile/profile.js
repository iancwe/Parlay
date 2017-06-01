import React from 'react'
import axios from 'axios'
import TeamList from '../teamlist/TeamList'
import FilteredTeam from '../filteredteam/FilteredTeam2'
import H2hCal from '../h2hcal/H2hCal'
import PieChart from '../piechart/PieChartH2H'
import { Grid, Col, Row, Alert } from 'react-bootstrap'

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
      team2Crest: '',
      chosenFixture: '',
      totH2h: 0,
      listH2h: [],
      teamDraw: 0,
      team1HomeWin: 0,
      team2HomeWin: 0,
      team2AwayWin: 0,
      team1AwayWin: 0,
      team1HomeGoal: 0,
      team2HomeGoal: 0,
      team2AwayGoal: 0,
      team1AwayGoal: 0,
      recWins: [],
      team1Code: '',
      team2Code: ''
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
      url: '//api.football-data.org/v1/competitions/' + data + '/teams',
      responseType: 'json',
      crossDomain: true
    })
    .then((response) => {
      let teamList = response.data.teams
      return teamList
    })
    .then((teamList) => {
      // console.log(teamList)
      this.setState({
        apiLeague: data,
        teams: teamList
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // selected team1 from List
  teamSelect (e) {
    e.preventDefault()
    // console.log(e.target.value, this.state.teams[e.target.value])
    let chosenTeamData = this.state.teams[e.target.value]
    this.setState({
      team1name: chosenTeamData.shortName,
      team1Crest: chosenTeamData.crestUrl,
      team1: chosenTeamData.name,
      team1Code: chosenTeamData.code
    })
  }

  // selected team2 from List
  teamSelect2 (e) {
    e.preventDefault()
    // console.log(e.target.value, this.state.teams[e.target.value])
    let chosenTeamData = this.state.teams[e.target.value]
    this.setState({
      team2name: chosenTeamData.shortName,
      team2Crest: chosenTeamData.crestUrl,
      team2: chosenTeamData.name,
      team2Code: chosenTeamData.code
    })
  }

  // plucking out fixtures from List
  h2hcal () {
    axios({
      headers: { 'X-Auth-Token': process.env.REACT_APP_footballAPI },
      method: 'get',
      url: '//api.football-data.org/v1/competitions/' + this.state.apiLeague + '/fixtures',
      responseType: 'json',
      crossDomain: true
    })
    .then((response) => {
      let fixtures = response.data.fixtures
      return fixtures
    })
    .then((fixtures) => {
      if (this.state.team1 === this.state.team2) {
        // <Alert bsStyle='danger'>
        //   Chosen Teams Can't Be the <strong>same</strong>
        // </Alert>
        alert(`Chosen teams cant be the same`)
      } else {
        fixtures = fixtures.filter((match) => {
          if (match.homeTeamName === this.state.team2 && match.awayTeamName === this.state.team1) {
            return match
          }
        })
        let fixtureUrl = fixtures[0]._links.self.href.replace('http', 'https')
        this.setState({
          chosenFixture: fixtureUrl
        })
      }
      this.headcal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  headcal () {
    axios({
      headers: { 'X-Auth-Token': process.env.REACT_APP_footballAPI },
      method: 'get',
      url: this.state.chosenFixture,
      responseType: 'json',
      crossDomain: true
    })
  .then((response) => {
    let h2h = response.data.head2head
    return h2h
  })
  .then((h2h) => {
    let team1HomeWin = 0
    let team2HomeWin = 0
    let team2AwayWin = 0
    let team1AwayWin = 0
    let team1HomeGoal = 0
    let team2HomeGoal = 0
    let team2AwayGoal = 0
    let team1AwayGoal = 0

    h2h.fixtures.forEach((matches) => {
      if (matches.homeTeamName === this.state.team1) {
        if (matches.result.goalsHomeTeam > matches.result.goalsAwayTeam) {
          team1HomeWin++
          team1HomeGoal += matches.result.goalsHomeTeam
          team2AwayGoal += matches.result.goalsAwayTeam
        } else if (matches.result.goalsHomeTeam < matches.result.goalsAwayTeam) {
          team2AwayWin++
          team1HomeGoal += matches.result.goalsHomeTeam
          team2AwayGoal += matches.result.goalsAwayTeam
        }
      } else if (matches.homeTeamName === this.state.team2) {
        if (matches.result.goalsHomeTeam > matches.result.goalsAwayTeam) {
          team2HomeWin++
          team2HomeGoal += matches.result.goalsHomeTeam
          team1AwayGoal += matches.result.goalsAwayTeam
        } else if (matches.result.goalsHomeTeam < matches.result.goalsAwayTeam) {
          team1AwayWin++
          team2HomeGoal += matches.result.goalsHomeTeam
          team1AwayGoal += matches.result.goalsAwayTeam
        }
      }
    })
    this.setState({
      totH2h: h2h.count,
      teamDraw: (h2h.count - team1HomeWin - team2HomeWin - team2AwayWin - team1AwayWin),
      team1HomeWin: team1HomeWin,
      team2HomeWin: team2HomeWin,
      team2AwayWin: team2AwayWin,
      team1AwayWin: team1AwayWin,
      team1HomeGoal: team1HomeGoal,
      team2HomeGoal: team2HomeGoal,
      team2AwayGoal: team2AwayGoal,
      team1AwayGoal: team1AwayGoal
    })
    return h2h
  })
  .then((h2h) => {
    console.log(h2h.fixtures)
    let recWins = []
    h2h.fixtures.forEach((matches) => {
      if (matches.result.goalsHomeTeam > matches.result.goalsAwayTeam) {
        recWins.push(matches.homeTeamName)
      } else if (matches.result.goalsHomeTeam < matches.result.goalsAwayTeam) {
        recWins.push(matches.awayTeamName)
      } else {
        recWins.push('Draw')
      }
    })
    console.log(recWins)
    this.setState({
      recWins: recWins
    })
  })
  .catch((err) => {
    console.log(err)
  })
  }

  render () {
    return (
      <Grid>
        <Row>
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
        </Row>
        <button onClick={() => this.h2hcal()}>Head2Head</button>
        <Row>
          {/* team1name is shortform */}
          <Col md={6}>
            <label>{this.state.team1name}</label>
            <TeamList teams={this.state.teams} handleChoice={(e) => this.teamSelect(e)} />
            <FilteredTeam h2hpic={this.state.team1Crest} />
          </Col>
          <Col md={6}>
            <label>{this.state.team2name}</label>
            <TeamList teams={this.state.teams} handleChoice={(e) => this.teamSelect2(e)} />
            <FilteredTeam h2hpic={this.state.team2Crest} />
          </Col>
        </Row>
        <Row>
          <PieChart team1Code={this.state.team1Code} team2Code={this.state.team2Code} teamDraw={this.state.teamDraw} team1HomeWin={this.state.team1HomeWin} team1AwayWin={this.state.team1AwayWin} team2HomeWin={this.state.team2HomeWin} team2AwayWin={this.state.team2AwayWin} />
        </Row>
        <Row>
          <H2hCal h2htotal={this.state.totH2h} tm1name={this.state.team1name} tm2name={this.state.team2name} teamDraw={this.state.teamDraw} team1HomeWin={this.state.team1HomeWin} team2HomeWin={this.state.team2HomeWin} team2AwayWin={this.state.team2AwayWin} team1AwayWin={this.state.team1AwayWin} team1HomeGoal={this.state.team1HomeGoal} team2HomeGoal={this.state.team2HomeGoal} team2AwayGoal={this.state.team2AwayGoal} team1AwayGoal={this.state.team1AwayGoal} recWins={this.state.recWins} />
        </Row>
      </Grid>
    )
  }

}

export default Profile
