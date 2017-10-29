
app.controller('club_detail', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        // 当前选中的club是 $scope.data.selected_club;
        // if(!angular.isObject($scope.data.selected_club))
        // {
        //     alert("页面加载有误，请重试", function(){
        //         window.session.selected_club = null;
        //         global['goto']("home");
        //     }, "warning");
        // }

        $scope.data.ClubID = $routeParams.id ? $routeParams.id : "";
        if(!$scope.data.ClubID)
        {
            alert("页面加载有误，请重试", function(){
                global['goto']("home");
            }, "warning");
        }

        $scope.PageNo = 1;
        $scope.PageSize = settings.pageSize;
        $scope.isEnd = false;

        console.log($scope.data.selected_club);

        // 加载俱乐部详细信息
        $scope.getClubDetail();

        //获取俱乐部评论信息
        $scope.getComments();
        
        $scope.getCollect();
    }

    // 加载俱乐部详细信息
    $scope.getClubDetail = function(){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getClubDetail,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                ClubID : $scope.data.ClubID
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            var res = oData;
            $scope.$apply(function(){
                $scope.club = res;
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
                CommentType: settings.CommentType.club,
                ObjectID:$scope.data.ClubID,
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
                CollectionType: settings.CommentType.club,
                ObjectID: $scope.data.ClubID,
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
                CollectionType: settings.CommentType.club,
                ObjectID: $scope.data.ClubID,
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
    
    $scope.showCoach = function(coach)
    {
        global['goto']("coach_detail/"+coach.CoachID);
    }

    $scope.submitComment = function () {
        window.session.from = "club_detail/"+$scope.data.selected_club.ClubID;
        if (!$scope.data.userinfo || $scope.data.userinfo.id == "")
        {
            global.do_logout();
        }
        else
        {
            window.session.submit_obj  = $scope.club;
            window.session.submit_type = settings.CommentType.club;
            global['goto']("submit_comment");
        }
    }

    // 页面滚动到指定DOM位置
    $scope.scroll = function(dom){
        $("body").animate({ scrollTop : $(dom).offset().top - 50 });
    } 

    $scope.bookingCourse = function(){
        
        alert("请先选择您要预约的教练。", function(){
                $scope.scroll($("#coach_list"));
            }, "info");
    }
});