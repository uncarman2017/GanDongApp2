
app.controller('person_reservationDetail', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        $scope.data.CourseBookingID = $routeParams.id ? $routeParams.id : "";
        if(!$scope.data.CourseBookingID)
        {
            alert("页面加载有误，请重试", function(){
                global['goto']("home");
            }, "warning");
        }

        $scope.Course = {};	// 初始化数据

        // 加载Course详细信息
        $scope.getCourseBookingDetail();
    }

    $scope.getCourseBookingDetail = function()
    {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getCourseBookingDetail,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                CourseBookingID: $scope.data.selected_Course.CourseBookingID
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.BookingInfo = oData.BookingInfo;
            });
        }, [], function(oData){
            alert("您需要重新登陆。", function(){
                global.goto('login');
            });
        });
    }

    $scope.gobackMyBookingList = function()
    {
        global['goto']("person_myReservation");
    }

    $scope.update = function()
    {
        window.session.selected_BookdingInfo = $scope.BookingInfo;
        global['goto']("course_appointment/"+$scope.BookingInfo.CourseBookingID);
    }


    $scope.cancelBooking = function()
    {
        MyConfirm({
            class: "btn2",
            txtContent: "确定取消预约？",
            _OK: function(obj){
                var param = {
                    _method: 'post',
                    _url: settings.ajax_domain + settings.ajax_url.cancelBookingByCustomer,
                    _timeout: settings.ajax_timeout,
                    _cache: false,
                    _param: {
                        CourseBookingID: $scope.data.selected_Course.CourseBookingID,
                        CancelReason:"客户自己取消"
                    }
                };
                global.ajax_data($scope, param, function (oData) {
                    console.log(oData);
                    $scope.$apply(function () {
                        window.session.selected_BookdingInfo = $scope.BookingInfo;
                        global['goto']("course_cancel/"+$scope.BookingInfo.CourseBookingID);
                    });
                });
            },
            _Cancel: function(obj){
                
            }
        });
    }
});