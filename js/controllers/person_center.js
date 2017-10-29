
app.controller('person_center', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        console.log($scope);

        // 如果userid不存在，返回
        $scope.User = {};	// 初始化数据
         //加载用户详细信息
        if(!$scope.data.userinfo || !$scope.data.userinfo.UserID)
        {
            global.do_logout();
        }
        else
        {
            $scope.getUserDetail();
        }
    }

    $scope.getUserDetail = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getUserDetail,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                UserID: $scope.data.userinfo.UserID
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.User = oData.User;
                $scope.User.Photos_Json = oData.User.Photos_Json ? oData.User.Photos_Json.split(",") : [];
            });
        }, [], function(oData){
            alert("您需要重新登陆。", function(){
                global.do_logout();
            });
        });
    }

    $scope.logout = function(){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.logout,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                UserID: session.userinfo.id
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                global.do_logout();
            });
        },[],function(){
            global.do_logout();
        });
    }

    $scope.myInfo = function()
    {
        window.session.userinfo = $scope.User;
        global['goto']("person_myInfo");
    }


    $scope.myReservation = function()
    {
        global['goto']("person_myReservation");
    }

    $scope.myCollect = function()
    {
        window.session.UserID = $scope.User.UserID;
        global['goto']("person_myCollect");
    }

    $scope.getMyFeedbacks = function ()
    {
        window.session.UserID = $scope.User.UserID;
        global['goto']("person_help");
    }

    $scope.getMyComments = function()
    {
        window.session.User = $scope.User;
        global['goto']("person_myComment");
    }


    //跳转到MyPic页面
    $scope.showMyPics = function(User)
    {
        window.session.User = User;
        global['goto']("person_myPics");
    }
});