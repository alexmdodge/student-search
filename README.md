# Student Search Application

<img src="http://i.imgur.com/bKmWSGN.jpg" width="900px">

A search application that uses *Google Sheets* and the *Google Visualization API* to retrieve student information which was stored using a Google Form. The application can search by first and last name, school, and scholarship amount the student has retrieved so far. This application could be extended to anything, as the power is the simplicity of using Google Sheets as a database.

For secure student information using the application in the secure-login directory. This is wrapped in a secure php login interface which uses modern php hashing and salting to secure passwords in a MySQL database.

# Table of Contents
*[Demo](#demo)
  * [Login](#demo-login)
  * [Selecting Students](#demo-info)
  * [Docker Information](#demo-docker)
* [Installation](#install)
  * [Build Commands](#install-build)
  * [Docker Support](#install-docker)
* [Database Configuration](#db)
* [Examples and Support](#usage)
* [Contributing](#contributing)

<h1>
	<a name="demo" aria-hidden="true" class="anchor"></a>
	Demo
</h1>
If you would like to try out the application first head to my <a> projects page </a>.

<h3>
	<a name="demo-login" aria-hidden="true" class="anchor"></a>
	Login
</h3>
The default login information for the server is the same as provided in the docker container. If used it is **highly recommedned** you remove the login from the server and change the information.
```
username : admin
password : admin123
```

<h3>
	<a name="demo-info" aria-hidden="true" class="anchor"></a>
	Selecting Students
</h3>
Click the first box and enter : `John` and `Jones` for first and last name respectively.

For some other **test data** you can look directly at the google sheet [here](https://docs.google.com/spreadsheets/d/1ABtCqLWs0AJSpwpXo6stMZgs6pk4yyQilkjcfSDRH30/edit?usp=sharing), or you can simply play around with some of the amounts and school options.

The application is set up so you can simply search by individual elements or multiples. This allow you to retrieve specific information or general groups. Notice that you can output both to **pdf** and if you print the page, the **CSS styling will be maintained on the elements**.

<h3>
	<a name="demo-docker" aria-hidden="true" class="anchor"></a>
	Docker Demo
</h3>
If you would like to get your own local instance of the application running with MySQL and the database **pre-configured** head to my docker hub and check out my [Student Search Docker Container](https://hub.docker.com/r/alexmdodge/student-search/).


<h1>
	<a name="install" aria-hidden="true" class="anchor"></a>
	Installation Instructions
</h1>

If you would like to contribute or explore the source code first clone the directory to your local system and ensure that NodeJS and npm are installed. For NodeJS
head [here](https://nodejs.org/en/download/package-manager/). npm will come with the install! Check if they're installed using `node -v` and `npm -v`.

Navigate to the Student Search directory and run the installation files, `npm install` and `bower install`. **Note** that bower will be removed from the project soon in favor or purely npm or perhaps yarn.

Go **back** to the home directory with the gulpfile in it, then you can run the build commands.

<h3>
	<a name="install-build" aria-hidden="true" class="anchor"></a>
	Build Commands
</h3>
To run a test site with browsersync and watch functions using gulp just run,
```
gulp
```
Currently there are no other build functions in the project but upcoming are,
* Testing
* Staging
* Docker watch
* Docker commit

<h3>
	<a name="install-docker" aria-hidden="true" class="anchor"></a>
	Docker Support
</h3>
This application currently has a docker container so you can get up and running with a fully configured pre-configured database. Find it [here](https://hub.docker.com/r/alexmdodge/student-search/). Some commands you may find useful,

```
sudo docker run -p 80:80 -t -i alexmdodge/student-search /bin/bash
```
Then start the web server and mysql database,

```
service apache2 start
service mysql start
```

Then to pop back out and do other things hit `ctrl + p`then `ctrl + q`.

If you want to get back in to the terminal to continue working on it,

```
docker exec -it container-id /bin/bash
```

Use `docker ps` to view the running containers properties. To copy changes from the local directory into the docker container use,

```
docker cp . container-id:/var/www/example.com/public_html
```

To commit changes to the most recent container,

```
docker commit container-id alexmdodge/student-search
```
<h1>
	<a name="db" aria-hidden="true" class="anchor"></a>
	Database Configuration
</h1>
(**in progress**)

<h1>
	<a name="usage" aria-hidden="true" class="anchor"></a>
	Examples and Support
</h1>
Once you have the project running in your browser, you'll notice a couple of options. The main idea is that the user clicks and enters how they want to search for the particular student or groups of students. The submit button will not highlight until a field is used. Form validation is also used to ensure proper queries.

When the submit button is clicked all of the form elements store their information in a query object which is passed to the visulization query funconion `init()`. This is where you could customize whether you use the Google Visualization API (which is actually pretty convenient for test purposes), or whether you set up your own database and query section.

<h1>
	<a name="contributing" aria-hidden="true" class="anchor"></a>
	Contributing
</h1>
(**in progress**







### Contributions
<h6>
<a href="http://www.freepik.com/free-vector/seo-character-and-concepts_762794.htm">Image Designed by Freepik</a>
</h6>
