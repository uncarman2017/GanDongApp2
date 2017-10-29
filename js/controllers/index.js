
app.controller('index', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        $scope.per_page = 3; 

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        $scope.loadCategory("position");
        $scope.show_position = false;

        $scope.loadTopic();
    }

    $scope.loadCategory = function(tp){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getDicItemList,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                DicType: tp=="position" ? "DistrictName" : tp,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            // TODO 
            $scope.$apply(function () {
                if (tp == "position") {
                    $scope.DicItempositionList = oData.DicItemList;
                    $scope.DicItempositionList.unshift({"DicItemID":0,"DicType":"DistrictName","ItemText":"所有地区","ItemValue":0});
                    $scope.selected_position = $scope.DicItempositionList[0];
                }
                else {
                    $scope.DicItemcategoryList = oData.DicItemList;
                    $scope.selected_category = "";
                }

                // 获取场馆推荐 前5个
                $scope.get_topic_gym();
                // 获取俱乐部推荐 前5个
                $scope.get_topic_club();

            });
            
        });
    };

    // 获取场馆推荐 前5个
    $scope.get_topic_gym = function(){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.searchGym,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                DistrictID : $scope.selected_position.DicItemID ? $scope.selected_position.DicItemID : '',
                pageNo: 0,
                pageSize : $scope.per_page,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function(){
                $scope.topic_gym = oData.Items;
            });
        });
    };

    // 获取俱乐部推荐 前5个
    $scope.get_topic_club = function(){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.searchClub,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                DistrictID :  $scope.selected_position.DicItemID ? $scope.selected_position.DicItemID : '',
                pageNo: 0,
                pageSize : $scope.per_page,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function(){
                $scope.topic_club = oData.Items;
            });
        });
    };

    $scope.searchByPosition = function (ItemText) {
        $scope.selected_position = ItemText;
        $scope.show_position = false;
        $scope.get_topic_gym();
        $scope.get_topic_club();
    };


    $scope.loadTopic = function(){
        var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.GetTopics,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {}
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function () {
                $scope.data.topics = oData.Topics;
                if(angular.isArray(oData.Topics))
                {
                    $scope.li_width = (100/(oData.Topics.length+2)) + "%";
                    setTimeout(function () {
                        $scope.bannerSlider = new Slider($('#banner_tabs'), {
                            time: 5000,
                            delay: 400,
                            event: 'hover',
                            auto: true,
                            mode: 'slide',
                            length: oData.Topics.length,
                            controller: $('#bannerCtrl'),
                            activeControllerCls: 'active'
                        });
                    }, 100);
                }
            });
        });
    }

    $scope.showGymDetail = function(gym){
        window.session.selected_gym = gym;
        global['goto']("gym_detail/"+gym.GymID);
    }

    $scope.showClubDetail = function(club){
        window.session.selected_club = club;
        global['goto']("club_detail/"+club.ClubID);
    }
});