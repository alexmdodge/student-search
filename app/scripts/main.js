"use strict";

/* * * * JSHint Global Definitions * * */
/* globals $, google, console, alert   */
/* * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *                          Student Query Application
 *                     Author: Alex Dodge |  License: MIT
 *                             
 *                               Version 0.0.0
 *                             September 10, 2016
 *
 *
 *  
 *  This is a querying application designed to retrieve student information
 *  from a Google sheet generated from a Google form. The visualization library
 *  was preferred as the teacher wanted access to the database in a simple way.
 *
 *  For security purposes it is not recommended to use this application in an
 *  easily accessible web space. It is preferable to have it only accessible
 *  through authentication. This is due to the fact that the spreadsheet is
 *  accessible in the JavaScript code, and if someone has the link they can see
 *  any information in the sheet.
 *
 *  For more information check the GitHub repository!
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/* Load the Google Visualization API and the pie chart package.
 * The google object is the js api loading script defined earlier in 
 * the project.
 */
google.load("visualization", "1", {packages:["table", "piechart"]});

// Debugging is enabled by default, and debug messages will be displayed in
// the console window.
var debugging = true;



/* 
 * function: init
 * parameters: queryState
 * description: Initiates the query response which will be sent and retrieved
 *              using the Google Visualization API.
 *
 * Parameter def: 
 *    queryState --> This parameter is an object which contains all of the
 *                   validated fields from the submitted query. It uses the
 *                   information about which boxes were clicked and which
 *                   information was entered.
 *
 *
 */
function init(queryState) {

   // Set default functionality for the query request
   var opts = {
      sendMethod: 'auto'
   };

   /* Retrieve all inputs and store them in variables
    * The current URL is a test sheet which was constructed using
    * the dummy data
    *
    * For a user input query string
    * var urlString = $('#google-url').val();
    */

   var urlString = "https://docs.google.com/spreadsheets/d/1ABtCqLWs0AJSpwpXo6stMZgs6pk4yyQilkjcfSDRH30/edit?usp=sharing";
   var queryString = $('#student-query').val();

   // Use these statements to ensure queries are workin properly and values are retrieved
   if (debugging) {
      console.log(queryString);
      console.log(urlString);
   }

   var query = new google.visualization.Query(urlString, opts);
   query.setQuery(queryString);
   query.send(handleQueryResponse);
}

// Callback function initiated when the query is sent
function handleQueryResponse(response) {
   if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
   }

   var data = response.getDataTable();
   var table = new google.visualization.Table(document.getElementById('table-output'));
   table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

   var csv = google.visualization.dataTableToCsv(data);
   $('#csv-output').empty();
   $('#csv-output').append(csv);
}

function enableSubmit() {
   if( $('.submit-query').hasClass('disabled') ) {
      $('.submit-query').removeClass('disabled');
   }
}

function disableSubmit(student, school, amount) {
   if( !$('.submit-query').hasClass('disabled') ) {
      if( !student && !school &&  !amount)
      $('.submit-query').addClass('disabled');
   }
}

$(document).ready(function() {
   var isStudentChecked = false;
   var isSchoolChecked = false;
   var isAmountChecked = false;

   $('#student-checkbox').click(function() {
      if ( $('#student-checkbox').prop('checked') ) {
         $('.name-filter-container').slideDown('fast');
         $('.submit-button').fadeIn('fast');
         isStudentChecked = true;
         enableSubmit();
         
      } else {
         $('.name-filter-container').slideUp('fast');
         isStudentChecked = false;
         disableSubmit(isStudentChecked, isSchoolChecked, isAmountChecked);
      }
   });

   $('#school-checkbox').click(function() {
      if ( $('#school-checkbox').prop('checked') ) {
         $('.school-filter-container').slideDown('fast');
         isSchoolChecked = true;
         enableSubmit();
         
      } else {
         $('.school-filter-container').slideUp('fast');
         isSchoolChecked = false;
         disableSubmit(isStudentChecked, isSchoolChecked, isAmountChecked);
      }
   });

   $('#amount-checkbox').click(function() {
      if ( $('#amount-checkbox').prop('checked') ) {
         $('.amount-filter-container').slideDown('fast');
         isAmountChecked = true;
         enableSubmit();
      } else {
         $('.amount-filter-container').slideUp('fast');
         isAmountChecked = false;
         disableSubmit(isStudentChecked, isSchoolChecked, isAmountChecked);
      }
   });

   /*
   $('#student-checkbox').click(function() {
      init();
   });
   */
});