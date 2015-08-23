# blizzard-application

## About

Single page application built using Backbone JS along with Backbone Layout manager and Backbone Wreqr for messaging between modules.

The App is structured by separation of concerns. The controllers are instantiated by the message bus which in turn make the call for the models to provide data to the views. A global model is stored to keep track of data shared between views. 

The API is provided by Stack Exchange (https://api.stackexchange.com/) for the data to be rendered.

Application URL: [http://ramirezdev.github.io/blizzard-application/](http://ramirezdev.github.io/blizzard-application/)

######features implemented:
-View questions

-View question details and answers

-Search for questions

-Sort questions 


####REQUIREMENTS

grunt (and grunt-cli)

bower

ruby

sass gem

####INSTALL

install npm dev dependancies

	npm install


install bower components

	bower install

**GRUNT: PUBLISH**

generates dist files and publishes the contents the gh-pages branch to make the code live on the web.

	grunt publish	
