
app.controller('gym_list', function ($scope, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
        // 加载页面初始化调用方法
        global.onLoadFunc($scope);

        initPage();
    });

    function initPage() {
        $scope.settings = settings;
        
        $scope.search = {
        	position : [],
        	category : [],
        	selected_position : "",
			selected_category : "",
        	searchkey : "",
        	pageNo: 1,
        	pageSize : settings.pageSize,
        }
        $scope.items = [];
        // 获取筛选条件信息
        $scope.loadCategories();
        // 获取场馆信息
        $scope.seachGym();
    }

    // 获取顶部筛选条件
    $scope.loadCategories = function(){
    	// 获取所有能选择的城市
    	$scope.loadCategory("position");
    	// 获取所有能选择的运动类型
    	$scope.loadCategory("category");
    }
    
    $scope.loadCategory = function(tp){
    	var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.getDicItemList,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
                DicType: tp=="position" ? "DistrictName" : tp
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            // TODO 
            $scope.$apply(function () {
                if (tp == "position") {
                    $scope.DicItempositionList = oData.DicItemList;
                    $scope.DicItempositionList.unshift({"DicItemID":0,"DicType":"DistrictName","ItemText":"所有地区","ItemValue":0});
                    console.log($scope.DicItempositionList);
                    $scope.search.selected_position = $scope.DicItempositionList[0];
                }
                else {
                    $scope.DicItemcategoryList = oData.DicItemList;
                    $scope.search.selected_category = $scope.DicItemcategoryList[0];
                }
            });
            
        });
    }
    $scope.searchByPosition = function (Item) {
        $scope.search.selected_position = Item;
        $scope.show_position = false;
        $scope.search.pageNo = 1;
        $scope.items = [];
        $scope.seachGym();
    }
    $scope.searchByCategory = function (Item) {
        $scope.search.selected_category = Item;
        $scope.show_category = false;
        $scope.search.pageNo = 1;
        $scope.items = [];
        $scope.seachGym();
    }
    $scope.seachGym = function(){
    	var param = {
            _method: 'post',
            _url: settings.ajax_domain + settings.ajax_url.searchGym,
            _timeout: settings.ajax_timeout,
            _cache: false,
            _param: {
            	SearchKey : $scope.search.searchkey,
                DistrictID: $scope.search.selected_position.DicItemID ? $scope.search.selected_position.DicItemID : "",
	        	PageNo: $scope.search.pageNo,
	        	PageSize : $scope.search.pageSize,
            }
        };
        global.ajax_data($scope, param, function (oData) {
            console.log(oData);
            $scope.$apply(function(){
            	if(oData.Items)
                {
                    $scope.items = $scope.items.concat(oData.Items);
                }
                $scope.total = oData.TotalCount;
            });
        });
    }
    $scope.get_more = function(){
        $scope.search.pageNo += 1;
        $scope.seachGym();
    }
    $scope.showDetail = function(gym){
    	window.session.selected_gym = gym;
    	global['goto']("gym_detail/"+gym.GymID);
    }
});