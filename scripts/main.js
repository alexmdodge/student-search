"use strict";

/* * * * JSHint Global Definitions * * * * * */
/* globals $, google, console, alert, jsPDF */
/* * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *                          Student Query Application
 *                     Author: Alex Dodge |  License: MIT
 *                             
 *                               Version 0.3.2
 *                             September 13, 2016
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

function toPDF() {

   var doc = new jsPDF();
   var specialElementHandlers = {
      '#editor': function (element, renderer) {
         return true;
      }
   };

   doc.fromHTML($('#table-output').html(), 15, 15, {
      'width': 170,
      'elementHandlers': specialElementHandlers
   });

   doc.save('student-scholarships.pdf');
}

/* 
 * function: validateQuery
 * parameters: tempState
 * description: Checks which options the user is searching by, then validates the fields
                and data entries for each of the possible options.
 *
 * Parameter def: 
 *    tempStatus --> contains the three boolean variables,
 *          -- isStudentCheck
 *          -- isSchoolChecked
 *          -- isAmountChecked
 */
function validateQuery(tempStatus) {
   var isValid = true;

   // These statements can be optizimzed by using the parents or children functions
   // Validates all fields in the search for school section
   if( tempStatus.isStudentChecked ) {

      if( !$('#first-name').val() ) {

         $('#first-name').parent('.form-group').addClass('has-error');
         $('#first-name').prev('.control-label').removeClass('hide');
         isValid = false;

      } else {

         $('#first-name').prev('.control-label').addClass('hide');

      }

      if( !$('#last-name').val() ) {

         $('#last-name').parent('.form-group').addClass('has-error');
         $('#last-name').prev('.control-label').removeClass('hide');
         isValid = false;

      } else {
         
         $('#last-name').prev('.control-label').addClass('hide');

      }
   } 


   if( tempStatus.isSchoolChecked ) {

      if ( !$('input:radio[name="optionsRadios"]').is(':checked') ) { 

         $("input:radio[name='optionsRadios']").parent('.form-group').addClass('has-error');
         $("input:radio[name='optionsRadios']").prev('.control-label').removeClass('hide');
         isValid = false;

      } else {
         
         $("input:radio[name='optionsRadios']").prev('.control-label').addClass('hide');

      }
      
      if ( $('#junior-high-select').val() === "Click to choose a junior high school" && !$('#school-radio2').is(':checked')) {
         $('#junior-high-select').prev('.dropdown-error').removeClass('hide');
         isValid = false;
      }


      if ( $('#elementary-select').val() === "Click to choose an elementary school" && !$('#school-radio1').is(':checked')) {
         $('#elementary-select').prev('.dropdown-error').removeClass('hide');
         isValid = false;
      }

   } 


   if( tempStatus.isAmountChecked ) {

      if ( !$('input:radio[name="amountRadios"]').is(':checked') ) {   
         $("input:radio[name='amountRadios']").parent('form-group').addClass('has-error');
         $('.form-group .control-label').removeClass('hide');
         isValid = false;
      } else {
         $('.form-group .control-label').addClass('hide');
      }

      if(!$('#first-scholar-amount').is(':disabled')) {
         if ( !$('#first-scholar-amount').val() ) {
            $('#first-scholar-amount').parent('form-group').addClass('has-error');         
            $('#first-scholar-amount').prev('.control-label').removeClass('hide');
            isValid = false;
         }

         if ( !($.isNumeric($('#first-scholar-amount').val())) || $('#first-scholar-amount').val() < 0) {
            $('#first-scholar-amount').prev('.control-label').removeClass('hide');
            isValid = false;
         } else {
            $('#first-scholar-amount').prev('.control-label').addClass('hide');
         }
      }

      if(!$('#second-scholar-amount').is(':disabled')) {
         if ( !$('#second-scholar-amount').val() ) {
            $('#second-scholar-amount').parent('form-group').addClass('has-error');         
            $('#second-scholar-amount').prev('.control-label').removeClass('hide');
            isValid = false;
         }

         if ( !($.isNumeric($('#second-scholar-amount').val())) || $('#second-scholar-amount').val() < 0) {
            $('#second-scholar-amount').prev('.control-label').removeClass('hide');
            isValid = false;
         } else {
            $('#second-scholar-amount').prev('.control-label').addClass('hide');
         }
      }
   

   }

   /* Will scroll to the error message at the top of the application */

   if(!isValid) {
      $('html, body').animate({
           scrollTop: $('#error-message').offset().top
      }, 2000);

     $('#error-container').removeClass('hide');
     $('.form-group').removeClass('has-success');
   } else {
      $('#error-container').addClass('hide');
      $('.control-label').addClass('hide');
      $('.form-group').removeClass('has-error');
      $('.form-group').addClass('has-success');
      $('.form-group-initial').removeClass('has-success');
      $('.dropdown-error').addClass('hide');
   }

   return isValid;
}



/* 
 * function: constructStudentQuery
 * parameters: queryState
 * description: Takes the queryState and translates each object variable into
                a query string which is appended to the general query which is
                returned at the end.
 *
 * Parameter def: 
 *    queryState --> This parameter is an object which contains all of the
 *                   validated fields from the submitted query. It uses the
 *                   information about which boxes were clicked and which
 *                   information was entered.
 */
function constructStudentQuery(queryState) {
   var queryString = 'select * Where ';

   if( queryState.useName ) {
      var firstNameQuery = 'B contains "' + queryState.firstName + '" and ' ;
      var lastNameQuery = 'C contains "' + queryState.lastName + '" and ';
      console.log(firstNameQuery);
      console.log(lastNameQuery);
      queryString = queryString + firstNameQuery + lastNameQuery;
   }

   if( queryState.useJuniorSchool ) {
      var juniorQuery = 'F contains "' + queryState.juniorSchool + '" and ';
      queryString = queryString + juniorQuery;
      console.log(juniorQuery);
   }
   
   if( queryState.useElemSchool ) {
      var elemQuery = 'E contains "' + queryState.elemSchool + '" and ';
      queryString = queryString + elemQuery;
      console.log(elemQuery);
   }

   if( queryState.useAmount ) {
      var amountQuery = '';
      switch(queryState.amountLogic) {
         case 0:
            amountQuery = 'G = ' + queryState.firstAmount + ' and ';
            queryString = queryString + amountQuery;
            console.log(amountQuery);
            break;
         case 1:
            amountQuery = 'G > ' + queryState.firstAmount + ' and ';
            queryString = queryString + amountQuery;
            console.log(amountQuery);
            break;
         case 2:
            amountQuery = 'G < ' + queryState.firstAmount + ' and ';
            queryString = queryString + amountQuery;
            console.log(amountQuery);
            break;
         case 3:
            amountQuery = 'G >= ' + queryState.firstAmount + ' and ';
            queryString = queryString + amountQuery;
            console.log(amountQuery);
            break;
         case 4:
            amountQuery = 'G <= ' + queryState.firstAmount + ' and ';
            queryString = queryString + amountQuery;
            console.log(amountQuery);
            break;
         case 5:
            if (queryState.firstAmount <= queryState.secondAmount) {
               amountQuery = 'G >= ' + queryState.firstAmount + ' and G <= ' + queryState.secondAmount + ' and ';
               queryString = queryString + amountQuery;
            } else {
               amountQuery = 'G >= ' + queryState.secondAmount + ' and G <= ' + queryState.firstAmount + ' and ';
               queryString = queryString + amountQuery;
            }
            console.log(amountQuery);
            break;
         default:
            console.log('No logic detected in amount query.');
      }
   }

   queryString = queryString.substring(0,queryString.length-5);
   console.log(queryString);
   return queryString;

}


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
   var queryStringFinal = constructStudentQuery(queryState);

   var query = new google.visualization.Query(urlString, opts);
   query.setQuery(queryStringFinal);
   query.send(handleQueryResponse);
}

// Callback function initiated when the query is sent
function handleQueryResponse(response) {
   if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
   }

   var data = response.getDataTable();
   $('#table-output').empty();
   console.log(data.getNumberOfRows());

   if (data.getNumberOfRows() > 0) {
      $('#no-student').addClass('hide');
      for (var row = 0; row < data.getNumberOfRows(); row++) {
         var newOverview = $('#student-overview').clone();
         newOverview.attr('id','student-overview'+row);
         newOverview.appendTo('#table-output');

         newOverview.find('.student-overview-scholarship').append(''+data.getValue(row,6) + '$');
         newOverview.find('.student-overview-name').append(data.getValue(row,1) + ' ' + data.getValue(row,2) );
         newOverview.find('.student-overview-address').append(''+data.getValue(row,3));
         newOverview.find('.student-overview-schools').append(data.getValue(row,4) + ', ' + data.getValue(row,5));
         newOverview.find('.student-overview-bio').append(''+data.getValue(row,7));

      }
   } else {
      $('#no-student').removeClass('hide');
   }

   $('#api-loading').hide();
}

function enableSubmit() {
   if( $('#submit-query').hasClass('disabled') ) {
      $('#submit-query').removeClass('disabled');
   }
}

function disableSubmit(tempStatus) {
   if( !$('#submit-query').hasClass('disabled') ) {
      if( !tempStatus.isStudentChecked && !tempStatus.isSchoolChecked &&  !tempStatus.isAmountChecked) {
         $('#submit-query').addClass('disabled');
      }
   }
}

$(document).ready(function() {
   var status = {
      isStudentChecked: false,
      isSchoolChecked: false,
      isAmountChecked: false
   };

   $('#student-checkbox').click(function() {
      if ( $('#student-checkbox').prop('checked') ) {
         $('.name-filter-container').slideDown('fast');
         $('.submit-button').fadeIn('fast');
         status.isStudentChecked = true;
         enableSubmit();
         
      } else {
         $('.name-filter-container').slideUp('fast');
         status.isStudentChecked = false;
         disableSubmit(status);
      }
   });

   $('#school-checkbox').click(function() {
      if ( $('#school-checkbox').prop('checked') ) {
         $('.school-filter-container').slideDown('fast');
         status.isSchoolChecked = true;
         enableSubmit();
         
      } else {
         $('.school-filter-container').slideUp('fast');
         status.isSchoolChecked = false;
         disableSubmit(status);
      }
   });

   $('#amount-checkbox').click(function() {
      if ( $('#amount-checkbox').prop('checked') ) {
         $('.amount-filter-container').slideDown('fast');
         status.isAmountChecked = true;
         enableSubmit();
      } else {
         $('.amount-filter-container').slideUp('fast');
         status.isAmountChecked = false;
         disableSubmit(status);
      }
   });

   $('#print-button').click(function() {
      window.print();
   });

   $('#to-pdf').click(function() {
      toPDF();
   });

   $('input:radio[name=amountRadios]').click(function() {
      if(($('input:radio[name=amountRadios]:checked').val()) === "option6") {
         $('#second-scholar-amount').attr('disabled', false);
      } else {
         $('#second-scholar-amount').attr('disabled', true);
      }
   });



   /* Validates the data, and submits the query object to the visualization query function */
   $('#submit-query').click(function() {
      
      if( !$('#submit-query').hasClass('disabled') ) {

         var isDataValidated = validateQuery(status);
         console.log("Value of isValidated is: " + isDataValidated);

         if(isDataValidated) {


            /* Object: queryState
             * 
             * useName, useSchool, useAmount
             * - - - - - - - - - - - - - - -
             * All of these variables store information about whether or not their
             * associated variables are going to be used
             *
             *
             * firstName, lastName
             * - - - - - - - - - - - - - - -
             * These are stored as names when the search by students field is selected.
             * The variables are empty strings otherwise.
             *
             *
             * elemSchool, juniorSchool
             * - - - - - - - - - - - - - - -
             * These are stored as names when the search by school field is selected.
             * The variables are empty strings otherwise.
             *
             *
             * firstAmount, secondAmount
             * - - - - - - - - - - - - - - -
             * These are stored as names when the search by amount field is selected.
             * The first amount is used in the calculations and queries only involving
             * one number. The secondAmount is used for the calculations involving two
             * numbers like 'greater than __ or equal to __'.
             *
             *
             * amountLogic
             * - - - - - - - - - - - - - - -
             * This is an integer between 0 and 5. It will act as the array index for
             * the logic required to determine the query language for the numeric
             * entries.
             *
             */

            var queryState = {
               useName: false,
               firstName: null,
               lastName: null,
               useElemSchool: false,
               useJuniorSchool: false,
               juniorSchool: null,
               elemSchool: null,
               useAmount: false,
               firstAmount: null,
               secondAmount: null,
               amountLogic: null
            };

            if(status.isStudentChecked) {
               queryState.useName = true;
               queryState.firstName = $('#first-name').val();
               queryState.lastName = $('#last-name').val();
            }

            if(status.isSchoolChecked) {
               if ($('input:radio[name=optionsRadios]:checked').val() === "option1") {
                  queryState.useJuniorSchool = true;
                  queryState.juniorSchool = $('#junior-high-select').val();
               }

               if ($('input:radio[name=optionsRadios]:checked').val() === "option2") {
                  queryState.useElemSchool = true;
                  queryState.elemSchool = $('#elementary-select').val();
               }
            }

            if(status.isAmountChecked) {
               queryState.useAmount = true;
               queryState.firstAmount = $('#first-scholar-amount').val();
               if( !$('#second-scholar-amount').is(':disabled')) {
                  queryState.secondAmount = $('#second-scholar-amount').val();
               }

               switch($('input:radio[name=amountRadios]:checked').val()) {
                  case 'option1':
                     queryState.amountLogic = 0;
                     break;
                  case 'option2':
                     queryState.amountLogic = 1;
                     break;
                  case 'option3':
                     queryState.amountLogic = 2;
                     break;
                  case 'option4':
                     queryState.amountLogic = 3;
                     break;
                  case 'option5':
                     queryState.amountLogic = 4;
                     break;
                  case 'option6':
                     queryState.amountLogic = 5;
                     break;
                  default:
                     console.log("No case recognized.");
               }
            }

            $('#api-loading').show();
            init(queryState);
         }
      }
   });
});