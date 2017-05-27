import React from 'react'

const CrestGraph = (props) =>
(
  props.teams.map((team, index) => {
    return <option key={index}>{team.name}</option>
  })
)

export default CrestGraph
