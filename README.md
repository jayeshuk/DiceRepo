# DiceRepo

App Requirements:
- Using these APIs you have to complete the following tasks in React Native.
  1. Create a search field, which queries on public repos.
  2. Fetch the data of the repos and create a card for each.   
- Following are the details, the card needs to have:
  1. Avatar, Repo name, Stars, Description, language 
  2. A Sort field with the following options-  Stars, watchers count, score, name,created_at, updated_at.

Solution:
1. Single Screen Application with a Search bar and List of Repositories.
2. FlatList a better way to render list of data.
3. Studied <a href="https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-repositories">Search - GitHub Docs</a> to learn about querying and OctoKit Client API library.
4. Installed OctoKit from <a href="https://www.npmjs.com/package/@octokit/rest">@OctoKit/REST - NPM</a>.
5. Created a TOKEN for usage of GitHub API.
6. Separate buttons to choose "Sort by Parameter" and "Order by" to sort the repositories.
7. Finally, cleaned the code with meaningful logs at each step.

Tech Stack:
  1. React
  2. React Native
  3. JavaScript/ES6
  4. CSS
  5. OctoKit
  
## Application Video
[DiceRepo App.webm](https://user-images.githubusercontent.com/46965764/222789795-b4cdfaf9-8a51-4fcc-93d4-d03b9739a830.webm)


## Setup and Installation

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

1. Installation (In project root folder):

    `npm install`    

2. Prerequisites to Run:
    
     - Connect Physical Android/iOS device in USB debugging mode  OR  Launch Emulator using AVD Manager [Android Studio].
     - Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

          ```
          npm start -- --reset-cache
          # or
          yarn start -- --reset-cache
          ```

3. To Start Android Application:

    * For Android users:
      `npx react-native start` and then press a or i for respective OS

    * For iOS users:
      `npx react-native run-ios`

4. To Visit App: 
    
    App Launched in your Android/iOS Device
    
## Run tests
Unit tests: `npm run mocha`

Unit tests with coverage: `npm run coverage`

Linter: `npm run lint`
