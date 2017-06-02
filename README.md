# Datums?

The ball is round, the game lasts ninety minutes, and everything else is just theory. -**Sepp Herberger**

Well, most people who are avid football fans might have heard of this quote before. I believe in it to a certain extend...however statistic and history always comes back and bite us in the bum.
So lets hope with mathematics on our side we can foretell the games and prove that saying a little wrong.

![MATH TIME](https://media4.giphy.com/media/DHqth0hVQoIzS/giphy.gif)

I always had a love-hate relationship with football. It always seems when I am unable to watch my favorite team play, they do fantastically well. However when I do stay up in the wee hours of the morning to watch a game that I presume would be cakewalk. I get horridly mistaken. And the days of me trawling through the internet looking for football statistic and trying to predict a game is over with this app. (**I Hope**) So this app then takes the previous season data and renders it into easier bite size pieces to digest.

## Crunch Some Numbers!
Come on over to try out [Datums?](https://datumfut.herokuapp.com/)


## Getting Started
Want to help out expanding this application?
1. Head on over to my [github](https://github.com/iancwe/parlay) (Parlay was a place holder, pls dun leave)
2. Fork it or clone it to your computer/github
3. Open the repository in you editor of choice and do not forget to `npm install` the node modules for the project.
4.  There is an `.env` file that you would have to create on your own however there is  sample file in the repository as well.
5.  Go wild. All help is mucho appreciated. :tada:


## Development
This is my first time trying out react and I must say it's pretty interesting. It was pretty tough for me to pick it up at first and understand how it work. Dang lifecycles and what not.

![REACT HOW?!](https://media.giphy.com/media/s8pbe9rP4j1yU/giphy.gif)

However since its mostly a front-end framework, I would need an API endpoint to fetch my footbal data from. I used *axios* quite a bit as compared to vanilla jQuery and their AJAX call. This was because I felt that axios was more convenient in a sense that there was an easier promises system and that I could transform some of my data before my request which I can change too.

So in my project I did not really need a back-end server as I did not need any database storing any user information or any football information. Thus being mostly a react app. I however did wanted to start off with a backend which could run ```python``` scripts to help predict which team might win. But in the end I decided to change my **M** inimum **V** iable **P** roduct to something along the lines of data visualization and making it easier to read.

Once I figured out on my MVP, I started drawing wireframe for my application. And I strongly advise that if anyone is planning on creating an react application, planning and drawing a wireframe is godsend. This is due to react having a unidirectional flow of state? I guess it means that the parent of the child component is the only component able to set the state and pass it down to the children, but the children are not able to set the state and pass it back to the parent component.

![Wireframe of website](https://i.imgur.com/JzRDTH1.jpg)

The first few wireframes that I drew consisted of a landing page with a log in and sign up button. But since my project was more towards letting the public have access to these football stats and that there was not much prediction algorithm it was fine not having an authentication system. The 2nd column of wireframes onwards very rough draft on how my main page and head to head pages would look like. But like I mentioned before having a very precise and accurate wireframe was of utmost importance when it comes to creating a react app. So I was still stuck on how to create my components and which should be a parent or child component.

![Wireframes chapter 2](https://i.imgur.com/xAdSCyj.jpg)

I managed to cement down my main page and how it would look like which what components rendered in it. Thus able to breakdown each page furthermore and decide which should be the child component and what could be its own separate component. From this picture you are able to tell that  I came up with the whole page look first, then broke it down into the main layout component that has the Navbar. 2nd component to be rendered would be the result board, which consisted of a set of buttons to toggle between the leagues, picture of the chose team crest, a piechart graph and a table with data in it.

![H2H wireframe](https://i.imgur.com/i3Raghb.jpg)

After completing this main page, I decided that it was a little too underwhelming and simple. Thus I thought creating another page with head to head history of the two chosen team would be good as it further break down upcoming fixtures/games. So you are able to make better ~~bets~~... I mean predictions. With all these more accurate wireframe, building a react app does not seem as daunting anymore.

![AWWW YISS](https://media3.giphy.com/media/gVoBC0SuaHStq/giphy.gif)

## Point of Interest Workflow

 1. Creating a proper state and prop flow for the component that would not interfere with the components lifecycles

 2. Manipulating JSON data to get the calculations and figures I needed.

 3. And another target I had was to try to make each component as isolated as possible. Thus just passing only props to each components and by having more building blocks. I am able to reuse these components again and it is easier to fix/code as well.

 4. Integrate more graphs and chart into the application since it's a data visualization website. However looking for graphs that work on react has been pretty tough. Still looking out for ```radar chart```

 5. implementation of a quadrant graph to easy display where teams in a specific league fall under. From rich to poorest and weakest to strongest team.

## Notable Milestones
During the process of creating this application there were a few notable Milestones that I was pretty interesting, as I was new to creating a react app.

The first biggest issue as stated at the start of the README was initially comprehending how does component work and their lifecycles. So creating a parent component which is then populated by child component and so on if you have multiple children.

| parent |
|--------|
| child  |
| child  |

However the biggest issue arises when you have one child (middle) that is sandwiched between another two components and if that middle child has a set state which then affects its child component ```componentDidUpdate ``` script, which will update the states and cause an render therefore creating a loop.  

```
shouldComponentUpdate (nextProps, nextState) {
  if (nextProps.name !== this.props.name || nextState.teamName !== this.state.teamName) {
    return true
  }
  return false
}
```
Therefore, using the function ```shouldComponentUpdate``` which returns a boolean value, which in turns then either allow the component to update or not. In this case if the current prop name is the not the same as the newly updated prop name, then it would return true. Meaning that since it is a different set of data, the code will render itself to print the current data.

Second biggest issue that I have faced is that of modeling a graph in react or Javascript. There are quite a handful of chart npm such as 'chart.js, react-vis and D3' In a way using D3 for small sums of data might seem like overkill. And again like the component, initially learning how to use D3 is pretty daunting and I would not say that I am not decent at it yet.

```
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

render () {
  return (
    <div>

      <svg width='300' height='300' />
    </div>
  )
}
}
```
To be truthful, I kinda just scratch the surface of D3 but I think the path of the the piechart is changed whenever a new data is inputed and is redrawn each render. However if there was anything I was going to change or add to the piechart would be that of transition to make it more interactive.

Lastly would be the process of fetching API and how does promises work. Which works hand in hand with the ```.then()``` and ```.catch()```  Just understanding how does a promise work is pretty interesting and the best example I came across would that be of a burger place.

```

  let datatextUrl = this.props.datatext.replace('http', 'https')
  axios({
    headers: { 'X-Auth-Token': process.env.REACT_APP_footballAPI },
    method: 'get',
    url: datatextUrl,
    responseType: 'json',
    crossDomain: true
  })
  .then((response) => {
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
```
So as show above after fetching the data from the API and only if the promise of receiving that data is fulfilled then only do we go on to the ```then()``` function but if there was some error in fetching then data from the API the promise would not be resolved and thus just straight to ```.catch()``` therefore I am able to manipulate my data in that initial API call and render it just one then call out another function.

![Hey thats pretty good](https://media4.giphy.com/media/xThuW2Vrx2ruC42Dcc/giphy.gif)

## Deployment
- [Heroku](https://dashboard.heroku.com/)

## Built With
- jQuery
- React
- Javascript
- CSS
- HTML
- BootStrap
- D3
- react-router
- Magic

![witchcraft](https://68.media.tumblr.com/f5892dd6042256098268e36fcf237dc7/tumblr_o485qw8Hke1qjmnzro1_1280.gif)

## Bugs :bug:
- Did not managed to do much or any animation on my graphs and components
- Did not spend enough time on CSS for the application
- Piechart text is hidden behind piechart sections at times

## Further Development
- Project still Work in Progress
- Add in more API for different sports
- Add in more graphs
- Add in own prediction algorithms
- MOAR CSS

![SO MUCH TO BE DONE?!](https://media2.giphy.com/media/dbtDDSvWErdf2/giphy.gif)

## Resources  

- Stack Overflow
- D3 Documentation
- React Bootstrap Documentation

## Author
[Ian Chong](https://github.com/iancwe)

## Acknowledgments

- [Yisheng](https://github.com/yisheng90)
- [Sharona](https://github.com/sharona1610)
- [Prima](https://github.com/primaulia)
- [Raymond](https://github.com/ijmeister)
- [Shirong](https://github.com/shirongfoo) (for the beachball)

###### Its Been A great Ride! Onwards and Upwards
![Its just beginning](https://media.giphy.com/media/67vqGUSuBRm9i/giphy.gif)
