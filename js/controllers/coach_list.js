
app.controller('coach_list', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        $scope.show_category = false;
        $scope.show_teachLevel = false;

        $scope.search = {
            teachLevel: [
                {"Level":"","LevelName":"所有级别"},
                {"Level":5,"LevelName":"五星教练"},
                {"Level":4,"LevelName":"四星教练"},
                {"Level":3,"LevelName":"三星教练"},
                {"Level":2,"LevelName":"二星教练"},
                {"Level":1,"LevelName":"一星教练"},
            ],
            search_name: "",
            category: [],
            selected_category: null,
            pageNo: 1,
            pageSize: settings.pageSize,
        }
        $scope.search.selected_teachLevel= $scope.search.teachLevel[0];

        $scope.items = [];
        // 获取筛选条件信息
        $scope.loadCourseTypes();
    }
   
    // 获取顶部筛选条件
    $scope.loadCourseTypes = function () {
        // 获取所有能选择的运动类型
        $scope.loadCourseType();
    }

    $scope.loadCourseType = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getCourseTypeList,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
            }
        };
        global.ajax_data($scope, param, function (oData) {
            $scope.$apply(function () {
                $scope.search.category = oData.CourseTypeList;
                $scope.search.category.unshift({"CourseTypeID":0,"ChargeType":0,"CourseTypeName":"所有课程"});
                $scope.search.selected_category = $scope.search.category[0];

                // 获取场馆信息
                $scope.seachCoach();
            });

        });
    }
    $scope.searchByCourseType = function(item)
    {
        $scope.search.selected_category = item;
        $scope.show_category = false;
        $scope.show_teachLevel = false;
        $scope.search.pageNo = 1;
        $scope.items = [];
        $scope.seachCoach();
    }

    $scope.searchByTeachLeveL = function(item)
    {
        $scope.search.selected_teachLevel = item;
        $scope.show_category = false;
        $scope.show_teachLevel = false;
        $scope.search.pageNo = 1;
        $scope.items = [];
        $scope.seachCoach();
    }

    $scope.searchByName = function()
    {
        $scope.show_category = false;
        $scope.show_teachLevel = false;
        $scope.search.pageNo = 1;
        $scope.items = [];
        $scope.seachCoach();
    }

    $scope.seachCoach = function()
    {
        var categoryArray = new Array();
        if ($scope.search.selected_category)
            categoryArray.push($scope.search.selected_categoryId);
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.searchCoach,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                Courses:$scope.search.selected_category.CourseTypeID ? [$scope.search.selected_category.CourseTypeID] : [],
                Level: $scope.search.selected_teachLevel ? $scope.search.selected_teachLevel.Level : "",
                Name: $scope.search.search_name,
                PageNo: $scope.search.pageNo,
                PageSize: $scope.search.pageSize,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                //$scope.items = oData.Coaches;
                //$scope.total = oData.TotalCount;
                if(oData.Coaches)
                {
                    $scope.items = $scope.items.concat(oData.Coaches);
                }
                $scope.total = oData.TotalCount;
            });
        });
    }
    $scope.get_more = function(){
        $scope.search.pageNo += 1;
        $scope.seachCoach();
    }
    $scope.showDetail = function(coach)
    {
        window.session.selected_coach = coach;
        global['goto']("coach_detail/"+coach.CoachID);
    }

});