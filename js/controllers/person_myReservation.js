
app.controller('person_myReservation', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;

        $scope.getMyBookingList();
    }

    $scope.getMyBookingList = function()
    {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getMyBookingList,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                BeginDate:'1900-01-01',
                EndDate:new Date(),
                pageNo: 1,
                pageSize: settings.pageSize,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.items = oData.MyBookingList;
                $scope.total = oData.TotalCount;
            });
        }, [], function(oData){
            alert("您需要重新登陆。", function(){
                global.goto('login');
            });
        });
    }

    $scope.getCourseBookingDetail = function(Course)
    {
        window.session.selected_Course = Course;
        global['goto']("person_reservationDetail/"+Course.CourseBookingID);
    }

});