/**
 * Created by joniweiss on 7/24/15.
 */
var app = angular.module("QueerCon", [
    "ui.router",
    "smoothScroll"
    ]);

app.config(
    [         '$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
      // // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/#");

      $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "templates/home.html",
            controller: 'MainCtrl'
          })
        .state('workshops', {
            url: "/workshops",
            templateUrl: 'templates/workshops.html',
            controller: 'workshopsCtrl'
        })
        .state('schedule', {
            url: "/schedule",
            templateUrl: 'templates/schedule.html',
            controller: 'workshopsCtrl'
        })
        .state('keynote', {
            url: "/keynote",
            templateUrl: 'templates/keynote.html',
            controller: 'DefaultCtrl'
        })
        .state('map', {
            url: "/map",
            templateUrl: "templates/map.html",
            controller: 'DefaultCtrl'
        })
        .state('aboutUs', {
            url: "/aboutUs",
            templateUrl: "templates/about.html",
            controller: 'DefaultCtrl'
        });
      }
    ]
);

app.directive('countdown', [
    'Util',
    '$interval',
    function (Util, $interval) {
        return {
            restrict: 'A',
            scope: { date: '@' },
            link: function (scope, element) {
                var future;
                future = new Date(scope.date);
                $interval(function () {
                    var diff;
                    diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                    console.log(diff);
                    return element.text(Util.dhms(diff));
                }, 1000);
            }
        };
    }
]);

app.factory('Util', [function () {
    return {
        dhms: function (t) {
            var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            return [
                days + 'd',
                hours + 'h',
                minutes + 'm',
                seconds + 's'
            ].join(' ');
        }
    };
}]);


app.directive('backToTop', [function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<a href="#" class="back-to-top">Back to Top</a>',
        link: function(scope, element) {

            var amountScrolled = Math.round(screen.height * 0.5);


            scope.button = element.find('button');

            scope.button.on('click', function() {
                document.body.animate({ scrollTop: 0 }, 'fast');
                element.removeClass('show');
            });

            window.addEventListener('scroll', function() {
                if ($(window).scrollTop() > amountScrolled) {
                     $('a.back-to-top').fadeIn('slow');
                 } else {
                     $('a.back-to-top').fadeOut('slow');
                 }
            });
        }
    };

}]);


app.directive('copyrightString', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        template: '<span class="fa fa-copyright"></span>',
        link:  function (scope, element) {
            var thisYear = new Date().getFullYear();
            var openYear = 2015;
            var companyName = "Utah Pride Center -- 1to5 Club, Salt Lake City, Utah";
            var jcopyright = " Copyright " + openYear;
            if ( thisYear === openYear ) {
                 jcopyright += ", " + companyName;
            } else {
                 jcopyright += " - " + thisYear + ", " + companyName;
            }
            element.text(jcopyright);
        }
    };
});

app.controller('DefaultCtrl', ['$scope', 'smoothScroll',
  function($scope, smoothScroll) {
    var element = document.getElementById('scrollToHere');
    var options = {
        duration: 700,
        offset: 35,
        easing: 'easeInQuad'
    };
    smoothScroll(element, options);  }
]);

app.controller('workshopsCtrl', ['$scope', '$http', 'smoothScroll',
  function($scope, $http, smoothScroll) {
    $http.get('js/workshops.json').success(function(data) {
      $scope.workshops = data;
      $scope.oneAtATime = true;
    });
    var element = document.getElementById('scrollToHere');
    var options = {
        duration: 700,
        offset: 35,
        easing: 'easeInQuad'
    };
    smoothScroll(element, options);
  }
]);

app.controller('MainCtrl', ['$scope',
    function ($scope) {
      $scope.message = "Welcome to JitterBug";
    }
]);
