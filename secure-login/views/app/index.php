<?php

/*
 * Author: Alex Dodge
 * Date  : September 8, 2016
 * Description:
 *    This application is designed for use with google visulization api and querying google sheets.
 *    Using the api and it's associated query language it is possible to submit and retrieve specific
 *    data from a publicly linked google sheet. This database like interaction can then be processed
 *    into a table or another form of graphical representation.
 */

?>

<html class="no-js" lang="en">

   <head>

      <meta charset="utf-8">
      <title>Student Scholarship Search</title>
      
      <meta name="description" content="This is an application which allows the query
      and retrieval of student information stored within google sheets.">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <link rel="shortcut icon" href="/favicon.ico">
      <link rel="apple-touch-icon" href="/apple-touch-icon.png">

      <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
      <link type="text/css" rel="stylesheet" href="./css/main.css">

   </head>
   
   <body>
      <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->

      <div class="container">

         <div class="header">
            <div class="container-fluid">
               <div id="app-nav" class="navbar navbar-default navbar-fixed-top" role="navigation">

                  <div class="navbar-brand">
                     <span class="glyphicon glyphicon-user large-user"></span>
                  </div>
                  <h2 class="app-header">Student Scholarship Finder</h2>
                  
                  <ul class="nav pull-right return">
                     <li class="">
                        <!-- Return to the hosting sites main webpage -->
                        <a class="btn btn-primary" href="index.php?logout">
                           Logout
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         

         <div class="space" style="margin-top: 80px;"></div>
         
         <!--  
         <div class="introduction">Use the fields below to search for and sort information from the
         student information sheet concerning scholarships.</div>-->
         
         <!--
         <div class="space" style="margin-top: 25px;"></div>

         <div class="info-section">Note that for google sheets, the columns are not referenced by the 
         actual name, but the ID. So for google sheets, if you wanted to select the first column, you
         would input <b>SELECT A</b>. This would print out only the first column. You would add functionality
         which reads the input and translates what the user inputs so that they could write the actual
         columns.</div> -->

         <div class="space" style="margin-top: 25px;"></div>

         <form id="google-sheet-query">

            <!-- The input for determining what fields to search with -->
            <div class="form-group form-group-initial">

               <div class="search-title">
                  What would you like to search by?
               </div>

               <div class="checkbox">
                  <input id="student-checkbox" type="checkbox">
                  <label for="student-checkbox"> <span class="check-label-center">Student Name</span> </label>
               </div>

               <div class="checkbox">
                  <input id="school-checkbox" type="checkbox">  
                  <label for="school-checkbox"> <span class="check-label-center">School</span> </label>
               </div>

               <div class="checkbox">
                  <input id="amount-checkbox" type="checkbox"> 
                  <label for="amount-checkbox"> <span class="check-label-center">Scholarship Amount</span> </label>
               </div>

            </div>

            <div id="error-container" class="hide">
               <span class="exclaim glyphicon glyphicon-exclamation-sign pull-left"></span> 
               <h4 id="error-message">
                  There are errors in your search. Please make sure each field is filled in below.
               </h4>
            </div>

            <!-- Name search form section -->
            <div class="name-filter-container">
               <h2 class="name-title"><b>Search by Name</b></h2>
               <h4> 
                  Enter the first and last name of the student.
               </h4>

               <!-- The form input for the unique Google Sheets URL -->
               <div class="form-group">
                  <label class="control-label hide" for="first-name">Please enter a first name</label>
                  <input type="text" class="form-control" id="first-name" placeholder="First name here" aria-describedby="sizing-addon1">
               </div>

                  <div class="space" style="margin-top: 10px;"></div>

               <div class="form-group">                  
                  <label class="control-label hide" for="first-name">Please enter a last name</label>
                  <input type="text" class="form-control" id="last-name" placeholder="Last name here" aria-describedby="sizing-addon1">
               </div>
               
            </div>

            <!-- School search form section -->
            <div class="school-filter-container">
               <h2 class="school-title"><b>Search by School</b></h2>
               <p> 
                  Check whether you would like to search by junior high or elementary, then select the desired
                  school from the appropriate dropdown menu.
               </p>

               <!-- The form input for the unique Google Sheets URL -->
               <div class="form-group">
                  
                  <div class="container-fluid school-radio">
                     <div class="row">
                        <div class="form-group radio radio-info col-xs-12 col-md-4">
                           <div class="control-label hide">Please select an option</div>
                           <input type="radio" name="optionsRadios" id="school-radio1" value="option1">
                           <label for="school-radio1"><span class="school-title-label">Junior High School</span></label>
                        </div>
                        
                        <!-- Junior High School List -->
                        <div class="col-xs-12 col-md-8">                           
                           <span class="dropdown-error glyphicon glyphicon-exclamation-sign pull-right hide"></span>
                           <select id="junior-high-select" class="form-control">
                              <option class="default">Click to choose a junior high school</option>
                              <option>Bigger Junior High School</option>
                              <option>Sunny Hill Junior High School</option>
                              <option>Babbling Brook Junior High School</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div class="space" style="margin-top: 10px;"></div>

                  <div class="container-fluid school-radio">
                     <div class="row">
                        <div class="form-group radio radio-info col-xs-12 col-md-4">
                           <div class="control-label hide">Please select an option</div>
                           <input type="radio" name="optionsRadios" id="school-radio2" value="option2">
                           <label for="school-radio2"><span class="school-title-label">Elementary School</span></label>
                        </div>
                        
                        <!-- Junior High School List -->
                        <div class="col-xs-12 col-md-8">
                           <span class="dropdown-error glyphicon glyphicon-exclamation-sign pull-right hide"></span>
                           <select id="elementary-select" class="form-control">
                              <option class="default">Click to choose an elementary school</option>
                              <option>Little Elementary School</option>
                              <option>Sprout Elementary School</option>
                              <option>Sunflower Elementary School</option>
                           </select>
                        </div>
                     </div>
                  </div>

               </div>
               
            </div>

            <!-- Scholarship search form section -->
            <div class="amount-filter-container">
               <h2 class="amount-title"><b>Search by Amount</b></h2>
               <p> 
                  First choose whether you would like to search for a specific amount, an
                  amount less than the specified number, greater, or between. All of the
                  searches are inclusive of the entered number.
               </p>

               <!-- The form input for the unique Google Sheets URL -->
               <div class="form-group">

                  
                  <div class="container-fluid">
                     <div class="row">
                        <div class="col-xs-12 col-md-4">
                           <div id="error-warning-amount" class="control-label hide">Please select an option</div>
                           <div class="form-group radio">
                              <input type="radio" name="amountRadios" id="amountRadios1" value="option1">
                              <label for="amountRadios1"><span class="school-title-label">Equal to</span></label>
                           </div>
                           
                           <div class="form-group radio">
                              <input type="radio" name="amountRadios" id="amountRadios2" value="option2">
                              <label for="amountRadios2"> <span class="school-title-label"> Greater than</span> </label>
                           </div>

                           <div class="form-group radio">
                              <input type="radio" name="amountRadios" id="amountRadios3" value="option3">
                              <label for="amountRadios3"> <span class="school-title-label">Less than</span> </label>
                           </div>

                           <div class="form-group radio">
                              <input type="radio" name="amountRadios" id="amountRadios4" value="option4">
                              <label for="amountRadios4"> <span class="school-title-label">Greater than or equal to</span></label>
                           </div>


                           <div class="form-group radio">
                              <input type="radio" name="amountRadios" id="amountRadios5" value="option5">
                              <label for="amountRadios5"> <span class="school-title-label">Less than or equal to</span> </label>
                           </div>

                           <div class="form-group radio">
                              <input type="radio" name="amountRadios" id="amountRadios6" value="option6">
                              <label for="amountRadios6"> <span class="school-title-label">Between</span> </label>
                           </div>
                        </div>

                        <div class="amount-section-container col-xs-12 col-md-6">
                           <div class="container-fluid">
                              <div class="row">
                                 
                                 <div class="form-group">
                                    <label class="control-label has-error hide" for="first-scholar-amount">
                                       Please enter a positive number
                                    </label>
                                    <input type="text" class="form-control" id="first-scholar-amount"           
                                       placeholder="First amount">
                                 </div>

                                 <div class="middle-text col-md-12">
                                    and
                                 </div>

                                 <div class="form-group">
                                    <label class="control-label has-error hide" for="second-scholar-amount">
                                       Please enter a positive number
                                    </label>
                                    <input type="text" class="form-control" id="second-scholar-amount" 
                                             placeholder="Second amount">
                                 </div>

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
            </div>

            <div class="submit-section">
               <div id="submit-query" class="btn btn-success disabled">Start Search</div>
               <div class="reset-form btn btn-info disabled">Reset Form</div>
               <img id="api-loading" src="images/loading.gif">
            </div>
         </form>

         <div class="space" style="margin-top: 50px;"></div>

         <div class="output-section">
            <div class="header">
               <h3 class="output-title">Search Output</h3>

               <div class="options-panel">
                  <div id="to-pdf" class="btn btn-primary">Save to PDF</div>
                  <div id="print-button" class="btn btn-info">Print Output</div>
               </div>
            </div>

            <!-- Begin Student Overview -->
            <div id="student-overview" class="student-overview-container"> 

               <div class="student-overview-title">
                  <div class="student-overview-scholarship">
                     Scholarship Amount: 
                  </div>
                  <div class="student-overview-personal">
                     <h2 class="student-overview-name"></h2>
                     <small class="student-overview-address"></small>
                  </div>
                  <div class="student-overview-schools">
                     <p></p>
                  </div>
                  <div class="divider"></div>
               </div>


               <div class="student-overview-bio">
                  <p> </p>
               </div>
            </div> 
            <!-- End of Student Overview -->

            <div id="no-student" class="hide">There is no student stored with that information.</div>
            <div id="table-output">


            </div>

         </div>

         <div class="space" style="margin-top: 50px;"></div>

         <div class="footer">
            <p>Alex Dodge &copy; 2016 </p>
         </div>

      </div>

   
      <script type="text/javascript" src="bower_components/jquery/dist/jquery.js"></script>
      <script type="text/javascript" src="https://www.google.com/jsapi"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

      <script type="text/javascript" src="node_modules/bootstrap-sass/assets/javascripts/bootstrap-sprockets.js"></script>
      <script type="text/javascript" src="node_modules/bootstrap-sass/assets/javascripts/bootstrap.js"></script>


      <script type="text/javascript" src="scripts/jspdf.debug.js"></script>
      <script type="text/javascript" src="scripts/from_html.js"></script>
      <script type="text/javascript" src="scripts/addhtml.js"></script>
      <script type="text/javascript" src="scripts/png_support.js"></script>
      <script type="text/javascript" src="scripts/split_text_to_size.js"></script>
      <script type="text/javascript" src="scripts/standard_fonts_metrics.js"></script>
      <script type="text/javascript" src="scripts/main.js"></script>

   </body>
</html>
