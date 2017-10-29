
app.controller('upload_file', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        $("#uploadPhotoBtn").off().click(function () {
            uploadFile("uploadPhotoFile");
        });
    };

    //上传文件
    function uploadFile(fileCtrolId) {
        if ($("#" + fileCtrolId).val().length > 0) {
            $.ajaxFileUpload(
            {
                dataType: 'JSON',
                url: settings.ajax_domain + settings.ajax_url.uploadFile,
                secureuri: false,
                fileElementId: fileCtrolId,
                success: function (data, status) {
                    if (typeof (status) != "undefined" && status == "success") {
                        //根据data上传获取文件列表
                        var param = {
                            _method: 'get',
                            _url: global.APIIP + settings.ajax_url.getUploadedFileHistory,
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

            return false;
        } else {
            alert("无效的文件路径。");
        }
    }
});
