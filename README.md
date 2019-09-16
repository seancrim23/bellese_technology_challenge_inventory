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
- In the instructions from above there should be a command example that you can use to start MongoDB locally, I personally use this command as I installed MongoDB directly under my C: drive. Open a command line and run the command to start your MongoDB instance
```
C:/mongodb/.../bin/mongod --dbpath C:/mongodb-data
```
- If successful, the last message you get should look something like
```
2019-09-16T10:26:00.206-0400 I NETWORK  [initandlisten] waiting for connections on port 27017
```
- If you see this, MongoDB is ready to go and is running on localhost at the default MongoDB port: 27017

### Run the NodeJS backend
##### BEFORE DOING THIS STEP
- This backend has a few required properties that are read from an environment file! We must create this file and add those properties for the application to run correctly!
- To create this file, go to a NEW command line. Go to the directory where you cloned the project and move into the "inventory_backend" folder. Run these commands:
```
mkdir config
cd config
mkdir env
cd env
type nul > dev.env
```
- This should ideally create an empty "dev.env" inside of Base_Directory/config/env.
- Now open the "dev.env" file (can open in any text editor) and add these two lines
```
EXPRESS_PORT=3001
MONGO_DB_URL=mongodb://localhost:27017/bellese_inventory_app_dev
```
- This is going to add to environment variables for the port that your backend will be running on (3001 in this case) and the URL that your Mongoose calls will be sending data to. In this case it will be your local instance of MongoDB at the standard MongoDB port (27017) and to the "bellese_inventory_app_dev" Database.
##### If you have completed the steps above, you should now be able to follow the instructions below:
- This step is very simple. In a NEW command line, go the directory that you cloned the project to and run a command to move to the "inventory_backend" folder
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
- Another simple step, you are basically doing the same thing you did in the previous step, except for this step you will be running the commands in "inventory_ui". Open a NEW command line to do this
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

# Running tests locally
- The tests I have written are located in either ./inventory_backend/test (for the backend) and ./inventory_ui/src/components (testing the frontend components, all of the test files are stored on the same level as their component and are named with the component_name.test.js convention).
### How to run the tests
##### The Frontend
- The frontend tests are simple. In a command line, navigate to the "inventory_ui" folder. Directly from there, use this command to run the tests
```
npm run test
```
- This looks through the entire project and runs any test that has the component_name.test.js convention. If no changes have been made, it will give you this message
```
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
 ```
 - simply press 'a' and all of the tests will run. 
 ##### The Backend
 - The backend tests are also simple but require two extra steps to allow them to work correctly.
 - Like what was done before to create the "dev.env" environment file, do the same thing to create a "test.env" environment file in the same directory. Add these properties to the newly created "test.env" file
 ```
EXPRESS_PORT=3001
MONGO_DB_URL=mongodb://localhost:27017/bellese_inventory_app_test
 ```
 - Notice how these are nearly the same. The only change is was, for MONGO_DB_URL, we are pointing it at a completely different Database. In this situation we are creating a test database that will be receiving all of the test data.
 - Once the "test.env" environment file is created, we will also have to create one more folder. Navigate to "./inventory_ui/public". These backend tests will be posting images to the REST Endpoints. These endpoints are configured with Multer to store uploaded images into the static images folder that exists at "./inventory_ui/public/images". At the time, the "images" folder does not exist. Create the "images" folder inside of "./inventory_ui/public/"
 ```
 C:/your/home/directory/bellese_technology_challenge_inventory/inventory_ui/public/ mkdir images
 ```
 - If you have successfully completed the tasks above, you can now navigate back to the "./inventory_backend" directory and run the command below inside of the "inventory_backend" folder (MAKE SURE THE DEV BACKEND IS NOT RUNNING AT THE SAME TIME AS THE TEST AND MAKE SURE THE MONGODB INSTANCE IS RUNNING OTHERWISE THE TESTS WILL HAVE NO DATABASE TO CONNECT TO)
 ```
 npm run test
 ```
 - This one will run similar to the ui test, looking again for the "item.test.js" naming convention. 
 - If all run correctly, there should be no issues and tests will pass.

# TODO
- [x] clean up the edit/view form, make it look a bit more nice
- [x] figure out images (there has to be some way) - used multer to drop uploaded images off in the front end public/images, where static images are served when using create-react-app
- [x] add testing
- [ ] Look into replacing jest tests for the backend with mocha
- [ ] refactor code in general - see if there is any redundant code or anything that could be written better
- [ ] add webpack and babel to use for code deployment
