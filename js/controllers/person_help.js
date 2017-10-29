
app.controller('person_help', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();

        $scope.pageNo = 1;
        $scope.pageSize = settings.pageSize;

        var default_helps = [
            {
                id:1000,
                Title: "第一次注册进入该如何找到教练",
                Content: "第一次注册进入该如何找到教练"
            },
            {
                id:1001,
                Title: "如果预约了课程临时有事没去会扣肌点吗",
                Content: "如果预约了课程临时有事没去会扣肌点吗如果预约了课程临时有事没去会扣肌点吗如果预约了课程临时有事没去会扣肌点吗如果预约了课程临时有事没去会扣肌点吗如果预约了课程临时有事没去会扣肌点吗如果预约了课程临时有事没去会扣肌点吗"
            },
            {
                id:1002,
                Title: "一个人预约的，但是朋友想一起去没位置了",
                Content: "一个人预约的，但是朋友想一起去没位置了"
            }
        ];

        $scope.items = [];
    });

    function initPage() {
        $scope.settings = settings;
        // 当前选中的UserID 不存在 ，则返回错误
        //if (!angular.isObject($scope.data.UserID)) {
        //    alert("用户信息加载失败，请登录", function () {
        //        global['goto']("login");
        //    }, "warning");
        //}
        $scope.getMyFeedback();
    }

    $scope.getMyFeedback = function()
    {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getMyFeedbacks,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                UserID: $scope.data.UserID,
                PageNo: $scope.pageNo,
                PageSize: $scope.pageSize,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            // TODO 
            $scope.$apply(function () {
                if(oData.Feedbacks)
                {
                    $scope.items = $scope.items.concat(oData.Feedbacks);
                }
                $scope.total = oData.TotalCount;
            });
        });
    }

    $scope.get_more = function(){
        $scope.search.pageNo += 1;
        $scope.getMyFeedback();
    }

    $scope.submitFeedback = function()
    {
        window.session.UserID = $scope.data.UserID;
        global['goto']("person_feedback");
    }
});