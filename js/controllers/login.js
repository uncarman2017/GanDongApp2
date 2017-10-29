
app.controller('login', function ($scope, $routeParams) {
    var urlParm = global.getUrlParm();

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });
    function initPage() {
        $scope.settings = settings;
        $scope.login = {
            mobile: urlParm.mobile,
            pwd: '',
            "mobile": "18939748695",
            "pwd": "redmaple"
        };
    }

    //登录页面提交按钮单击事件
    $scope.Submit = function () {
        if ($scope.login.mobile == "") {
            alert('请输入手机号码');
            $("input[type='tel']").focus();
            return false;
        }
        if ($scope.login.pwd == "") {
            alert('请输入密码');
            $("input[type='password']").focus();
            return false;
        }
        if (!global.REG.PHONE.test($scope.login.mobile)) {
            alert('手机号码格式非法');
            return false;
        }

        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.login,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + btoa($scope.login.mobile + ":" + $scope.login.pwd)
            }
        };
        global.ajax_data($scope, param,
            function (responseData) {
                console.log(responseData);
                session.userinfo = {};
                session.userinfo.id = responseData.User.UserID;
                session.userinfo.UserID = responseData.User.UserID;
                session.userinfo.username = responseData.User.NickName;
                session.userinfo.sex = responseData.User.Sex;
                session.userinfo.mobile = responseData.User.Mobile;
                session.userinfo.role = responseData.User.UserType;
                session.token = responseData.Token.AuthToken;
                // if(session.from)
                // {
                //     global.goto(session.from);
                // }
                // else
                // {
                    global.goto('index');
                // }
            },[],function(){
                alert("登录失败，请输入正确的用户名和密码");
            });
    }

    //注册入口点击事件
    $scope.Register = function () {
        global.changeURL('regis_mobile');
    }

    //忘记密码入口点击事件
    $scope.ForgetPwd = function () {
        global.changeURL('forgetpwd_mobile');
    }

});