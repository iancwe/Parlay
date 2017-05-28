import React from 'react'

const TeamList = (props) =>
(
  <select onChange={props.handleChoice}>
    {props.teams.map((team, index) => {
      return <option key={index} value={team.crestUrl}>{team.name}</option>
    })}
  </select>
)

export default TeamList
