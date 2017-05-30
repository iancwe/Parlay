import React from 'react'
import axios from 'axios'
import PieChart from '../piechart/PieChart'

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
      teamName: null
    }
  }

  // calculation
  calculation () {
    // console.log(this.props.datatext)
    axios({
      headers: { 'X-Auth-Token': process.env.REACT_APP_footballAPI },
      method: 'get',
      url: this.props.datatext,
      responseType: 'json',
      crossDomain: true
    })
    .then((response) => {
      let homeGames = 0
      let homeWins = 0
      let homeLoss = 0
      let awayWins = 0
      let awayLoss = 0
      let selectedresult = response.data.fixtures
      let totalGames = selectedresult.length
      console.log(selectedresult)
      selectedresult.forEach((matches) => {
        // homegames only
        if (matches.homeTeamName === this.props.name) {
          homeGames++
          if (matches.result.goalsHomeTeam > matches.result.goalsAwayTeam) {
            homeWins++
          } else if (matches.result.goalsHomeTeam < matches.result.goalsAwayTeam) {
            homeLoss++
          }
        } else {
          // awaygames only
          if (matches.result.goalsAwayTeam > matches.result.goalsHomeTeam) {
            awayWins++
          } else if (matches.result.goalsAwayTeam < matches.result.goalsHomeTeam) {
            awayLoss++
          }
        }
      })
      console.log('this is the amount of homeGames ' + homeGames)
      console.log('this is the amount of awayGames ' + (totalGames - homeGames))
      console.log('homewins ' + homeWins)
      console.log('homeloss ' + homeLoss)
      // console.log((homeGames - homeWins - homeLoss))
      console.log('awayWins ' + awayWins)
      console.log('awayLoss ' + awayLoss)
      // console.log((totalGames - homeGames) - awayWins - awayLoss)
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
        teamName: this.props.name
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
        <h1>DataText</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        {/* <button onClick={() => this.calculation()}>Click Me</button> */}
        <p>Total home games {this.state.homeGames}</p>
        <p>Home Draws {this.state.homeDraw}</p>
        <p>Away Draws {this.state.awayDraw}</p>
        <table>
          <thead>
            <tr>
              <th>Return of Investment (ROI)</th>
              <th>5%</th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }

}

export default DataText
