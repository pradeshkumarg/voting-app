(function() {

  var app = angular.module('app', ['ngRoute', 'angular-jwt']);

  app.run(function($http,$rootScope) {
    http.defaults.headers.common.Authorization = 'Bearer '+ $window.localStorage.token;
    $rootScope.$on('$routeChangeStart',(event,nextRoute,currentRoute)=>{
      if(nextRoute.access.restricted !== undefined && nextRoute.access.restricted === true)


      
    })
  });

  app.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
      templateUrl: './templates/main.html',
      controller: 'MainController',
      controllerAs: 'vm',
      access:{
        restricted:false
      }
    });

    $routeProvider.when('/login', {
      templateUrl: './templates/login.html',
      controller: 'LoginController',
      controllerAs: 'vm',
      access:{
        restricted:false
      }
    });

    $routeProvider.when('/register', {
      templateUrl: './templates/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm',
      access:{
        restricted:false
      }
    });

    $routeProvider.when('/polls', {
      templateUrl: './templates/polls.html',
      controller: 'PollsController',
      controllerAs: 'vm',
      access:{
        restricted:false
      }
    });

    $routeProvider.when('/polls/:id', {
      templateUrl: './templates/poll.html',
      controller: 'PollController',
      controllerAs: 'vm',
      access:{
        restricted:false
      }
    });

    $routeProvider.when('/profile', {
      templateUrl: './templates/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vm',
      access:{
        restricted:true
      }
    });

    $routeProvider.otherwise('/');
  });

  app.controller('MainController', MainController);
  function MainController($location, $window) {
    var vm = this;
    vm.title = 'MainController';
  }

  app.controller('LoginController', LoginController);
  function LoginController($location, $window, $http) {
    var vm = this;
    vm.title = 'LoginController';

    vm.login = ()=> {
      if(vm.user){
        $http.post('/api/login',vm.user).then((response)=>{
          console.log(response);
          console.log("success in logging in");
          $window.localStorage.token = response.data;
          $location.path('/profile');
        },(err)=>{
          vm.err = err;
        });
      }else {
        console.log('No credentials supplied !');
      }
    }
  }

  app.controller('RegisterController', RegisterController);
  function RegisterController($location, $window, $http) {
    var vm = this;
    vm.title = 'RegisterController';
    vm.err = '';

    vm.register = function() {
      if(!vm.user){
        console.log("Invalid credentials");
        return;
      }
      $http.post('/api/register',vm.user)
        .then(function(response) { //promises
          $window.localStorage.token = response.data;
          $location.path('/profile');
        }, function(err) {
          vm.err = err.data.errmsg;
          console.log(err);
        });
    }
  }

  app.controller('PollsController', PollsController);
  function PollsController($location, $window) {
    var vm = this;
    vm.title = 'PollsController';
  }

  app.controller('PollController', PollController);
  function PollController($location, $window) {
    var vm = this;
    vm.title = 'PollController';
  }

  app.controller('ProfileController', ProfileController);
  function ProfileController($location, $window, jwtHelper) {
    var vm = this;
    vm.title = 'ProfileController';
    vm.user=null;
    var token = $window.localStorage.token;
    var payload = jwtHelper.decodeToken(token).data;
    if(payload){
      vm.user=payload;
    }

  }


}());
