
app.controller('course_cancel', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        $scope.data.CourseID = $routeParams.id ? $routeParams.id : "";
        if(!$scope.data.CourseID)
        {
            alert("页面加载有误，请重试", function(){
                global['goto']("home");
            }, "warning");
        }
        
        $scope.course = {};	// 初始化数据

        // 加载课程详细信息
        $scope.getCourseDetail();
    }

    $scope.getCourseDetail = function () {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getCourseBookingDetail,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                CourseBookingID: $scope.data.CourseID
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.CourseDetail = oData.BookingInfo;
            });
        });
    }

    $scope.goback = function () {
        global['goto']("person_myReservation");
    }

});