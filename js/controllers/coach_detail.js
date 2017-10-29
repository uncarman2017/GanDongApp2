
app.controller('coach_detail', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        $scope.PageNo = 1;
        $scope.PageSize = settings.pageSize;
        $scope.isEnd = false;

        $scope.data.CoachID = $routeParams.id ? $routeParams.id : "";
        if(!$scope.data.CoachID)
        {
            alert("页面加载有误，请重试", function(){
                global['goto']("home");
            }, "warning");
        }

        // 加载教练详细信息
        $scope.getCoachDetail();

        //获取教练评论信息
        $scope.getComments();
        
        $scope.getCollect();
    }

    // 加载教练详细信息
    $scope.getCoachDetail = function(){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getCoachDetail,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                CoachID : $scope.data.CoachID
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            var res = oData;
            $scope.$apply(function(){
                $scope.coach = res.Coach;
                $scope.coach.Gym = res.Gym;
                $scope.coach.Club = res.Club;
            });
        });
    }

    $scope.getComments = function()
    {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getComments,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                CommentType: settings.CommentType.coach,
                ObjectID:$scope.data.CoachID,
                PageNo:$scope.PageNo,
                PageSize: $scope.pageSize,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.Comm = {
                    Comments: oData.Comments,
                    Total: oData.TotalCount,
                    AvarageScore: oData.AvarageScore
                }
                if(oData.TotalCount > $scope.PageNo * $scope.pageSize)
                {
                    $scope.isEnd = false;
                    $scope.PageNo += 1;
                }
                else
                {
                    $scope.isEnd = true;
                }
            });
        });
    }

    $scope.getCollect = function(){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.checkMyCollection,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                CollectionType: settings.CommentType.coach,
                ObjectID: $scope.data.CoachID,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function(){
                $scope.is_collected = oData.CollectionID>0 ? true : false;
            });
        });
    }

    $scope.changeCollect = function(collect){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.submitCollection,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                CollectionType: settings.CommentType.coach,
                ObjectID: $scope.data.CoachID,
                IsCollected: collect,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function(){
                $scope.is_collected = oData.CollectionID ? true : false;
            });
        });
    }

    $scope.get_more = function(){
        $scope.PageNo += 1;
        $scope.getComments();
    }
    
    $scope.bookingCourse = function()
    {
        window.session.selected_coach = $scope.coach;
        global['goto']("course_appointment");
    }

    $scope.submitComment = function () {
        window.session.from = "coach_detail/"+$scope.data.CoachID;
        if (!$scope.data.userinfo || $scope.data.userinfo.id == "")
        {
            global.do_logout();
        }
        else
        {
            window.session.submit_obj  = $scope.coach;
            window.session.submit_type = settings.CommentType.coach;
            global['goto']("submit_comment");
        }
    }
});