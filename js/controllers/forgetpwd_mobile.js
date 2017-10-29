
app.controller('forgetpwd_mobile', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        $scope.login = angular.isObject($scope.login)
             ? angular.extend($scope.login, {mobile:""})
             : {mobile:""};
    }

    $scope.Next = function () {
        if ($scope.login.mobile == "") {
            alert('请输入手机号码');
            $("input[type='tel']").focus();
            return false;
        }
        
        if (!global.REG.PHONE.test($scope.login.mobile)) {
            alert('手机号码格式非法');
            return false;
        }
        global.changeURL('forgetpwd_setpwd', { mobile: $scope.login.mobile });
    }

    $scope.Register = function () {
        global.changeURL('regis_mobile');
    }

    $scope.Login = function () {
        global.changeURL('login');
    }

});