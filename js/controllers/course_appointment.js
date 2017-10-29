
app.controller('course_appointment', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;

        //加载用户详细信息
        if(!$scope.data.userinfo || !$scope.data.userinfo.UserID)
        {
            global.do_logout();
            return false;
        }

        $scope.course_appointment_type = $routeParams.id ? "edit" : "new";
        $scope.course_appointment_id = $routeParams.id;

        $scope.CoachDTO = {};
        
        $scope.CoachID = null;

        $scope.BookingCourse = {
            Remark: "",
            CourseDate: "2016-01-02",//
            CourseTypeDTO: {
                CourseTypeID: 1,//
                ChargeType: 0,//
                CourseTypeName: ""//
            },
            UserID: 3,//
            GymAddress: "",//
            BookingTime: "2016-01-01",
            CourseBeginTime:"20:00",
            CourseEndTime: "22:00",
            Hours: 2,
            BookingStatus: 0,
        }

        $scope.show_BookingDay = false;
        $scope.course_day = [];
        var start_day = $scope.course_appointment_id ? 0 : 3;
        var end_day = $scope.course_appointment_id ? 12 : 15;
        for(var i=start_day; i<=end_day; i++ )
        {
            var d = moment().add(i, "day").format("YYYY-MM-DD");
            $scope.course_day.push(d);
        }

        $scope.show_BookingTime = false;
        $scope.course_time = [
            "09:00 - 10:00",
            "10:00 - 11:00",
            "11:00 - 12:00",
            "13:00 - 14:00",
            "15:00 - 15:00",
            "15:00 - 16:00",
            "16:00 - 17:00",
            "17:00 - 18:00",
            "19:00 - 20:00",
            "20:00 - 21:00",
            "21:00 - 22:00",
        ];

        // 编辑预约
        if($scope.course_appointment_id)
        {
            if(!$scope.selected_BookdingInfo)
            {
                // get course detail
                $scope.getCourseBookingDetail();
            }
            else
            {
                $scope.BookingInfo = $scope.selected_BookdingInfo;
                $scope.BookingInfo.Hours = $scope.BookingInfo.Hours.toString();
            }
        }
        // 新建预约
        else
        {
            if(!$scope.data.selected_coach)
            {
                alert("请先选择一个教练", function(){
                    global.goto("coach_list");
                });
                return false;
            }

            // 填充数据
            $scope.BookingInfo = {
                CoachID: $scope.data.selected_coach.CoachID,
                CoachSex: $scope.data.selected_coach.Sex,
                CoachName: $scope.data.selected_coach.Name,
                CoachLevel: $scope.data.selected_coach.Level,
                CoachHeadPortraitUri: $scope.data.selected_coach.HeadPortraitUri,
                GymAddress: $scope.data.selected_coach.Gym.GymAddress,
                Hours: "1",
                CourseTypeID: $scope.data.selected_coach.Courses.length>0 ? $scope.data.selected_coach.Courses[0].CourseTypeID : "",
                //CourseTypeName: $scope.data.selected_coach.Courses.length>0 ? $scope.data.selected_coach.Courses[0].CourseTypeName : "",
                Courses: $scope.data.selected_coach.Courses,
                CourseDate: $scope.course_day[0],
                CourseBeginTime: $scope.course_time[0].substr(0,5),
                CourseEndTime: $scope.course_time[0].substr(-5),
                Remark: $scope.BookdingInfo.Remark,
            }
        }
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
                $scope.BookingInfo.Hours = $scope.BookingInfo.Hours.toString();
            });
        });
    }

    $scope.Submit = function () {
        // 默认新建预约
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.bookingCourse,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                BookingInfo: $scope.BookingInfo
            }
        };

        // 编辑课程
        if($scope.course_appointment_type=='edit')
        {
            param._url = settings.ajax_domain + settings.ajax_url.updateCourseBooking;
            param._param = {
                "CourseBookingID": $scope.BookingInfo.CourseBookingID,
                "CourseBeginTime": $scope.BookingInfo.CourseBeginTime,
                "CourseEndTime": $scope.BookingInfo.CourseEndTime,
                "CoachID": $scope.BookingInfo.CoachID,
                "CourseDate": $scope.BookingInfo.CourseDate,
                "Hours": $scope.BookingInfo.Hours,
                "Remark": $scope.BookingInfo.Remark
            }
        }
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                if(oData.CourseBookingID)
                {
                    alert(oData.ResultMessage, function(){
                        global.goto("course_success/"+oData.CourseBookingID);
                    }, "sucess");
                }
            });
        },[],function(oData){
            console.log(oData);
        });
    }

    $scope.getCourseTime = function(Time)
    {
        $scope.BookingInfo.CourseBeginTime = Time.substr(0,5);
        $scope.BookingInfo.CourseEndTime = Time.substr(-5);
        $scope.show_BookingTime = false;
    }

    $scope.getCourseDay = function(Day)
    {
        $scope.BookingInfo.CourseDate = Day;
        $scope.show_BookingDay = false;
    }
});