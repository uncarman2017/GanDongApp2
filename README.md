#GanDongApp

### 目录结构：
		-- css 
		-- img
		-- js
		    |-- controllers -- 单个页面独立逻辑
		    |-- comm  -- 引用的函数库（非开发）
		    |-- models -- 公共函数（开发使用）
		    |-- app.js  --  所有的路由控制，每添加一个页面，需要注册一个路由
		    |-- controllers.js -- 页面公共函数，包含页面之间session，settings，global函数等
		-- templates -- 所有单独页面的模板
		-- uploads -- 可能需要临时存储图片的文件夹
		-- start.html -- 程序启动页，启动后会自动跳转到 index.html
		-- index.html -- 程序首页
		-- data.php -- 临时做的模拟数据的接口文件
  
### 注意事项：
		1. controllers.js 里面 settings.ajax_url 是所有接口的配置地址
        2. 所有页面跳转都调用函数 $scope['goto']("页面名字，比如：index"); 
            该方法已经封装到初始化函数里面，不需要每个页面再写一遍，
            另外如果需要跳转前保存数据到下一个页面，
            需要在跳转之前把需要保持的数据保留到 window.session 这个变量里面。
            下一个页面会自动读取到 window.session 到 $scope.data 这个变量中去。
        3. alert 函数包含入参（错误信息内容， 点按钮回调函数， 弹出框样式(imfo, warning, sucess, error)）


### 页面名字对应关系

    注册登录找回密码
        login 登录    
        regis_mobile 注册-输入手机号
        regis_setmesg 注册-输入验证码，设置用户名密码
        forgetpwd_mobile 找回密码-输入手机
        forgetpwd_setpwd 找回密码-重设密码

    教练
        instructor_list 教练列表
        instructor_detail 教练详情

    公用
        List    列表页

    场馆
        gym_list 场馆列表
        gym_detail 场馆信息    
        group_detail 俱乐部详情    
        gym_comment 场馆评论
        gym_debug.html 场馆纠错
        场馆新增

    个人中心
        person_feedback 意见反馈
        person_help 帮助与反馈
        person_myCollect 我的收藏（有隐藏代码情况）
        person_myComment 我的评论
        person_myInfo 个人信息
        person_myMesg 我的消息
        person_reservatioDetail 我的预约详情
        我的预约
        个人照片
        个人主页

    其他
        index   主页
        index_search 场馆OR教练搜索    
        index_searchInput  关键词搜索

    课程预定
        course_appointment 发起课程预约 - 用户端
        course_instructor  课程预约 - 教练端
        course_load 预约公益课，客户待确认
        course_success 预约公益课，成功
        course_error 预约公益课 ，失败
        course_cancel 预约公益课，客户取消预约

需要替换的图片
    checkbox ，option

