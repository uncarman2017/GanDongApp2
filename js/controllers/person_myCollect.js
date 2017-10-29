
app.controller('person_myCollect', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
        
    });

    function initPage() {
        $scope.settings = settings;
        
        //定义4个变量，对应显示哪一块
        $scope.CollectType = 1;
        $scope.Collect = {
            gymCollects: [],
            clubCollects: [],
            coachCollects: [],
            //articleCollects:[]
        }
        $scope.getMyCollects();
    }
    $scope.getMyCollects = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getMyCollection,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                PageNo: 1, PageSize: settings.pageSize,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            // TODO 
            $scope.$apply(function () {
                $scope.TotalCount = oData.TotalCount;
                $scope.Collect.gymCollects=oData.GymCollections;
                $scope.Collect.clubCollects = oData.ClubCollections;
                $scope.Collect.coachCollects = oData.CoachCollections;
                //$scope.Collect.articleCollects = oData.ArticleCollections;
            });
        }, [], function(oData){
            alert("您需要重新登陆。", function(){
                global.goto('login');
            });
        });
    }

    $scope.articleShow = function()
    {
        $scope.CollectType = 4;
    }

    $scope.gymShow = function()
    {
        $scope.CollectType = 1;
    }
    $scope.clubShow = function()
    {
        $scope.CollectType = 2;
    }
    $scope.coachShow = function()
    {
        $scope.CollectType = 3;
    }


    $scope.gotoGymDetail = function (ObjectID)
    {
        window.session.selected_gym.GymID = ObjectID;
        global['goto']("gym_detail/"+ObjectID);
    }

    $scope.gotoClubDetail = function(ObjectID)
    {
        window.session.selected_club.ClubID = ObjectID;
        global['goto']("club_detail/"+ObjectID);
    }

    $scope.gotoCoachDetail = function(ObjectID)
    {
        window.session.selected_coach.CoachID = ObjectID;
        global['goto']("coach_detail/"+ObjectID);
    }
});