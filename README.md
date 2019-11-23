# Adventure Capitalist

**Game closure Sim.**   by Semoon Park.


### Requirements

Below is the requirements list that had been requested, and display result with checkbox.

#### Spec Requirements

- [x] Buy and upgrade businesses
- [x] Make money from a business (i.e. you click on a business and in a certain amount of time you get money – see web implementation above)
- [x] Hire managers, so that money is made automatically
- [x] When you close the game, next time you open it, you should see the money that your businesses made for you
- [x] The implementation should have several business types to choose from

#### Tech Requirements

-  [x] Must be built in a dialect of JavaScript: ES5, ES6, ESNext, TypeScript
-  [x] The UI can be anything: Visual, textual, even a fullscreen CLI works.
- [x] We expect you to put focus on at least one of the following topics:
  - [x] Visual polish: Beautiful design and/or graphics.
  - [x] **Extra features: Going beyond MVP functionality.**
  - [ ] Server component: Creating a full-stack app.
- Write your README as if it was for a production service, including:
  - [x] Description of the problem and solution.
  - [x] hether the solution focuses on back-end, front-end or if it's full stack.
  - [x] Reasoning behind your technical choices, including architectural.
  - [x] Trade-offs you might have made, anything you left out, or what you might do
differently if you were to spend additional time on the project.
  - [x] Link to to the hosted application if applicable.


### Problem and Solution.

**Make a logic of calculation of the earned moeny when offline state**

I should have to re-organize interfaces and logics several times for handling offline revenue.

  - Fist approach was quite simple. let each business item have it's duration and earnable revenue. so the calcluation would be like below
    > earned = _.sum( businessItems.forEach(item => backgroundedTime/durationOfItem * revenue) )
  - But, actually, some case of long duration item wouldn't fit to them.
  - Long duration item case, it will resume specific progress, for example, if there were a item has it's duration would be 1 hour, and offlined about 30mins, and next log-in, it'll start from 50% of progress without earned any money
  - so I tried to store progress of each business item ande each time. but that saving cost seems too high, and if it's stored at backend, network traffic issue would be great.
  - So, final answer is that, from last updated money update time, each business item will calculate how many times they could be run, and remains will be replaced as it's progress. 
  
**How to maintain staticdata**

  - Of course, organizing staticdata is important and it's only frontend side application, so, I should have to find the way to store staticdata.
  - So, first I tried a javasript with it's data.
  - But it seems not good, so organize a JSON and load it with XHR.
  - Getting staticdata with XHR seems not good, so I found. 
  - From Typescript 2.9, supports JSON import.
  - So it's a quite easy issue, if I googled the method, and notifying the updates.

**Reduce number of calls for synchronizing time**

  - After mostly implemented this sim, I started refactoring with it
  - It seems that too many data storing to localStorage.
  - Each tick, it updates it's accessed data, data status, also with updated time.
  - I did let the update of time would be held in updating money time.
  - That last updated time only concerns for the calculation of offlined revenue, so I'll put it into that time.
  - With the redux store update, some kind of perspectives, evert tick occured actions, progress updation, item's state changes seems that don't need to redrawing all the items, so I used React.memo and only change it's value, not make a deep copied object

**Lack of knowledgement React hooks.**

  - It looks quite simple and awesome, so applied to this solution.
  - but I don't have any experiences of this hooks, so whenever I tried to use hooks in the Container component or in the click handlers, it displays an error.
  - Research and study would help this quite easy

**Making scailable business items**

  - Want to create reducers with iterator, but if I create like that, redux store's name and it's actions would be selected at runtime. so in the code side, it looks ugly, always attach `as any` keyword behind the redux state.
  - So, I defined lots of types for handling it and let a map for store it's actions for access on runtime.
  - With this iteration, there're some of `any` typed object, but it's a tradeoff.


### Whether the solution focuses on back-end, front-end or if it's full stack.

This solution is focused on front-end
I used skills such as react, react-redux, react hooks and with typescript,
typesafe actions, scss.

### Reasoning behind your technical choices, including architectural.

**About MVP**

In the MVP, Controller would access Model's data and update it.
When Model is updated, then View will reflect it into the screen,
View can also update Model, and it occurs another's View's update.

![MVP](/src/assets/images/readme/mvc.png)

With the scalable situations, it makes the code complexity.
So, use Flux pattern, one-way data flow

![Flux](/src/assets/images/readme/flux.png)

dispatcher to store, store to view, and the view to dispatcher with action.
It's much simple and easy to estimate it's data flow.
So I organize the Flux based organizations

- View
  - is the React's Functional Components those are located at `/modules`
  - These Veiws get data from store (or internal state), and displays with render()
  - Some Views like business item would store it's prev store data, so prevent useless render calls even though it has same data. (a store data would effect to another)
  - It update datas with action

- Action, store, dispatcher
  - Originallt it should have to be seperated
  - But if I do that, the code size will be increased extremly, whenever a business item added.
  - So I take typesafe-actions with reducing code size with well-organized ways.

- Singleton instances 
  - In `services` directory, there're two instances
  - One access to localStorage, and will load/store data another is access to staticdata, read needed data from it.
  - Those are quite heavy cost works, so if they are more crowed with data or backend side, it should be handled as async.
  - So Should have to divided other codes, and let the manager could only access those.
  - Many models, views, also store dispatcher will use that so I let that managers to singleton instance.


### Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

**backend feature**

First I started with Next.js & express.js, so SSR application with backend data access, but the time limits of 1 weeks is not enough to me, so replaced it as Frontend Client sided applcation.

**Calculation of offlined revenue**

If I wanted to calculate offlined revenue accuratly, then I should have to record each business item's progress state or lastly updated it's value.
But it seems not so important, and if I expend this sim as fullstack, with more items, more type of managers, it must be a burden for that.

So let them just seperate as share and remains, share will be used to calcuate revenue, remains would be calculate and display that business item's progress.

**Using react hooks**

Actually, I really wanted to have a time to use that, but always busy or any other reasons make me not to handle them.
So I couldn't try such experimental work.
But this case is quite different, so I focused on this and make note, while using those, would be a good experience for next project,might be.



### Link to to the hosted application if applicable.

App hosted via Herokuapp: http://adventure-capitalist-sim.herokuapp.com/
Code hosted via GitHub: https://github.com/semonec/adventure_capitalist
