import React from 'react'
import axios from 'axios'
import PieChart from '../piechart/PieChart'
import { Table } from 'react-bootstrap'

class DataText extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      homeGames: 0,
      homeWins: 0,
      homeLoss: 0,
      homeDraw: 0,
      awayGames: 0,
      awayWins: 0,
      awayLoss: 0,
      awayDraw: 0,
      totalGames: 0,
      homeGoals: 0,
      homeAgainst: 0,
      awayGoals: 0,
      awayAgainst: 0,
      teamName: null
    }
  }

  // calculation
  calculation () {
    // console.log(this.props.datatext)
    let datatextUrl = this.props.datatext.replace('http', 'https')
    // datatext_newurl = datatext_newurl.replace('soccerseasons', 'competition')
    axios({
      headers: { 'X-Auth-Token': process.env.REACT_APP_footballAPI },
      method: 'get',
      url: datatextUrl,
      responseType: 'json',
      crossDomain: true
    })
    .then((response) => {
      let homeGames = 0
      let homeWins = 0
      let homeLoss = 0
      let awayWins = 0
      let awayLoss = 0
      let homeGoals = 0
      let homeAgainst = 0
      let awayGoals = 0
      let awayAgainst = 0
      let selectedresult = response.data.fixtures
      let totalGames = selectedresult.length
      console.log(selectedresult)
      selectedresult.forEach((matches) => {
        // homegames only
        if (matches.homeTeamName === this.props.name) {
          homeGames++
          // homegame win
          if (matches.result.goalsHomeTeam > matches.result.goalsAwayTeam) {
            homeGoals += matches.result.goalsHomeTeam
            homeAgainst += matches.result.goalsAwayTeam
            homeWins++
            // homegame loss
          } else if (matches.result.goalsHomeTeam < matches.result.goalsAwayTeam) {
            homeGoals += matches.result.goalsHomeTeam
            homeAgainst += matches.result.goalsAwayTeam
            homeLoss++
          }
        } else {
          // awaygames only
          if (matches.result.goalsAwayTeam > matches.result.goalsHomeTeam) {
            // awaygame win
            awayGoals += matches.result.goalsAwayTeam
            awayAgainst += matches.result.goalsHomeTeam
            awayWins++
          } else if (matches.result.goalsAwayTeam < matches.result.goalsHomeTeam) {
            // awaygame loss
            awayGoals += matches.result.goalsAwayTeam
            awayAgainst += matches.result.goalsHomeTeam
            awayLoss++
          }
        }
      })
      // console.log('this is the amount of homeGames ' + homeGames)
      // console.log('this is the amount of awayGames ' + (totalGames - homeGames))
      this.setState({
        homeGames: homeGames,
        homeWins: homeWins,
        homeLoss: homeLoss,
        homeDraw: (homeGames - homeWins - homeLoss),
        awayGames: (totalGames - homeGames),
        awayWins: awayWins,
        awayLoss: awayLoss,
        awayDraw: ((totalGames - homeGames) - awayWins - awayLoss),
        totalGames: totalGames,
        teamName: this.props.name,
        homeGoals: homeGoals,
        homeAgainst: homeAgainst,
        awayGoals: awayGoals,
        awayAgainst: awayAgainst
      })
      // return selectedresult
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.calculation()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.name !== this.props.name || nextState.teamName !== this.state.teamName) {
      return true
    }
    return false
  }

  // chain reaction update for the calculation
  componentDidUpdate () {
    this.calculation()
  }

  render () {
    return (
      <div>
        <PieChart graphData={this.state} />
        <h1>Latest Season Analysis</h1>
        <Table responsive condensed>
          <tbody>
            <tr>
              <th>Home Wins(HW): {this.state.homeWins}</th>
              <th>Home Draw(HD): {this.state.homeDraw}</th>
              <th>Away Wins(AW): {this.state.awayWins}</th>
              <th>Home Goals(HG): {this.state.homeGoals}</th>
              <th>Away Goals(AG): {this.state.awayGoals}</th>
            </tr>
            <tr>
              <th>Home Loss(HL): {this.state.homeLoss}</th>
              <th>Away Draw(AD): {this.state.awayDraw}</th>
              <th>Away Loss(AL): {this.state.awayLoss}</th>
              <th>Home Against(HA): {this.state.homeAgainst}</th>
              <th>Away Against(AA): {this.state.awayAgainst}</th>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

}

export default DataText
