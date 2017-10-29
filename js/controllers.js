// global vars and functions

var session = {     // for all cache data
    userinfo: {
        id: '1',
        username: 'sam',
        mobile: '15844444444',
    },
    course: [],
    token: '',
}; 

var settings = {    // for all default settings
    is_debug : true,    // 开启debug模式
    can_localStorage : true,    // 是否使用 localStorage
    
    default_face : "./imgs/default_face.jpg",  // 默认头像

    pageSize: 10,   // 每页10条
    //ajax_domain: "http://jasonsonic.cloudapp.net/",
    ajax_domain: "http://139.196.209.196/",
    ajax_timeout: 2000,
    ajax_url: {
        login: 'api/Login',                 // 登录
        logout: 'api/Logout',               // 登出
        sendSMS: 'api/ValidateRegister',   // 注册发送短信验证码
        register: 'api/Register',           // 注册新用户
        updatePwd: 'api/UpdatePwd',           // 修改注册密码
        validateRegister: 'api/ValidateRegister',   // 发送验证码到手机

        searchGym : "api/SearchGym",         // 搜索场馆接口
        getGymDetail: "api/GetGymDetail",    // 获取场馆详细内容  
        getDicItemList: "api/GetDicItemList",//获取字典项列表
        getComments: "api/GetComments",//获取场馆评论信息
        submitComment: "api/SubmitComment", //提交场馆评论信息

        searchClub : "api/SearchClub",         // 搜索场馆接口
        getClubDetail: "api/GetClubDetail",    // 获取俱乐部详细内容  
        getCoachDetail: "api/GetCoachDetail",  // 获取教练详细内容 

        getUserDetail: "api/GetUserDetail",//获取个人中心 用户详细内容
        updateUserInfo: "api/UpdateUserInfo",//个人信息页，更新用户信息
        getMyCollection: "api/GetMyCollection",//获取个人收藏
        checkMyCollection: "api/CheckCollection", 
        submitCollection: "api/SubmitCollection",
        getMyFeedbacks: "api/GetMyFeedbacks",//获取我的反馈信息
        getMyComments: "api/GetMyComments",//获取我的评论
        submitFeedback: "api/SubmitFeedback",//提交反馈
        getMyBookingList: "api/GetMyBookingList",//获取我的预订列表
        getCourseBookingDetail: "api/GetCourseBookingDetail",//获取课程预订明细信息
        getMyPhotos: "api/GetMyPhotos",//获取我的照片

        searchCoach: "api/SearchCoach",//搜索教练信息
        getCourseTypeList: "api/GetCourseTypeList",//获取课程类型列表
        bookingCourse: "api/BookingCourse",//预订课程
        updateCourseBooking: "api/UpdateCourseBooking", // 更新预约课程
        cancelBookingByCoach: "api/CancelBookingByCoach",       // 教练取消预约
        cancelBookingByCustomer: "api/CancelBookingByCustomer", // 用户取消预约

        GetMyCourseInfo: 'FiveStarCoach/Course/GetMyCourseInfo/?',
        logout: 'api/Loginout',

        uploadFile: "UploadHandler.ashx",  // post file 地址
        getUploadedFileHistory: "api/GetUploadedFileHistory",  // 根据trackID 获取最后一个文件地址
        
        GetTopics: "api/GetTopics", // 获取首页轮播
        SearchByKeyword: "api/SearchByKeyword", // 首页查询
    },

    page_class_title: {
        "default": {
            "addclass": "",
            "removeclass": "",
            "title": "敢动App"
        },
        "login": {
            "addclass": "",
            "removeclass": "",
            "title": "用户登录",
            "hidetopmenu": true,
        },
        "regis_mobile": {
            "addclass": "",
            "removeclass": "",
            "title": "注册第一步"
        },
        "gym_list": {
            "addclass": "",
            "removeclass": "",
            "title": "场馆列表",
            "backBtn": function(){
                global['goto']("index");
            }
        },
        "gym_detail": {
            "addclass": "",
            "removeclass": "",
            "title": "场馆详情 ",
            "backBtn": function(){
                global['goto']("gym_list");
            }
        },
        "club_detail": {
            "addclass": "",
            "removeclass": "",
            "title": "俱乐部详情",
            // "backBtn": function(){
            //     global['goto']("club_list");
            // }
        },
        "coach_list": {
            "addclass": "",
            "removeclass": "",
            "title": "教练列表",
            "backBtn": function(){
                global['goto']("index");
            }
        },
        "coach_detail": {
            "addclass": "",
            "removeclass": "",
            "title": "教练详情",
            "backBtn": function(){
                global['goto']("coach_list");
            }
        },
        "person_center": {
            "addclass": "",
            "removeclass": "",
            "title": "个人中心"
        },
        "person_myInfo": {
            "addclass": "",
            "removeclass": "",
            "title": "个人信息",
            "backBtn": function(){
                global['goto']("person_center");
            }
        },
        "person_myComment": {
            "addclass": "",
            "removeclass": "",
            "title": "我的评论",
            "backBtn": function(){
                global['goto']("person_center");
            }
        },
        "person_help": {
            "addclass": "",
            "removeclass": "",
            "title": "我的反馈",
            "backBtn": function(){
                global['goto']("person_center");
            }
        },
        "person_feedback": {
            "addclass": "",
            "removeclass": "",
            "title": "我有问题",
            "backBtn": function(){
                global['goto']("person_help");
            }
        },
        "person_myCollect": {
            "addclass": "",
            "removeclass": "",
            "title": "我的收藏",
            "backBtn": function(){
                global['goto']("person_center");
            }
        },
        "person_myReservation": {
            "addclass": "",
            "removeclass": "",
            "title": "我的预约",
            "backBtn": function(){
                global['goto']("person_center");
            }
        },
        "person_reservationDetail": {
            "addclass": "",
            "removeclass": "",
            "title": "预约详情",
            "backBtn": function(){
                global['goto']("person_myReservation");
            }
        },
        "course_appointment": {
            "addclass": "",
            "removeclass": "",
            "title": "预约课程"
        },
        "course_cancel": {
            "addclass": "",
            "removeclass": "",
            "title": "取消预约",
            "backBtn": function(){
                global['goto']("person_myReservation");
            }
        },
        "course_error": {
            "addclass": "",
            "removeclass": "",
            "title": "取消预约",
            "backBtn": function(){
                global['goto']("person_myReservation");
            }
        },
        "course_success": {
            "addclass": "",
            "removeclass": "",
            "title": "预约成功",
            "backBtn": function(){
                global['goto']("person_myReservation");
            }
        },
        "course_load": {
            "addclass": "",
            "removeclass": "",
            "title": "我的预约",
            "backBtn": function(){
                global['goto']("person_myReservation");
            }
        },
    },

    CommentType: {
        gym: 1,
        club: 2,
        coach: 3,
        course: 4,
    }
};

var global = {      // for something useful
    loading_num: 0,    // for ajax loading,
    china_province: [],
    china_city: {},
    
    //常用正则表达式
    REG:{
        //用户名
        "USERNAME":/[\u4e00-\u9fa5A-Za-z0-9]{4,20}/,
        //密码
        "PASSWORD":/[A-Za-z0-9_-]{6,20}$/,
        //六位数字验证
        "SIXNUM":/^\d{6}$/,
        //手机号码验证
        "PHONE":/^1(33|42|44|46|48|49|53|80|81|89|30|31|32|41|43|45|55|56|85|86|34|35|36|37|38|39|40|47|50|51|52|57|58|59|82|83|84|87|88|77|76|84|78|70)[0-9]{8}$/,
    },
    isEmptyObj:function(OBJ){var bIsEmpty = true , N = 0 ;for(var x in OBJ){x ? N++ : '' ;}N > 0 ? bIsEmpty = false : '' ;return bIsEmpty ;},
    
    getUrlParm: function(){
        if (location.hash.indexOf('?') < 0) return {};
        var arrParm = location.hash.split('?')[1].split('&'), oReturn = {};
        for(var x = 0 ; x < arrParm.length; x++){
            var thisItem = arrParm[x].split('=');
            oReturn[thisItem[0]] = thisItem[1];
        }
        return oReturn;
    },

    fmtUrl: function(tp, param)
    {
        return "data.php"
        //return settings.ajax_domain + settings.ajax_url[tp].replace("?", param);
    },

    present_sms_time: 60,    // present send sms span time
    
    default_ajax_errorFunc: function(data)
    {
        if (data != '' && data != null)
        {
            if(angular.isArray(data))
            {
                alert(data.message);
            }
            else if(angular.isString(data))
            {
                alert(data);
            }
        }
        else
        {
            alert('连接失败...');
        }
    },
    
    checkPhoneNum : function(num)
    {
        return true;
    },

    sendSMS : function(type, callback)
    {
        callback();  
    },

    check_login_errorFunc: function()
    {
         global.goto("index");
    },

    // jq ajax 函数
    ajax:function($scope, param, success_func, error_func) {
        var np = angular.copy(param);
        var method = (np._method != 'post' && np._method != 'get') ? 'get' : np._method;
        var url = np._url;
        var headers = angular.isObject(np._headers)
             ? angular.extend(np._headers, { "Content-Type" : "application/json" })
             : { "Content-Type" : "application/json" };

        if(session.token)
        {
            headers.Token = session.token;
        }

        var timeout = (angular.isNumber(np._timeout)) ? np._timeout : settings.ajax_timeout;
        var cache = !!np._cache;

        var _param = param._param;
        var req = {
            method : method,
            url: url,
            cache : param._cache,
            timeout: timeout,
            processData:false,
            headers : headers,
            data: JSON.stringify(_param),
            crossDomain: true,  // 真实接口是需要通过这个配置跨域的
            success : function(data)
            {
                try{
                    data = JSON.parse(data);
                    
                } catch(e) {}
                success_func && success_func(data);
                global.loading_num -= 1;
                global.loading_hide();
            },
            error: function(data){
                if(data.status == 401)
                {
                    alert("请先登录。", function(){
                        global.do_logout();
                        return false;
                    });
                }
                else
                {
                    error_func && error_func(data);
                }
                global.loading_num -= 1;
                global.loading_hide();
            }
        }
        if (angular.isObject(headers))
        {
            req.headers = $.extend(req.headers, headers);
        }
        console.log("service req: " + JSON.stringify(req));
        jQuery.ajax(req);
        
        global.loading_num += 1;
        global.loading_show();
    },
    
    // 和服务器交互接口，做code=0检查，忽略包含success_code错误码的结果
    // success_code 为避免报错的自定义code, 可以为 string, list
    ajax_data: function($scope, params, success_func, success_code, error_func) {
        if(!angular.isFunction(error_func)) 
        { 
            error_func = global.default_ajax_error_func
        }
        global.ajax($scope, params, function(data){
            console.log("controllers ajax_data result: " + JSON.stringify(data));
            if ($scope) {
                $scope.$apply(function(){
                    // 尝试去掉按钮loading状态
                    $scope.is_loading = false;
                });            
            }
            
            if (!success_code) {
                success_code = "";
            }
            try{
                success_code = success_code.join(',');
            }
            catch(e){}
            //console.log("success_code = " + success_code);
            
            try{
                data.code = data.Result; // 接口写法和通用的不一样
                data.message = data.ResultMessage;
                data.Errors = data.Errors;
                //接口调用成功
                if (data.code == "0000" || data.Errors.length == 0)
                {
                    success_func(data);
                }
                else if(success_code.indexOf(data.code) >= 0)    // 指定code码,不报错
                {
                    success_func(data);
                }
                //未登录（接口需要登陆）
                else if (data.code == -200)
                {
                    alert("您离开页面很久了，请重新登录。", function(){
                        global.clearLoginStatus();
                        global["goto"]("login");
                    }, "warning");
                }
                else     //接口调用失败
                {
                    if(angular.isUndefined(data.code))
                    {
                        var msg = "服务器错误，请稍后重试或联系客服。";
                    }
                    else
                    {
                        var msg = "错误编号：" + data.code + "，" + data.message + "，请重试或联系客服。";
                    }
                    alert(msg, "warning");
                }
            }
            catch(e)
            {
                alert("系统错误："+e.message, "error");
            }
        }, error_func);
    },
    
    clearLoginStatus: function() {
        session = {
            userinfo: null,
            mobile: "",
            password: "",
            from:"",
            course: [],
            token: '',
        };
        if(settings.can_localStorage)
        {
            window.localStorage.session = JSON.stringify(window.session);
        }
    },

    initUser: function(user)
    {
        
    },
    
    // 在屏幕中间显示loading图标
    loading_show: function() {
        iloading (true, '', false);
    },
    
    // 在屏幕中间显示loading图标
    loading_hide: function() {
        if(global.loading_num <= 0)
        {
            global.loading_num = 0;
            iloading (false, '', false);
        }
    },

    // 页面初始化, 统一调用的function
    onLoadFunc: function($scope)
    {
        // 绑定goto函数
        $scope.goto = global.goto;
        $scope.showPics = global.showPics;
        $scope.settings = settings;

        // 增加 loading 状态
        global.loading_num -= 1;
        global.loading_hide();

        var d = "";
        if(settings.can_localStorage)
        {
            d = window.localStorage.session;
        }
        try{
            window.session = JSON.parse(d);
            // 恢复数据到 $scope 变量中以供页面使用
            $scope.data = angular.copy(window.session);
        }
        catch(e) {
            // 忽略错误
        }

        global.change_page_configs();

        $(".topm #personBtn").off("click").on("click", function(){
            global['goto']('person_center');
        });

        $(".topm #homeBtn").off("click").on("click", function(){
            global['goto']('index');
        });
        setTimeout(function(){
            $("body,html").animate({
                scrollTop:0
            },100);
        } , 50);
    },
    
    goto: function(page){
        var url_list = window.location.href.split("#").pop();
        var _page = url_list.split("/")[1];
        console.log(_page);
        if(_page != page)
        { 
            //console.log(window.session);
            if(settings.can_localStorage)
            {
                window.localStorage.session = JSON.stringify(window.session);
            }

            // 增加 loading 状态
            global.loading_num += 1;
            global.loading_show();

            window.location.href = "#/"+page;
        }
    },

    showPics: function(pics)
    {
        window.session.selected_pics = pics;
        global['goto']("pics");
    },

    change_page_configs: function() {
        // 根据页面名字修改body的class
        var url_list = window.location.href.split("#").pop();
        var page = url_list.split("/")[1];
        console.log(page);
        try{
            $("body").addClass(settings.page_class_title[page]["addclass"]);
            $("body").removeClass(settings.page_class_title[page]["removeclass"]);
            document.title = settings.page_class_title[page]["title"];
            $(".topm .title").text(settings.page_class_title[page]["title"]);

            if(angular.isFunction(settings.page_class_title[page]["backBtn"]))
            {
                $(".topm #backBtn").off("click").on('click', function(){
                    settings.page_class_title[page]["backBtn"]();
                });
            }
            else
            {
                $(".topm #backBtn").off("click").on('click', function(){
                    // 保存数据
                    if(settings.can_localStorage)
                    {
                        window.localStorage.session = JSON.stringify(window.session);
                    }

                    // 增加 loading 状态
                    global.loading_num += 1;
                    global.loading_show();

                    window.history.go(-1);
                });
            }

            // 隐藏顶部快捷菜单
            if(settings.page_class_title[page]["hidetopmenu"])
            {
                $(".topm .pull-right").hide();
            }
            else
            {
                $(".topm .pull-right").show();
            }

            // hack iphone 中不能更新title问题
            var $iframe = $('<iframe src="./imgs/favicon.ico" style="width:1px;height:1px;border:0px;"></iframe>').on('load', function() {
                    setTimeout(function() {
                        $iframe.off('load').remove()
                    }, 0)
            }).appendTo($('body'));
        }catch(e)
        {
            $("body").addClass(settings.page_class_title['default']["addclass"]);
            $("body").removeClass(settings.page_class_title['default']["removeclass"]);
            document.title = settings.page_class_title['default']["title"];
            $("title").text(settings.page_class_title['default']["title"]);
            $(".topm .title").text(settings.page_class_title['default']["title"]);
            
            $(".topm #backBtn").off("click").on('click', function(){
                // 保存数据
                if(settings.can_localStorage)
                {
                    window.localStorage.session = JSON.stringify(window.session);
                }

                // 增加 loading 状态
                global.loading_num += 1;
                global.loading_show();
                
                window.history.go(-1);
            });

            $(".topm .pull-right").show();

            // hack iphone 中不能更新title问题
            var $iframe = $('<iframe src="./imgs/favicon.ico" style="width:1px;height:1px;border:0px;"></iframe>').on('load', function() {
                    setTimeout(function() {
                        $iframe.off('load').remove()
                    }, 0)
            }).appendTo($('body'));
        }
    },

    // 退出登录提示，点击作页面跳转
    do_logout: function()
    {
        //MyAlert("您离开页面很久了，请重新登录。", function(){
            global.clearLoginStatus();
            global["goto"]("login");
        //}, "warning");
        return false;
    }
};   

///////////////////////////  comm functions  //////////////////////////////

/**
 * ajax等待层处理
 * @param showFlag true/false： 显示/隐藏，传false时，以下两个参数省略
 * @param tipWords 可不传，默认显示器"请等待..."
 * @param isShowOverLay 是否显示遮罩层，默认显示
 */
function iloading (showFlag, tipWords, isShowOverLay)
{
    if (showFlag) {
        var iloadingDom = $("#iloadingbox");
        if (iloadingDom.length > 0) {
            $("#iloadingbox").show();
        } else {
            $('body').append(
                '<div style="z-index: 20000; left: 0px; width: 0px; height: auto; top: 0px; margin-left: 0px;" id="iloadingbox" class="xubox_layer" type="page">'
					+'<div style="z-index: 20000; height: 0px; background-color: rgb(255, 255, 255);" class="xubox_main">'
						+'<div class="xubox_page">'
							+'<div class="xuboxPageHtml">'
								+'<div id="iLoading_overlay" class="iLoading_overlay" style="display: block;"></div>'
								+'<div class="iLoading_showbox" style="display: block; opacity: 1;">'
									+'<div class="iLoading_loading_pic"></div>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<span class="xubox_botton"></span>'
					+'</div>'
					+'<div id="xubox_border2" class="xubox_border" style="z-index: 19891015; opacity: 0; top: 0px; left: 0px; width: 0px; height: 0px; background-color: rgb(255, 255, 255);"></div>'
                +'</div>'
            );
        }
    } else {
        $("#iloadingbox").hide();
    }
}

function LoadingShow($ionicLoading)
{
   // if($ionicLoading !== false)
   // {
        iloading (true, '', false);
    //}
}
function LoadingHide($ionicLoading)
{
    iloading (false, '', false);
}

/*扩展使用部分，后期合并*/
global = $.extend(global,{
	pageList:{
		//注册登录找回密码
		login:"登录",
		regis_mobile:"注册-输入手机号",
		regis_setmesg:"注册-输入验证码，设置用户名密码",
		forgetpwd_mobile:"找回密码-输入手机",
		forgetpwd_setpwd:"找回密码-重设密码",
		//教练
		instructor_list:"教练列表",
		instructor_detail:"教练详情",
		//场馆	
		gym_list:"场馆列表",
		gym_detail:"场馆信息",
		group_detail:"俱乐部详情",
		gym_comment:"场馆评论",
		gym_debug:"场馆纠错",
		gym_add:"场馆新增",
		//个人中心
		person_feedback:"意见反馈",
		//其他
		index:"主页",
		index_searchInput: "",
		upload_file: "图片上传",
		//课程预定
		course_appointment:"发起课程预约 - 用户端",
		course_instructor:"课程预约 - 教练端",
		course_load:"预约公益课，客户待确认",
		course_success:"预约公益课，成功",
		course_error:"预约公益课 ，失败",
		course_cancel:"预约公益课，客户取消预约",
	},
	APIIP: 'http://139.196.209.196',
	//APIIP:'http://jasonsonic.cloudapp.net/',
	changeURL: function(pagename,parm){
		if(!pagename){console.warn('the pagename is do not null');return false;}
		if(!this.pageList[pagename]){
			console.warn('this page is do not undefined');
			return false;
		}
		var parmStr = '?';
		if(!this.isEmptyObj(parm)){for(var x  in parm){parmStr += x+'='+parm[x]+'&';}parmStr=parmStr.slice(0,-1);}
		window.location.href = "./start.html#/" + pagename +(parmStr.length > 1 ? parmStr : '');	
	},

});


window.alert = MyAlert;