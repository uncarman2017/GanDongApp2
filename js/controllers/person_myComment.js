
app.controller('person_myComment', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        // 当前选中的UserID 不存在 ，则返回错误
        if (!angular.isObject($scope.data.User)) {
            alert("用户信息加载失败，请登录", function () {
                global['goto']("login");
            }, "warning");
        }
        $scope.items = [];
        $scope.pageNo = 1,
        $scope.pageSize = settings.pageSize,
        $scope.getMyComments();
    }

    $scope.getMyComments = function()
    {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getMyComments,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                UserID: $scope.data.User.UserID,
                PageNo: $scope.pageNo,
                PageSize: $scope.pageSize,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                if(oData.Comments)
                {
                    $scope.items = $scope.items.concat(oData.Comments);
                }
                $scope.total = oData.TotalCount;
            });
        }, [], function(oData){
            alert("您需要重新登陆。", function(){
                global.goto('login');
            });
        });
    }

    $scope.gotoGymDetail =function(CommentType,ObjectID)
    {
        switch(CommentType)
        {
            case 1://场馆
                window.session.selected_gym = {};
                window.session.selected_gym.GymID = ObjectID;
                global['goto']("gym_detail/"+ObjectID);
                break;
            case 2://俱乐部
                window.session.selected_club = {};
                window.session.selected_club.ClubID = ObjectID;
                global['goto']("club_detail/"+ObjectID);
                break;
            case 3://教练
                window.session.selected_coach = {};
                window.session.selected_coach.CoachID = ObjectID;
                global['goto']("coach_detail/"+ObjectID);
                break;
            case 4://课程
                break;
        }
    }


    

});