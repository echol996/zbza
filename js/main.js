var Wlife = angular.module('Wlife', ['ionic', 'ui.router'])
Wlife.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when('', '/main/home');
		$stateProvider
			.state('main', { /////主要功能页面
				url: '/main',
				templateUrl: 'page/main.html'
			})
			.state('main.home', { ////主页
				url: '/home',
				templateUrl: 'page/home.html',
				controller: 'homeCtrl'
			})
			.state('charpter', { ///  分类页
				url: '/charpter',
				templateUrl: 'page/charpter.html',
				controller: 'charpterCtrl'
			})
			.state('detail', { //限时特卖
				url: '/detail',
				templateUrl: 'page/detail.html',
				controller: 'detailCtrl'
			})

	}])
	.controller('zbzIndex', function($ionicHistory,$ionicModal, $scope, $ionicActionSheet, $timeout, $http, $location, $rootScope, $ionicLoading) {
		$scope.info = {
			'now': 'home',
			'detail':1,
			'map':"no",
		};
		$scope.goBack=function(){
			$ionicHistory.goBack();
		}
		//轮播图
		$http.get('data/homeData/banner.json').success(function(data) {
			$scope.b = data;
			//延时轮播图生效
			$timeout(function() {
				$scope.swiper = new Swiper('.swiper-container', {
					direction: 'horizontal',
					loop: true,
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					// 如果需要分页器
					pagination: '.swiper-pagination'
				})
			}, 100)
		});
		//今日精选
		$http.get('data/homeData/active.json').success(function(data) {
			$scope.active = data;
		});
		
		$scope.goCharpter = function(num) {
			$location.path('/charpter');
			$rootScope.num = num;
		}
		
	})
	.controller('homeCtrl', function(moveSmart,$location,$ionicLoading, $ionicModal, $scope, $ionicActionSheet, $timeout, $http) {
			moveSmart.scroll();
			$timeout(function() {
				$scope.swiper = new Swiper('.swiper-container', {
					direction: 'horizontal',
					loop: true,
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					// 如果需要分页器
					pagination: '.swiper-pagination'
				})
			}, 100);
			$scope.toDayDetailShow = function(e) {
				$location.path('/detail');
				$scope.info.detail = e
			}
			})
		.controller('charpterCtrl', function(moveSmart,$ionicModal,$scope, $ionicActionSheet, $timeout, $http, $rootScope, $ionicLoading) {
			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			$scope.time = moveSmart.getTime();
			
			$http.get('data/homeData/banner.json').success(function(data) {
				$scope.bb = data[$rootScope.num - 1];
				console.log($scope.bb)
				$ionicLoading.hide();
			});
			$ionicModal.fromTemplateUrl('templates/modal.html', {
			    scope: $scope
			  }).then(function(modal) {
			    $scope.modal = modal;
			  });
			   $scope.createContact = function(u) {  
			  	console.log(u)
			    if(u==undefined || u==""){
			    		alert("请输入内容")
			    }
			    else{
				    	$scope.bb.comment.push({"img":"https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=4870f53f0b087bf462ec50e9c2d2575e/d439b6003af33a87bcb5ca6ecf5c10385243b5ee.jpg","name":"测试用户","time":$scope.time,"comment":u});
				    $scope.modal.hide();
			    }
			  };

		})
		.controller('detailCtrl', function($ionicModal,moveSmart,$scope, $ionicActionSheet, $timeout, $http, $rootScope, $ionicLoading) {
				$scope.info.map="no";
				moveSmart.scroll();
				
				$ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				});
				$http.get('data/homeData/activeDetail/activeDetail' + $scope.info.detail + '/activeDetail.json').success(function(data) {
					$scope.abc = data[0];
					$scope.pinFen = "star"+data[0].pinFen;
					$timeout(function() {
						$scope.swiper = new Swiper('.swiper-container', {
							direction: 'horizontal',
							loop: true,
							autoplay: 3000,
							autoplayDisableOnInteraction: false,
							// 如果需要分页器
							pagination: '.swiper-pagination'
						})
					}, 100);
					$ionicLoading.hide();
				});
				$scope.goMap=function(e){
				
					$scope.info.map="yes";
					var map = new BMap.Map("allmap");          
					map.centerAndZoom('武汉',11);
					var local = new BMap.LocalSearch(map, {
						renderOptions:{map: map}
					});
					local.search(e);
				}
			
		})