//API 地址 http://jasonsonic.cloudapp.net/Help
app.controller('regis_mobile', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });
	
    function initPage() {
        $scope.settings = settings;
        
    }

    var signPact = false; //是否阅读签署了协议
    var domPact = $('.readPact'),curClass = 'select';

    $scope.regis = {
        mobile: '',
        has_checked: true
    };
	

    //href="regis_setmesg.html"
    //下一步按钮单击处理事件
    $scope.Next = function () {
        if (!$scope.regis.mobile) {
            alert('请输入手机号码');
            return false;
        }
        if (!global.REG.PHONE.test($scope.regis.mobile)) {
            alert('手机号码格式非法');
            return false;
        }
        if (!domPact.hasClass(curClass)) {
            alert('请仔细阅读服务条款');
            return false;
        }

        //发送验证码到手机
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.sendSMS,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                mobile: $scope.regis.mobile
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            window.session.regis = {
                mobile: $scope.regis.mobile,
            };
            global['goto']("regis_setmesg");
        });
    }

    $scope.signPact = function () {
        var $html = "<div class='abody'>";
        $html += "<div class='txt'>这里要添加协议内容</div>";
        $html += "</div>";

        new MyMsg({
            txtContent: $html,
            isBtnOkHide: false,
            isBtnCancelHide: true,
        });
    }

    //发送验证码到手机
    function sendVercode(mobile,fnSucc) {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.sendSMS,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                mobile: mobile
            }
        };
        global.ajax_data($scope, param, function (oData) {
            fnSucc && fnSucc(oData);
        },'0000');
    }


});