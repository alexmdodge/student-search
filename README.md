# Student Search Application

Originally developed for a high school I was working for, this application was designed for interfacing with google sheets. The teacher in charge of guidance wanted to be able to submit data from a Google form into a Google sheet, then still have access. The application is an interface which simplifies data from the sheet. The biggest concern from this is that security surrounding the sheets is not that great.

As a potential solution I plan to find a way to populate a server with the data, then feed that to the website. It could also be possible to create a backend interface using php which would send and recieve requests.

## Table of Contents
[Installation](#install) <br>
[Usage](#usage) <br>

<h2>
	<a name="install" aria-hidden="true" class="anchor"></a>
	Installation Instructions
</h2>

First clone the directory to your local system, then with NodeJS installed,

```
npm install
```

and 

```
bower install
```

To run the build,

```
grunt serve
```

To compile a prod version,

```
grunt
```

<h2>
	<a name="usage" aria-hidden="true" class="anchor"></a>
	Usage
</h2>
