
app.controller('person_feedback', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        if(!$scope.data.userinfo || !$scope.data.userinfo.UserID)
        {
            window.session.from = "person_feedback";
            global.do_logout();
        }

        $scope.MyFeedback = {
            Title: "",
            Content:"",
            Photos:[]
        }

    }

    $scope.submitFeedback = function()
    {
        if(!$scope.MyFeedback.Title)
        {
            alert("请输入标题");
            return false;
        }
        else if(!$scope.MyFeedback.Content)
        {
            alert("请输入内容");
            return false;
        }
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.submitFeedback,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                Title: $scope.MyFeedback.Title,
                Content: $scope.MyFeedback.Content,
                Photos: $scope.MyFeedback.Photos,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                alert("谢谢您的意见，我们会及时跟进的。", function(){
                    global['goto']("person_help");
                });
                
            });

        });
    }

});