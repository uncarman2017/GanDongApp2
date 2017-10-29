

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/index', {
          templateUrl: 'templates/index.html',   
          controller: 'index'
      })
      .when('/index_search', {
          templateUrl: 'templates/index_search.html',   
          controller: 'index_search'
      })
      .when('/index_searchInput', {
          templateUrl: 'templates/index_searchInput.html',   
          controller: 'index_searchInput'
      })
      .when('/upload_file', {
          templateUrl: 'templates/upload_file.html',
          controller: 'upload_file'
      })
      .when('/forgetpwd_mobile', {
          templateUrl: 'templates/forgetpwd_mobile.html', 
          controller: 'forgetpwd_mobile'
      })
      .when('/forgetpwd_setpwd', {
          templateUrl: 'templates/forgetpwd_setpwd.html', 
          controller: 'forgetpwd_setpwd'
      })
      .when('/login', {
          templateUrl: 'templates/login.html', 
          controller: 'login'
      })
      .when('/regis_mobile', {
          templateUrl: 'templates/regis_mobile.html', 
          controller: 'regis_mobile'
      })
      .when('/regis_setmesg', {
          templateUrl: 'templates/regis_setmesg.html', 
          controller: 'regis_setmesg'
      })

      .when('/group_detail', {
          templateUrl: 'templates/group_detail.html', 
          controller: 'group_detail'
      })
      .when('/coach_detail/:id', {
          templateUrl: 'templates/coach_detail.html', 
          controller: 'coach_detail'
      })
      .when('/coach_list', {
          templateUrl: 'templates/coach_list.html', 
          controller: 'coach_list'
      })

      .when('/gym_debug', {
          templateUrl: 'templates/gym_debug.html', 
          controller: 'gym_debug'
      })
      .when('/gym_list', {
          templateUrl: 'templates/gym_list.html', 
          controller: 'gym_list'
      })
      .when('/gym_detail/:id', {
          templateUrl: 'templates/gym_detail.html', 
          controller: 'gym_detail'
      })
      .when('/club_list', {
          templateUrl: 'templates/club_list.html', 
          controller: 'club_list'
      })
      .when('/club_detail/:id', {
          templateUrl: 'templates/club_detail.html', 
          controller: 'club_detail'
      })
      .when('/person_center', {
          templateUrl: 'templates/person_center.html',
          controller: 'person_center'
      })
      .when('/person_feedback', {
          templateUrl: 'templates/person_feedback.html', 
          controller: 'person_feedback'
      })
      .when('/person_help', {
          templateUrl: 'templates/person_help.html', 
          controller: 'person_help'
      })
      .when('/person_myCollect', {
          templateUrl: 'templates/person_myCollect.html', 
          controller: 'person_myCollect'
      })
      .when('/person_myComment', {
          templateUrl: 'templates/person_myComment.html', 
          controller: 'person_myComment'
      })
      .when('/person_myInfo', {
          templateUrl: 'templates/person_myInfo.html', 
          controller: 'person_myInfo'
      })
      .when('/person_myMesg', {
          templateUrl: 'templates/person_myMesg.html', 
          controller: 'person_myMesg'
      })
      .when('/person_myPics', {
          templateUrl: 'templates/person_myPics.html',
          controller: 'person_myPics'
      })
      .when('/person_myReservation', {
          templateUrl: 'templates/person_myReservation.html',
          controller: 'person_myReservation'
      })
      .when('/person_reservationDetail/:id', {
          templateUrl: 'templates/person_reservationDetail.html', 
          controller: 'person_reservationDetail'
      })
      .when('/course_appointment', {  // 新建预约
          templateUrl: 'templates/course_appointment.html', 
          controller: 'course_appointment'
      })
      .when('/course_appointment/:id', {  // 编辑预约
          templateUrl: 'templates/course_appointment.html', 
          controller: 'course_appointment'
      })
      .when('/course_cancel/:id', {
          templateUrl: 'templates/course_cancel.html', 
          controller: 'course_cancel'
      })
      .when('/course_error/:id', {
          templateUrl: 'templates/course_error.html', 
          controller: 'course_error'
      })
      .when('/course_coach', {
          templateUrl: 'templates/course_coach.html', 
          controller: 'course_coach'
      })
      .when('/course_load/:id', {
          templateUrl: 'templates/course_load.html', 
          controller: 'course_load'
      })
      .when('/course_success/:id', {
          templateUrl: 'templates/course_success.html', 
          controller: 'course_success'
      })
      
      .when('/submit_comment', {
          templateUrl: 'templates/submit_comment.html', 
          controller: 'submit_comment'
      })
      .when('/pics', {
          templateUrl: 'templates/pics.html', 
          controller: 'pics'
      })
      .otherwise({redirectTo: '/index'});
});


