import React from 'react'

const TeamList = (props) =>
(
  <select onChange={props.handleChoice}>
    <option disabled selected value>Select a Team</option>
    {props.teams.map((team, index) => {
      return <option key={index} value={index}>{team.name}</option>
    })}
  </select>
)

export default TeamList
