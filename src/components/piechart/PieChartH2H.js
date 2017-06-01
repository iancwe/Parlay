import React from 'react'
import * as d3 from 'd3'

class PieChart extends React.Component {

  rendergraph () {
    var svg = d3.select('svg')
    var width = +svg.attr('width')
    var height = +svg.attr('height')
    var radius = Math.min(width, height) / 2
    var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    var color = d3.scaleOrdinal(['#ff5e5b', '#d8d8d8', '#ffffea', '#00cecb', '#ffed66', '#5e2bff'])

    var pie = d3.pie()
    .sort(null)
    .value(function (d) { return d.amount })

    var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)

    var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40)

    var data = [{
      'matchStat': 'DR',
      'amount': this.props.teamDraw
    },
      {
        'matchStat': this.props.team1Code + ' AW',
        'amount': this.props.team1AwayWin
      },
      {
        'matchStat': this.props.team1Code + ' HW',
        'amount': this.props.team1HomeWin
      },
      {
        'matchStat': this.props.team2Code + ' HW',
        'amount': this.props.team2HomeWin
      },
      {
        'matchStat': this.props.team2Code + ' AW',
        'amount': this.props.team2AwayWin
      }
    ]

    // check if the data has an 0 or value
    data = data.filter((cat) => {
      if (cat.amount > 0) {
        return cat
      }
    })

    var arc = g.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
      .attr('class', 'arc')

    arc.append('path')
      .attr('d', path)
      .attr('fill', function (d) { return color(d.data.matchStat) })

    arc.append('text')
      .attr('transform', function (d) { return 'translate(' + label.centroid(d) + ')' })
      .attr('dy', '0.35em')
      .attr('dy', '-0.5em')
      .text(function (d) { return d.data.matchStat })
  }
  // chain reaction update for the graph
  componentDidUpdate () {
    this.rendergraph()
  }

  render () {
    return (
      <div>

        <svg width='350' height='350' />
      </div>
    )
  }

}

export default PieChart
