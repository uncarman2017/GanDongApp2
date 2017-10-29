
app.controller('regis_setmesg', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();

        $scope.set = {
            validity: 300,
            vercode: 10,
            mobile: $scope.data.regis.mobile.slice(0, 3) + '****' + $scope.data.regis.mobile.slice(-4)
        };

        $scope.value = {
            vercode: "111111",
            userName: "",
            loginPwd: ""
        };

    });

    function initPage() {
        $scope.settings = settings;
        console.log($scope.data);
    }

    var domGetcode = $('.getVercode'),
        grayClass = 'notGetcode',
        setIntervalID= null;
    var isGetAgain = false;

    $scope.getVercode = function () {
        if (isGetAgain) {
            sendVercode(urlParm.mobile, function () {
                $scope.decreasing();
            })            
        }
    }

    $scope.decreasing = function () {
        setIntervalID = setInterval(function () {
            if ($scope.set.vercode == 0) {
                clearInterval(setIntervalID);
                domGetcode.removeClass(grayClass).html('重新发送');
                isGetAgain = true;
                $scope.set.vercode = 10;
            } else {
                domGetcode.addClass(grayClass).html($scope.set.vercode + '秒后重新发送');
                $scope.set.vercode--;
            }
        }, 1000)
    }

    $scope.submit = function () {
        if (!$scope.value.vercode) {
            alert('请输入验证码');
            $("#txtValidateCode").focus();
            return false;
        }
        if (!global.REG.SIXNUM.test($scope.value.vercode)) {
            alert('验证码格式错误');
            $("#txtValidateCode").focus();
            return false;
        }
        if (!$scope.value.userName) {
            alert('请设置您的用户名');
            $("#txtUserName").focus();
            return false;
        }
        if (!global.REG.USERNAME.test($scope.value.userName)) {
            alert('用户名格式错误,必须是4~20位的数字字母或中文');
            $("#txtUserName").focus();
            return false;
        }
        if (!$scope.value.loginPwd) {
            alert('请设置您的登录密码');
            $("#txtPwd").focus();
            return false;
        }
        if (!global.REG.PASSWORD.test($scope.value.loginPwd)) {
            alert('登录密码格式错误');
            $("#txtPwd").focus();
            return false;
        }

        //注册新用户
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.register,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                ValidationCode: $scope.value.vercode,
                NewUser: {
                    Mobile: $scope.data.regis.mobile,
                    MobileInfo: $scope.data.regis.mobile,
                    LoginPwd: $scope.value.loginPwd,
                    NickName: $scope.value.userName,
                    Sex: 1,
                    Age: 1,
                    PersonalSign: "",
                }
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            session.userinfo = {};
            session.userinfo.id = oData.User.UserID;
            session.userinfo.UserID = oData.User.UserID;
            session.userinfo.username = oData.User.NickName;
            session.userinfo.sex = oData.User.Sex;
            session.userinfo.mobile = oData.User.Mobile;
            session.userinfo.role = oData.User.UserType;
            session.token = oData.Token.AuthToken;
            global.goto('index');
        },[],function(){
            alert("填入信息有误，请重新尝试。");
        });
    }

    //发送验证码到手机
    function sendVercode(mobile, fnSucc) {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + "/api/ValidateRegister",
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                mobile: mobile
            }
        };
        global.ajax_data($scope, param, function (oData) {
            fnSucc && fnSucc(oData);
        });
    }

});