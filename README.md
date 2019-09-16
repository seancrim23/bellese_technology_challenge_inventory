# Bellese Technology Challenge Inventory
Inventory Technology Challenge for Bellese.

# How to run this locally.
### Tools you will need!
- Git
  - Instructions to install can be found [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - Why? This is used to store our code and to allow anyone to retrieve and edit the code on their local machine.
- npm
  - Instructions to install can be found [here](https://www.npmjs.com/get-npm)
    - Why? This is used to manage dependencies in the application and to also run the application itself
- MongoDB
  - Instructions to install and setup can be found [here](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/)
    - Why? We are using MongoDB to store all of the data for this application.

### After installing and setting up all of the above, run this Git command in a local directory:
```
git clone https://github.com/seancrim23/bellese_technology_challenge_inventory.git
```
- This will pull all of the code for the project into the local directory.

### Run MongoDB FIRST
- In the instructions from above there should be a command example that you can use to start MongoDB locally, I personally use this command as I installed MongoDB directly under my C: drive
```
C:/mongodb/.../bin/mongod --dbpath C:/mongodb-data
```
- If successful, the last message you get should look something like
```
2019-09-16T10:26:00.206-0400 I NETWORK  [initandlisten] waiting for connections on port 27017
```
- If you see this, MongoDB is ready to go and is running on localhost at the default MongoDB port: 27017

### Run the NodeJS backend
- This step is very simple. In a command line, go the directory that you cloned the project to and run a command to move to the "inventory_backend" folder
```
C:/directory/you/cloned/to/ cd inventory_backend
```
- Now that you are in the backend, as long as you have correctly installed npm and have MongoDB running, you can run this command
```
npm install
```
- This command will install of the dependencies that exist in the npm package.json file. I do not store them in my Git because they take up too much space.
- Once the install has completed, you can run this command
```
npm start
```
- This will start the backend, if you see output like below then you will have correctly started the backend
```
[nodemon] 1.18.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/index.js`
Web server started on port 3001!
Successfully connected to MongoDB instance!
```

### Run the React frontend
- Another simple step, you are basically doing the same thing you did in the previous step, except for this step you will be running the commands in "inventory_ui"
```
C:/directory/you/cloned/to/ cd inventory_ui
```
- now, like before, simply run the "npm install" command in the "inventory_ui" directory
```
npm install
```
- Once the install is complete, you can now start the app like you did the backend using the below command
```
npm start
```
- if you get output like below then you have correctly started the frontend. Also, the homepage of the site should automatically load in your browser.
```
Compiled successfully!

You can now view inventory_ui in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.0.147:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

##### Have fun!

# TODO
- [x] clean up the edit/view form, make it look a bit more nice
- [x] figure out images (there has to be some way) - used multer to drop uploaded images off in the front end public/images, where static images are served when using create-react-app
- [x] add testing
- Look into replacing jest tests for the backend with mocha
- refactor code in general - see if there is any redundant code or anything that could be written better
