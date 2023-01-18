# NineDotsFarazRahman

Before I answer the questions here are some notes on running the project:
- A new factor value was created called fractionalDistanceDotFromSide. This represents the distance of the dot from the nearest side of the square the game is placed within. In case the factor does not automatically pop up you can import it with the FinalEmpiricaConfig.yaml file. This setup has two settings for the factor - sparse and dense - which can be best described visually below:

Sparse:

<img width="642" alt="Screen Shot 2023-01-17 at 7 29 10 PM" src="https://user-images.githubusercontent.com/68860714/213052136-36af2b30-b216-4270-a184-9b80d9c0893d.png">


Dense:

<img width="492" alt="Screen Shot 2023-01-17 at 7 28 42 PM" src="https://user-images.githubusercontent.com/68860714/213051944-c06a8103-d9d0-4ec7-905f-8c1777b6a50e.png">
___________________________________________________________________________________




a) About how many hours did it take for you to implement this task?

- I think that I spent about 20 hours implementing this task. The vast majority of the time was spent reading over documentation for React/JS to learn the syntax and debug. 

- If I were to redo the task, or complete another task similar in size, I think that it would only take me significantly less time as I have a much greater understanding of the React framework and JS language now.

b) What was your biggest challenge in implementing this task?

- Not knowing HTML/JS was a the biggest hurdle. The React/Meteor/Empirica framework was conceptually easy to understand from a systems engineering point of view, but I ended up spending a significant amount of time debugging because of my lack of familiarity with the syntax.


c) What was a key design decision you made for this implementation?

1) Resizeable spacing between border and the nine dots. I designed the ninedots such that their spacing away from the edges of the box in which it sits can be adjusted.

  - If the spacing is large then the nine dots will all be close to the center. This means that the game can be solved WITHOUT ever exiting the box (i.e. users do not actually have to "think outside the box"). 
Conversely if the spacing is small, the outisde dots will be right against the edge. This means that lines will have to travel outside the box in order to correctly solve the puzzle (i.e. they have to "think outside the box"). In any case, there is no directions indicating wether or not the line can actually be drawn outside.

2) Social Exposure built right on to the game board
- This makes it very easy for one player to take inspiration from the other players in his or her group
- This gives us opportunities to explore group dynamics and Exploration vs Exploitation


d) (If unfinished) What do you plan to implement next?

- I implemented a form of social exposure which could be used to perform experiments measuring social influence, but there was no DIRECT interaction between players. If I were to implement a true form of multiplayer with more interaction it would go as follows:

- There would be 5 stages (1 for each point of the 5 points that define 4 connected lines). During each stage a dominant player would be chosen from a set of n players. The dominant player would place a point on the GameBoard. The other n-1 players would then vote for a simple majority on whether or not to accept that place. If the vote passes the group moves on to the next stage until there is an order of 5 points which would serve as a proposed solution. If the vote fails, than the dominant player must select a new point.


- I think that another cool feature to implement would be a network model where there are N>>n players in a game, but each player is only connected to n neighbors. We could then see how the information of "thinking outside the box" spreads across the network.
