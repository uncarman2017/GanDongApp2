var getPageSize = function () {
    var width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    return {
        width: width,
        height: height
    };
};
var getElementRealSize = function (el) {
    var $el = $(el);
    if($el.length == 0)
    {
        return {width: 0, height: 0};
    }
    else
    {
        return {
            width: ($el.width() + parseInt($el.css('margin-left')) + parseInt($el.css('margin-right'))),
            height: ($el.height() + parseInt($el.css('margin-top')) + parseInt($el.css('margin-bottom')))
        };
    }
};

function xmlToJson(xml) {
     
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }
 
    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].length) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};



// add toggle events
$(function($) {
    // set page content 100% height
    var p = getPageSize();
    $(".content").css({
        'height': p.height
    });
    
    $("._toggle").each(function(index, element) {
        var $obj = $(this);
        var $target = $("#" + $obj.attr('target'));
        $obj.on('mouseup', function(e){
            if($($target).is(":visible"))
            {
                $($target).fadeOut(200);
            }
            else
            {
                $($target).fadeIn(200);
            }
            e.preventDefault();
            e.stopPropagation();
        });
    });
    $(".container > *").on('mouseup', function(){
        $('.dropdown-menu').fadeOut(200);
    });
});
function loadFromLocal(key, callback)
{
    var val = appcan.locStorage.val(key);
    var result = (val=='' || val==undefined || val==null) ? false : true;
    if(result)
    {
        callback(val);
    }
    return result;
}
function saveToLocal(key, val)
{
    appcan.locStorage.setVal(key, val);
}
document.addEventListener('onbeforeunload', function (e) { $("#loadingDiv").show(); }, false);






