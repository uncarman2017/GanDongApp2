
app.controller('index_searchInput', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        $scope.show_result = true;
    }

    $scope.do_search = function()
    {
        $scope.show_result = false;
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.SearchByKeyword,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                Keyword: $scope.search_key
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.show_result = true;
                $scope.result = oData;
            });
        });
    }

    $scope._goto = function(page)
    {
        window.session.search_key = $scope.search_key;
        global['goto'](page);
    }
    
});