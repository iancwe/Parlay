import React from 'react'
import * as d3 from 'd3'

class PieChart extends React.Component {

  rendergraph () {
    var svg = d3.select('svg')
    var width = +svg.attr('width')
    var height = +svg.attr('height')
    var radius = Math.min(width, height) / 2
    var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    var color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'])

    var pie = d3.pie()
    .sort(null)
    .value(function (d) { return d.population })

    var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)

    var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40)

    var data = JSON.parse(`[
      {
        "age": "<5",
        "population": 2704659
      },
      {
        "age": "5-13",
        "population": 4499890
      },
      {
        "age": "14-17",
        "population": 2159981
      },
      {
        "age": "18-24",
        "population": 3853788
      },
      {
        "age": "25-44",
        "population": 14106543
      },
      {
        "age": "45-64",
        "population": 8819342
      },
      {
        "age": "≥65",
        "population": 612463
      }
    ]`)

    console.log(data)

    var arc = g.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
      .attr('class', 'arc')

    arc.append('path')
      .attr('d', path)
      .attr('fill', function (d) { return color(d.data.age) })

    arc.append('text')
      .attr('transform', function (d) { return 'translate(' + label.centroid(d) + ')' })
      .attr('dy', '0.35em')
      .text(function (d) { return d.data.age })
    // })
  }

  render () {
    return (
      <div>
        <button onClick={() => this.rendergraph()}>Graph</button>
        <svg width='300' height='300' />
      </div>
    )
  }

}

export default PieChart
