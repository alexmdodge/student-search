"use strict";
// Load the Visualization API and the piechart package.
google.load("visualization", "1", {packages:["table"]});

// Test URL - Note that this URL is unsecure, so anyone can access the spreadsheet.
// https://docs.google.com/spreadsheets/d/1ABtCqLWs0AJSpwpXo6stMZgs6pk4yyQilkjcfSDRH30/edit?usp=sharing

// This function
function init() {

   var opts = {
      sendMethod: 'auto'
   };

   // Retrieve all inputs and store them in variables
   var urlString = $('#google-url').val();
   var queryString = $('#query-request').val();

   console.log(urlString);
   console.log(queryString);

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

$(document).ready(function() {
   var studentStatus = false;
   var schoolStatus = false;
   var amountStatus = false;

   $('#student-checkbox').click(function() {
      if ( $('#student-checkbox').prop('checked') ) {
         $('.name-filter-container').slideDown('fast');
         $('.submit-button').fadeIn('fast');
         studentStatus = true;
      } else {
         $('.name-filter-container').slideUp('fast');
         studentStatus = false;
      }
   });

   $('#school-checkbox').click(function() {
      if ( $('#school-checkbox').prop('checked') ) {
         $('.school-filter-container').slideDown('fast');
         schoolStatus = true;
      } else {
         $('.school-filter-container').slideUp('fast');
         schoolStatus = false;
      }
   });

   $('#amount-checkbox').click(function() {
      if ( $('#amount-checkbox').prop('checked') ) {
         $('.amount-filter-container').slideDown('fast');
         amountStatus = true;
      } else {
         $('.amount-filter-container').slideUp('fast');
         amountStatus = false;
      }
   });

   /*
   $('#student-checkbox').click(function() {
      init();
   });
   */
});