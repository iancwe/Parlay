import React from 'react'

const TeamList = (props) =>
(
  <select>
    {props.teams.map((team, index) => {
      return <option key={index}>{team.name}</option>
    })}
  </select>
)

export default TeamList
