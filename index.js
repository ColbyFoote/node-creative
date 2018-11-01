angular.module('Chat', [])
.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello world!';

  $scope.posts = postFactory.posts;
  
  $scope.heroes = postFactory.heroes;
  
  $scope.currentPage = "Home"
  
  $scope.isHome = true;

  $scope.addPost = function(){
    if($scope.formContent === '') { return; }
    $scope.posts.push({
      title: $scope.formContent,
      upvotes: 0,
      comments: [
      ]
    });
    $scope.formContent = '';
  };

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
  $scope.filterPosts = function(post){
    $scope.posts = postFactory.posts.filter(stored => stored.hero == post.hero);
    $scope.currentPage = post.hero
    $scope.isHome = false;
  }
  $scope.goHome = function(){
    $scope.posts = postFactory.posts;
    $scope.currentPage = "Home"
    $scope.isHome = true;
  }
  $scope.userPage = function(hero){
    $scope.posts = postFactory.posts.filter(post => post.hero == hero);
    $scope.currentPage = post.hero
    $scope.isHome = false;
  }

}]);