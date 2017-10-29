
app.controller('person_myPics', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        $scope.getMyPhotos();
    }

    $scope.getMyPhotos = function()
    {
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getMyPhotos,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                UserID: $scope.data.UserID
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.Photos = oData.Photos;
            });
        }, [], function(oData){
            alert("您需要重新登陆。", function(){
                global.goto('login');
            });
        });
    }

});