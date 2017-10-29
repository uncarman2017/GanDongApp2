
app.controller('submit_comment', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();

        // 绑定change事件
        $("#upload_file").on("change", function(){
            $scope.uploadFile();
        })
    });

    function initPage() {
        $scope.settings = settings;
        // 当前选中的gym是 $scope.data.selected_gym;
        console.log($scope.data.submit_obj);
        console.log($scope.data.submit_type);

        if (!angular.isObject($scope.data.submit_obj) || !$scope.data.submit_type) {
            alert("页面加载有误，请重试", function () {
                window.session.selected_gym = null;
                global['goto']("gym_list");
            }, "warning");
        }

        if($scope.data.submit_type == settings.CommentType.gym)
        {
            $scope.title_txt = $scope.data.submit_obj.GymName;
            $scope.id = $scope.data.submit_obj.GymID;
        }
        else if($scope.data.submit_type == settings.CommentType.club)
        {
            $scope.title_txt = $scope.data.submit_obj.ClubName;
            $scope.id = $scope.data.submit_obj.ClubID;
        }
        else if($scope.data.submit_type == settings.CommentType.coach)
        {
            $scope.title_txt = $scope.data.submit_obj.Name;
            $scope.id = $scope.data.submit_obj.CoachID;
        }
        else if($scope.data.submit_type == settings.CommentType.course)
        {
            //$scope.title_txt = $scope.data.submit_obj.Name;
            $scope.id = $scope.data.submit_obj.CourseID;
        }

        $scope.CommentModel = {
            Comment: '',
            Star1: 1,
            Star2: 1,
            Star3: 1,
            Star4: 1,
            PicList:[] //图片List,二维，包括每个图片的trackerid,mark(是否要上传)
        };

    }

    //点击提交评论按钮
    $scope.submitComment = function () {
        var stars = [
            $scope.CommentModel.Star1,
            $scope.CommentModel.Star2,
            $scope.CommentModel.Star3,
            $scope.CommentModel.Star4,
        ];

        if(!$scope.CommentModel.Comment)
        {
            alert("请填写评论内容", "warning");
            return false;
        }

        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.submitComment,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                CommentType: $scope.data.submit_type,
                ObjectID: $scope.id,
                Star: stars,
                UserID: session.userinfo.UserID,
                Comment: $scope.CommentModel.Comment,

            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            alert("发表成功", function(){
                if($scope.data.from)
                {
                    global['goto']($scope.data.from);
                }
                else
                {
                    global['goto']("index");
                }
            })
            
        });
    }

    //“Star1” 上星星数量
    $scope.getStars = function(type,index)
    {
        var totalStar = $("#Stars"+type).children();
        for (i = 0; i < 5; i++)
        {
            if(i<index)
                $(totalStar[i]).addClass("ok");
            else
                $(totalStar[i]).removeClass("ok");
        }
        $scope.CommentModel['Star'+type] = index;
    }

    $scope.chooiseFile = function(){
        $("#upload_file").click();
    }

    $scope.uploadFile = function ()
    {
        // 如果有值，上传
        $.ajaxFileUpload({
            dataType: 'JSON',
            url: settings.ajax_domain + settings.ajax_url.uploadFile,
            //url: "upload.php",
            secureuri: false,
            dataType: 'text',
            fileElementId: "upload_file",
            success: function (data, status) {
                if (typeof (status) != "undefined" && status == "success") {
                    //根据data上传获取文件列表
                    var param = {
                        _method: 'get',
                        url: settings.ajax_domain + settings.ajax_url.getUploadedFileHistory,
                        //_url: "upload.php",
                        _timeout: settings.ajax_timeout,
                        _cache: false,
                        _param: {
                            trackerId: data
                        }
                    };
                    session.tmpFileId = data;
                    global.ajax_data($scope, param, function (oData) {
                        //处理文件列表
                        if (typeof (oData.FileName) != "undefined") {
                            alert(oData.FileName);
                        }
                    }, '0000');
                }
            },
            error: function (data, status, e) {
                if (typeof (data.ResultMessage) != "undefined") {
                    alert(data.ResultMessage);
                } else if (typeof (e) != "undefined" && typeof (e.message) != "undefined") {
                    alert(e.message);
                } else {
                    alert("服务器未响应。");
                }
            }
        });


        //将新的trackerid 加入到$scope.CommentModel.PicList
        var Pic = new Array();
        Pic.push(session.tmpTrackerId);
        Pic.push(1);
        
        $scope.CommentModel.PicList.push(Pic);
        $scope.PicIndex++;  //PicList 对应的下标
    }

});