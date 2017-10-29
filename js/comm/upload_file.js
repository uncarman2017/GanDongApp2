function ajaxFileUpload(fileCtrolId) {
    $.ajaxFileUpload(
    {                  
        dataType: 'json',
        url: global.APIIP + "/UploadHandler.ashx",
        secureuri: false,
        limitConcurrentUploads: 1,
        sequentialUploads: true,
        progressInterval: 100,
        maxChunkSize: 10000,
        fileElementId: fileCtrolId, 
        success: function (data, status) 
        {
            if (typeof (data.ResultMessage) != undefined) {
                alert(data.ResultMessage);
            }
        },
        error: function (data, status, e) 
        {
            if (typeof (data.ResultMessage) != undefined) {
                alert(data.ResultMessage);
            } else {
                alert("服务器未响应。");
            }
        }
    });
}