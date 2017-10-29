
app.controller('person_myInfo', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        $scope.User = $scope.data.userinfo;
    }
    
    $scope.UpdateUserInfo = function()
    {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.updateUserInfo,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                NewUserInfo: $scope.User
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            global['goto']("person_center");
        });
    }
});