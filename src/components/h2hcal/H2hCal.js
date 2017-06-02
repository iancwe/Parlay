import React from 'react'
import { Table, Grid, Row } from 'react-bootstrap'

class H2hCal extends React.Component {
  render () {
    if (this.props.recWins.length === 0) {
      return <div />
    }
    return (
      <Grid id='showhide'>
        <Row>
          <h1>Past Encounters</h1>
        </Row>
        <Row>
          <h4>Total Games: {this.props.h2htotal}</h4>
          <Table responsive condensed bordered >
            <tbody>
              <tr>
                <th>{this.props.tm1name} Home Wins</th>
                <th>{this.props.tm1name} Away Wins</th>
                <th>Games Draw</th>
                <th>{this.props.tm2name} Home Wins</th>
                <th>{this.props.tm2name} Away Wins</th>
              </tr>
              <tr>
                <th>{this.props.team1HomeWin}</th>
                <th>{this.props.team1AwayWin}</th>
                <th>{this.props.teamDraw}</th>
                <th>{this.props.team2HomeWin}</th>
                <th>{this.props.team2AwayWin}</th>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <h4>Head to Head Goals</h4>
          <Table responsive condensed bordered>
            <tbody>
              <tr>
                <th>{this.props.tm1name} Home Goals</th>
                <th>{this.props.tm1name} Away Goals</th>
                <th>{this.props.tm2name} Home Goals</th>
                <th>{this.props.tm2name} Away Goals</th>
              </tr>
              <tr>
                <th>{this.props.team1HomeGoal}</th>
                <th>{this.props.team1AwayGoal}</th>
                <th>{this.props.team2HomeGoal}</th>
                <th>{this.props.team2AwayGoal}</th>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <h4>Recent Matches</h4>
          <Table responsive condensed bordered>
            <tbody>
              <tr>
                <th colSpan='5'>Latest to the left</th>
              </tr>
              <tr>
                <td>{this.props.recWins[0]}</td>
                <td>{this.props.recWins[1]}</td>
                <td>{this.props.recWins[2]}</td>
                <td>{this.props.recWins[3]}</td>
                <td>{this.props.recWins[4]}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Grid>
    )
  }

}

export default H2hCal
