
app.controller('forgetpwd_setpwd', function ($scope, $routeParams) {
    var urlParm = global.getUrlParm();

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });
   
    function initPage() {
        $scope.settings = settings;
        $scope.set = {
            mobile: urlParm.mobile.slice(0, 3) + '****' + urlParm.mobile.slice(-4)
        };
        $scope.value = {
            verCode: '111111',
            newPwd: ''
        };
    }

    $scope.submit = function () {
        alert("该功能暂时关闭，请直接联系管理员。");
        return false;

        if (!$scope.value.verCode) {
            alert('请输入验证码');
            $("#txtValidateCode").focus();
            return false;
        }
        if (!global.REG.SIXNUM.test($scope.value.verCode)) {
            alert('验证码格式错误');
            $("#txtValidateCode").focus();
            return false;
        }
       
        if (!$scope.value.newPwd) {
            alert('请设置您的新密码');
            $("#txtNewPwd").focus();
            return false;
        }
        if (!global.REG.PASSWORD.test($scope.value.newPwd)) {
            alert('登录密码格式错误');
            $("#txtNewPwd").focus();
            return false;
        }

        var param = {
            _method: 'post',
            _url: global.APIIP + settings.ajax_url.updatePwd,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                //UserID: session.userinfo.id,
                UserID: 0,
                NewPwd: $scope.value.newPwd,
                Mobile: urlParm.mobile,
                ValidationCode: $scope.value.verCode
            }
        };
        global.ajax_data($scope, param, function (oData) {
            global.changeURL('login', { mobile: urlParm.mobile });
        }, '0000');
    }
});