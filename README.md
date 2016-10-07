# Student Search Application

<img src="http://i.imgur.com/bKmWSGN.jpg" width="900px">

Originally developed for a high school I was working for. This application is designed to interface with Google Sheets. The teacher in charge of guidance wanted to be able to submit data from a Google form into a Google sheet, then still have access. The application is an interface which simplifies data from the sheet. The biggest concern from this is that security surrounding the sheets is not that great. The sheet will be placed behind a login screen using a PHP template and the backend which is running MySQL.

It is also possible to interface this easily with a database. I'll set up some content and JavaScript options in the future to make that easy. Most likely a query object will be created which can be used with most SQL languages and formats, as the Google Visualization API uses it's own nearly identical version of SQL.

# Table of Contents
* [Installation](#install) <br>
* [Usage](#usage) <br>
* [Upcoming Features and Progress](#todo) <br>

<h1>
	<a name="install" aria-hidden="true" class="anchor"></a>
	Installation Instructions
</h1>

First clone the directory to your local system and ensure that NodeJS and npm are installed. For NodeJS
head [here](https://nodejs.org/en/download/package-manager/). npm will come with the install! Check if they're installed using `node -v` and `npm -v`.

Navigate to the Student Search directory and run the installation files,
```
npm install
```

and 

```
bower install
```

Go **back** to the home directory with the gulpfile in it, then you can run the following commands,

*Run a test site with browsersync and watch functions using gulp,

```
gulp
```

**Other funcions to be added, as the gulp build breaks right now.**

<h1>
	<a name="usage" aria-hidden="true" class="anchor"></a>
	Usage
</h1>
Once you have the project running in your browser, you'll notice a couple of options. The main idea is that the user clicks and enters how they want to search for the particular student or groups of students. The submit button will not highlight until a field is used. Form validation is also used to ensure proper queries.

When the submit button is clicked all of the form elements store their information in a query object which is passed to the visulization query funconion `init()`. This is where you could customize whether you use the Google Visualization API (which is actually pretty convenient for test purposes), or whether you set up your own database and query section.

For some **test data** you can look directly at the google sheet [here](https://docs.google.com/spreadsheets/d/1ABtCqLWs0AJSpwpXo6stMZgs6pk4yyQilkjcfSDRH30/edit?usp=sharing), or you can simply place around with some of the amounts and school options.

<h1>
	<a name="todo" aria-hidden="true" class="anchor"></a>
	Upcoming Features and Progress
</h1>

Below is a list of some things I have left to do and that have been on my mind for features.

* User Interface
  * ~~form validation~~
  * ~~add disabled features for schools and amount~~
  * font icons for better visual indication
  * ~~output table to format information effectively~~
  * ~~selection to return all students in PDF~~
  * ~~pdf return with one student per page~~
* Functionality
  * ~~query object construction from validated elements~~
  * ~~query statement construction from query object~~
  * ~~submit success and return table to view~~
  * ~~print (button)~~
  * reset (button)
  * ~~output to pdf (button)~~
* Database Security
  * add login feature or return feature where Google Sheet URL is stored in secure php. When site is visited and user validated, then return the URL to the query variable
  * use third party source for validation login

# Docker
This app will eventually be wrapped in a Docker image which will include a simple login service with a default password already setup. For the LAMP Image in use, run the image with,

```
sudo docker run -p 80:80 -t -i username/repository-name /bin/bash
```
Then start the web server and mysql database,

```
service apache2 start
service mysql start
```

Then to pop back out and do other things hit `ctrl + p`then `ctrl + q`.

If you want to get back in to the terminal to continue working on it,

```
docker exec -it container-id bash
```


<h6>
<a href="http://www.freepik.com/free-vector/seo-character-and-concepts_762794.htm">Image Designed by Freepik</a>
</h6>
