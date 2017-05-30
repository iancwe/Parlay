import React from 'react'
import * as d3 from 'd3'

class PieChart extends React.Component {

  rendergraph () {
    var svg = d3.select('svg')
    var width = +svg.attr('width')
    var height = +svg.attr('height')
    var radius = Math.min(width, height) / 2
    var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    var color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c'])

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
      'winloss': 'HW',
      'amount': this.props.graphData.homeWins
    },
      {
        'winloss': 'HL',
        'amount': this.props.graphData.homeLoss
      },
      {
        'winloss': 'HD',
        'amount': this.props.graphData.homeDraw
      },
      {
        'winloss': 'AW',
        'amount': this.props.graphData.awayWins
      },
      {
        'winloss': 'AL',
        'amount': this.props.graphData.awayLoss
      },
      {
        'winloss': 'AD',
        'amount': this.props.graphData.awayDraw
      }
    ]

    console.log(data)
    // check if the data has an 0 or value
    data = data.filter((cat) => {
      if (cat.amount > 0) {
        return cat
      }
    })

    console.log(data)

    var arc = g.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
      .attr('class', 'arc')

    arc.append('path')
      .attr('d', path)
      .attr('fill', function (d) { return color(d.data.winloss) })

    arc.append('text')
      .attr('transform', function (d) { return 'translate(' + label.centroid(d) + ')' })
      .attr('dy', '0.35em')
      .text(function (d) { return d.data.winloss })
  }
  // chain reaction update for the graph
  componentDidUpdate () {
    this.rendergraph()
  }

  render () {
    return (
      <div>

        <svg width='300' height='300' />
      </div>
    )
  }

}

export default PieChart
