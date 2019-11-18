# Adventure Capitalist

## Architecture

### Flux data flow

- In a reactive UI, mvc is not good at scalable.
- flux pattern, one way data flows, organized with action, dispatcher, store, view  architecture
- Implemented with redux


### directory 

- **src/components**
  - views
- **src/modules**
  - store, actions, dispatchers
- **src/services**
- **src/hooks**
  - controlls async functions



## Requirements

### Spec Requirements

- Buy and upgrade businesses
- Make money from a business (i.e. you click on a business and in a certain amount of time you get money – see web implementation above)
- Hire managers, so that money is made automatically
- When you close the game, next time you open it, you should see the money that your businesses made for you
- The implementation should have several business types to choose from

### Tech Requirements

-  Must be built in a dialect of JavaScript: ES5, ES6, ESNext, TypeScript
-  The UI can be anything: Visual, textual, even a fullscreen CLI works.
- We expect you to put focus on at least one of the following topics:
  - Visual polish: Beautiful design and/or graphics.
  - Extra features: Going beyond MVP functionality.
  - Server component: Creating a full-stack app.
- Write your README as if it was for a production service, including:
  - Description of the problem and solution.
  - Whether the solution focuses on back-end, front-end or if it's full stack.
  - Reasoning behind your technical choices, including architectural.
  - Trade-offs you might have made, anything you left out, or what you might do
differently if you were to spend additional time on the project.
  - Link to to the hosted application if applicable.

## Assets


## Tech description

- Built with typescript.
- Visual UI with React, redux, hooks
- Focused on MVP 
  - Considered scailing, used flux [http://fluxxor.com/what-is-flux.html]
  - More view, more models makes complicated it's architecture.
  - So, make one-way data flow, key definition of redux.

### Problem had meet

- Lack of knowledgement React hooks.
  - It looks quite simple and awesome, so applied to this homework.
  - but I never used this hooks, so whenever I tried to use hooks in the Container component or in the click handlers, it displays an error.
- Making scailable business items
  - want to create reducers with iterator, but if I create like that, redux store's name will be selected at runtime. so in the code side, it looks ugly, always attach `as any` keyword behind the redux state. tradeoff
  

get from awesome fonts [https://fontawesome.com/icons/lemon]