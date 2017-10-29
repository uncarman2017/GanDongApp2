
app.directive("currentTime", function (dateFilter) {
    return function (scope, element, attr) {
        var intervalId;
        //更新对应element的text值，即更新时间
        function updateTime() {
            element.text(dateFilter(new Date(), scope.format));
        }
        //通过watch，监控span对象的currentTime的值(是format这个model值，即input的值！！)
        //这个方法仅仅在format发生改变的时候执行
        scope.$watch(attr.currentTime, function (value) {
            scope.format = value;
            updateTime();
        });
        //当span被去掉的时候，取消更新
        element.bind("$destroy", function () {
            clearInterval(intervalId);
        });

        intervalId = setInterval(updateTime, 1000);
    };
});

app.directive('bootstrapSwitch', function () {
    return {
        restrict: 'A',
        $scope: {
            sync: '=bootstrapSwitch'
        },
        link: function ($scope, element, attrs) {
            $(element).bootstrapSwitch();
            $(element).on('switchChange.bootstrapSwitch', function (e, data) {
                $scope.sync = data;
                $scope.$apply();
            });
        }
    }
});