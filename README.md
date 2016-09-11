# Student Search Application

Originally developed for a high school I was working for. This application was designed for interfacing with Google Sheets. The teacher in charge of guidance wanted to be able to submit data from a Google form into a Google sheet, then still have access. The application is an interface which simplifies data from the sheet. The biggest concern from this is that security surrounding the sheets is not that great.

As a potential solution I plan to find a way to populate a server with the data, then feed that to the website. It could also be possible to create a backend interface using php which would send and recieve requests.

It is also possible to interface this easily with a database. I'll set up some content and JavaScript options in the future to make that easy. Most likely a query object will be created which can be used with most SQL languages and formats, as the Google Visualization API uses it's own nearly identical version of SQL.

## Table of Contents
[Installation](#install) <br>
[Usage](#usage) <br>
[To-Do](#todo) <br>

<h1>
	<a name="install" aria-hidden="true" class="anchor"></a>
	Installation Instructions
</h1>

First clone the directory to your local system and ensure that NodeJS and npm are installed. For NodeJS
head [here](https://nodejs.org/en/download/package-manager/). npm will come with the install! Check if they're installed using,

```
node -v
npm -v
```

Navigate to the **app** directory (this is where the packages are installed) then in your console,

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

<h1>
	<a name="todo" aria-hidden="true" class="anchor"></a>
	To-Do List
</h1>

Below is a list of some things I have left to do and that have been on my mind for features.

* User Interface
  * form validation
  * font icons for better visual indication
  * number indicators (circles) to the amount section
  * output table to format information effectively
  * selection to return all students in PDF
* Functionality
  * query object construction from validated elements
  * query statement construction from query object
  * submit success and return table to view
  * print (button)
  * reset (button)
  * output to pdf (button)
* Database Security
  * add login feature or return feature where Google Sheet URL is stored in secure php. When site is visited and user validated, then return the URL to the query variable
  * use third party source for validation login