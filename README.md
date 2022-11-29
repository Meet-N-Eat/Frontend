# Meet 'N Eat

🤔 Ever found the perfect restaurant, but had no one to go with? Ever wanted to meet someone based on your love of food? 

🍽 Meet 'n Eat is an app that helps match people who have common tastes! The platform allows users to add friends and send DMs, as well as schedule and track meetups from their profile page. On top of that users can browse available restaurants and get information such as reviews and other users who have liked that restaurant.

## Deployed Website Link

Head over to () to view more!

## 🧑🏼‍💻👩🏻‍💻🧑🏻‍💻 Authors

* **Andrew Rethorford** - [GitHub](https://github.com/andrewretherford)
* **Aimee Misaki** - [GitHub](https://github.com/aimeemisaki)
* **David Sandoval** - [GitHub](https://github.com/DavidJoao)


## 🧰 Tech Stack
<a href='https://developer.mozilla.org/en-US/docs/Glossary/HTML5'><img src='./planning/tech-icons/html5.png' alt='HTML5'/></a>
<a href='https://developer.mozilla.org/en-US/docs/Web/CSS'><img src='./planning/tech-icons/css.png' alt='CSS'></a>
<a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'><img src='./planning/tech-icons/javascript.png' alt='Javascript'/></a>
<a href='https://reactjs.org/'><img src='./planning/tech-icons/react.png' alt='React.js'></a>
<a href='https://nodejs.org/en/about/'><img src='./planning/tech-icons/nodejs.png' alt='NodeJS'/></a>
<a href='https://mongoosejs.com/'><img src='./planning/tech-icons/mongoose.png' alt='Mongoose JS'/></a>
<a href='https://www.mongodb.com/'><img src='./planning/tech-icons/mongodb.png' alt='MongoDB'/></a>
<a href='https://expressjs.com/'><img src='./planning/tech-icons/express.png' alt='Express'/></a>
<a href='https://tailwindcss.com/'><img src='./planning/tech-icons/tailwindcss.png' alt='TailwindCSS'/></a>
<a href='https://react-bootstrap.github.io/'><img src='./planning/tech-icons/reactbootstrap.png' alt='React Bootstrap'/></a>

## Features
* Create an account and sign back in with user authentication
* Search restaurants with keywords and add various search filters
* View restaurant information, reviews left by other users and send friend requests to other users who have favorited the restaurant
* Add restaurant to favorites and add reviews
* Accept/decline friend requests
* Send event invites to other users with date/time and restaurant of choice
* View and edit itinerary (events with other users)
* View messages and send messages to friends in chat
* View friends and their basic information
* View and remove favorited restaurants
* Edit user profile (incl. profile photo, 'About Me' section, etc.)

# Planning 

## 💡 Our Approach

Our group project application, for which we built our first version during our Software Engineering Intensive program at General Assembly, we utilized the Scrum methodology, assigning roles of Product Owner, Scrum Master and Development representatives to each of our project members. First, we began with each member coming up with his/her/their own user stories with the Product Owner's vision of the application in mind. We, then, conglomerated our ideas and organized our first draft of our project's user stories and general framework of the application's functionalities. 

In order to cohesively plan our backend that could support our frontend, we created a spreasheet of schemas and backend routes - taking into consideration our use of Mongoose, MongoDB and Express - and subsequently built an entity-relationship model. 

For our frontend planning, each member drafted wireframes, which we consolidated into one set of wireframes that we, especially the Product Owner, believed met the standards of the product's value. Furthermore, we constructed a component heirarchy, mapping out the network of parent, children and sibling components, and included a table of each component with its name, description, frontend route (if required) and whether it was a state or props (if applicable).

**We completed our first version in less than two weeks, which included three sprints - one to build the backend, one to build the frontend functionalities and one to complete styling.**

**_Although we passed not only the project's MVP set by our program's guidelines, but also a few of our own stretch goals, we were eager to further improve our application and see our own skills as fullstack software engineers to its fullest potential._**

Thus, after the program ended, we first identified the frontend functionality and backend inefficiencies we did not have time to work on during our time at General Assembly and essentially began from scratch. We, then, began with a completely new set of wireframes that would embody everything we wanted for our application. Subsequently, we remodeled our component heirarchy and table according to our new frontend functionality requirements.  

While maintaining most of our schemas/models in our backend, we reconfigured our controllers with more efficient ways to send back specific bodies of data to the frontend that were integral for each component. For our frontend, we built out all of the functionality we laid out in our component heirarchy and redesigned our whole styling, including responsive design, using TailwindCSS. 

Although we all had different schedules and oftentimes were in completely different timezones, we maintained the Scrum methodology and contributed our time and skills to build this application.

**In total, we worked for over six weeks, compartmentalized by three sprints (one for MVP, one for polishing up all functionality and one for styling and error handling), with bi-weekly, if not daily, standup Zoom calls and continous Slack communication. We also organized our work by utilizing team boards via Trello to keep track of which components required work to be done on, which team member was currently working on which component and which component was finished.**

**_Our general approach after the program ended was asking ourselves, "What is missing? What do we need to fix?" Ultimately, however, our approach to all of these questions relied on teamwork and each member's hard work and dedication to enhance our project. We are grateful for this experience and hope you all get to enjoy Meet N' Eat._**

## 🧩 Entity-relationship model

## 🔎 Component Heirarchy 


## 📝 User Stories

 - As a User, I want to be able to make a profile in order to store details about myself																
 - As a User, I want to be able to view other users who are interested in the restaurants that I like so that I can invite them to check it out				
 - As a User, I want to be able to view details about other users in their profile so that I can make better decisions about who to meet up with																
 - As a User, I want to be able to save a list of restaurants that I like so that I can keep track of them																
 - As a User, I want to see relevant details of restaurants such as ratings, prices, type of food on the menu, business hours, etc so that I can decide which ones I like																
 - As a User, I would like the ability to leave reviews for restaurants that I've been to in order to help the community with feedback																
 - As a User, I want to be able to search restaurants by location so that I can make decisions which restaurants to visit based on travel time																
 - As a User, I want to be able to search restaurants by certain attributes, such as genre, price, etc to help me narrow down the choices																
 - As a User, I want to be able to search by multiple attributes at once so that I don't have to search separately for each	
 - As a User, I want to be able to schedule meetups and invite other users to them from my profile in order to keep track of who I'm meeting, when I'm meeting them, and where we're going		
 - As a User, I want to be able to send friend request to other people to keep track of the people I want to meet with

## 🖌 Wireframes
* Home
![Wireframe_HomePage](https://user-images.githubusercontent.com/93743792/202348449-3619ed28-e3f8-4f62-b27e-6fcc70cab1c0.png)

* SignUp
![Wireframe_SignUp](https://user-images.githubusercontent.com/93743792/202348045-23c52884-238f-498f-a519-a6440bb6f010.png)

* CoordinateMeetup (MyPage)
![Wireframe_CoordinateMeetUp](https://user-images.githubusercontent.com/93743792/202348125-8122a11f-e7b1-4169-a8ef-cf385cc781ec.png)

* Favorites (MyPage)
![Wireframe_Favorites](https://user-images.githubusercontent.com/93743792/202348136-41ffd50d-d26d-4353-a18d-93c5c8aa0f7d.png)

* Friends (MyPage) 
![Wireframe_Friends](https://user-images.githubusercontent.com/93743792/202348179-1bb13a5a-d621-4bd2-99d3-c33c0719649b.png)

* Itinerary (MyPage)
![Screen Shot 2022-11-17 at 12 12 31](https://user-images.githubusercontent.com/93743792/202348193-528d2d0e-f158-498d-959c-4412c2df992c.png)

* Messages
![Wireframe_Messages](https://user-images.githubusercontent.com/93743792/202348253-a85806c1-f354-4768-afa9-e1b4006d3426.png)

* MessageChat
![Wireframe_MessageChat](https://user-images.githubusercontent.com/93743792/202348277-87598605-8bf9-4d22-8a7d-dc49c67698bc.png)

* SearchResults
![Wireframe_SearchResults](https://user-images.githubusercontent.com/93743792/202348293-d037cc09-fa42-4497-bd79-538188358e66.png)

* FriendRequests
![Wireframe_FriendRequests](https://user-images.githubusercontent.com/93743792/202348320-66bed14a-6a27-4d62-a40c-2fe2e9d912bc.png)


## 👀 Sreenshots
* MyPage (Desktop)
![MyPage_Desktop](https://user-images.githubusercontent.com/93743792/202349587-633180dd-dacc-4be5-a73a-2712ca95b8fe.png)

* Navigation (Mobile)
![NavBar_Mobile](https://user-images.githubusercontent.com/93743792/202349597-8b7fc9fa-e5c0-4cca-9a56-cebd4816ea5e.png)

* MessageChat (Mobile)
![MessageChat_Mobile](https://user-images.githubusercontent.com/93743792/202349608-ecb51641-9a43-4b3f-878c-086dd7abb100.png)


## 🏃 Stretch Goals / Future Plans


