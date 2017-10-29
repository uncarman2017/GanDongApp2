
app.controller('gym_detail', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        // 当前选中的gym是 $scope.data.selected_gym;
        // if(!angular.isObject($scope.data.selected_gym))
        // {
        // 	alert("页面加载有误，请重试", function(){
        // 		window.session.selected_gym = null;
        // 		global['goto']("home");
        // 	}, "warning");
        // }

        $scope.data.GymID = $routeParams.id ? $routeParams.id : "";
        if(!$scope.data.GymID)
        {
            alert("页面加载有误，请重试", function(){
                global['goto']("home");
            }, "warning");
        }

        $scope.gym = {};	// 初始化数据
        $scope.Comm = {};    // 初始化数据
        $scope.PageNo = 1;
        $scope.PageSize = settings.pageSize;
        $scope.isEnd = false;

        // 加载场馆详细信息
        $scope.getGymDetail();

        //获取场馆评论信息
        $scope.getComments();

        //获取场馆收藏信息
        $scope.getCollect();
    }

    $scope.getGymDetail = function(){
    	var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getGymDetail,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
            	GymID : $scope.data.GymID
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function(){
            	$scope.gym = oData.GymDetail;
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
                CommentType: settings.CommentType.gym,
                ObjectID:$scope.data.GymID,
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
                CollectionType: settings.CommentType.gym,
                ObjectID: $scope.data.GymID,
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
                CollectionType: settings.CommentType.gym,
                ObjectID: $scope.data.GymID,
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

    $scope.showClub = function (club) {
    	window.session.selected_club = club;
    	global['goto']("club_detail/"+club.ClubID);
    }

    $scope.submitComment = function () {
        window.session.from = "gym_detail/"+$scope.data.GymID;
        if (!$scope.data.userinfo || $scope.data.userinfo.id == "")
        {
            global.do_logout();
        }
        else
        {
            window.session.submit_obj  = $scope.gym;
            window.session.submit_type = settings.CommentType.gym;
            global['goto']("submit_comment");
        }
    }

    // 预约课程点击
    $scope.bookingCourse = function(){
        alert("请先选择俱乐部", function(){
            $scope.scroll($("#gym_clubs"));
        });
    }

    // 页面滚动到指定DOM位置
    $scope.scroll = function(dom){
        $("body").animate({ scrollTop : $(dom).offset().top - 50 });
    }    
});