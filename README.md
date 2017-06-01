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

![Wireframe of website]()

The first few wireframes that I drew consisted of a landing page with a log in and sign up button. But since my project was more towards letting the public have access to these football stats and that there was not much prediction algorithm it was fine not having an authentication system. The 2nd column of wireframes onwards very rough draft on how my main page and head to head pages would look like. But like I mentioned before having a very precise and accurate wireframe was of utmost importance when it comes to creating a react app. So I was still stuck on how to create my components and which should be a parent or child component.

![Wireframes chapter 2]()

I managed to cement down my main page and how it would look like which what components rendered in it. Thus able to breakdown each page furthermore and decide which should be the child component and what could be its own separate component. From this picture you are able to tell that  I came up with the whole page look first, then broke it down into the main layout component that has the Navbar. 2nd component to be rendered would be the result board, which consisted of a set of buttons to toggle between the leagues, picture of the chose team crest, a piechart graph and a table with data in it.

![H2H wireframe]()

After completing this main page, I decided that it was a little too underwhelming and simple. Thus I thought creating another page with head to head history of the two chosen team would be good as it further break down upcoming fixtures/games. So you are able to make better ~~bets~~... I mean predictions. 
