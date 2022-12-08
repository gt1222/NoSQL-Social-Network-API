# NoSQL-Social-Network-API

## Description
This took so long for me to demo. I created a social network API where users can share their thoughts, react to friends' thoughts and create a friend list. I used Express.js and MongoDB database and Mongoose ODM.

I struggled with getting the single user id to load and had to rewrite the code again because I could not find out where the error was. When I rewrote the code, it finally worked even though updating user and deleting user by id worked. The reaction part of the code also took a long time because the reaction didn't pop up at all on insomnia, until I realized I had to get the body for the data to show up. Also, I accidentally deleted all the reactions instead of by ID because I had the portion to delete all of reaction body instead of the reactionId.


## Installation
1. Download or clone repository
2. Express.js and Mongoose is required to run application
3. `npm install`

## Usage
The application will be invoked by using the following command:

```bash
npm start
```
![gif demo of NoSQL assignment](02-Challenge/Assets/NoSQL.gif)


## Links
[DEMO LINK](https://drive.google.com/file/d/17jinbDaSeRnLNg0pNOObCQXb8VfZj-E_/view)
[Github](https://github.com/gt1222/NoSQL-Social-Network-API)