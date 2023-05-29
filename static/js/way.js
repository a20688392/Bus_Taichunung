(function ($) {
    $.getUrlParam = function (name) {
        var reg
            = new RegExp("(^|&)" +
                name + "=([^&]*)(&|$)");
        var r
            = window.location.search.substring(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
})(jQuery);

var datas = '';
$(document).ready(
    function () {
        $("#gobtn").click(function () {

            if ($("#backbtn").attr("data-type") == 1) {
                $("#gobtn").toggleClass("btn-outline-success");
                $("#gobtn").toggleClass("btn-success");
                $("#backbtn").toggleClass("btn-outline-success");
                $("#backbtn").toggleClass("btn-success");
                getGoJson();
            }
        });
        $("#backbtn").click(function () {
            if ($("#gobtn").attr("data-type") == 1) {
                $("#gobtn").toggleClass("btn-outline-success");
                $("#gobtn").toggleClass("btn-success");
                $("#backbtn").toggleClass("btn-outline-success");
                $("#backbtn").toggleClass("btn-success");
                getBackJson();
            }
        });
        $(".fav-item").click(function () {
            console.log("tet");

        });
    }
);

function myfav() {
    getFavorite()
    $("#change").click(function () {
        $.ajax({
            url: "../../api/savefavorite",
            method: 'POST',
            data: {
                busNumber: $("#searchchange").val()
            },
            async: false,

            success: function (res) {
                alert(res.message)
                getFavorite()
            }
        })
    })
}

function getFavorite() {
    $.ajax({
        method: 'GET',
        url: "../../api/getfavorite",
        async: true,

        success: function (res) {
            $("#fav").empty();
            for (var i = 0; i < res.length; i++) {
                let fav = $("<button>");
                fav.addClass("fav-item");
                fav.attr("id", res[i][0]);
                let items = $("<div>");
                items.addClass("item");
                let num = $("<div>");
                num.addClass("item-num");
                let text = $("<div>");
                text.addClass("item-text");
                text.html(res[i][1]);
                num.html(res[i][0]);
                fav.append(num, text);
                $("#fav").append(fav);
                $("#searchchange").val("");
            }
            $(".fav-item").click(function () {
                var id = $(this).attr("id");
                $("#go").empty();
                $("#go").html(id + ' 號公車路線');
                roadLine = id;
                checkWay();
            });
        }
    })
}

var roadLine = $.getUrlParam('Zh_tw');
var datas = '';
window.onload = function () {
    $("#go").html(roadLine + ' 號公車路線');
    myfav();

};


/* 判斷去程回程 */
var check = 'go';

function checkWay() {
    console.log(check);
    if (check == "go") {
        getGoJson();
    }
    else {
        getBackJson();
    }

}
checkWay();

/* 去程資料 */
function getGoJson() {
    console.log(check);
    $("#bus-way-list").empty();
    clearInterval(getBackJson); // 讓畫面不會渲染出 回程路線
    check = "go";
    console.log(roadLine);
    // var GoUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taichung?$filter=RouteName%2FZh_tw%20eq%20%27${roadLine}%27%20and%20Direction%20eq%20%270%27&$orderby=StopSequence%20asc&$top=100&$format=JSON`;
    var GoUrl = './static/js/go.json';
    console.log(GoUrl);
    $.ajax({
        url: GoUrl,
        method: 'GET',
        dataType: 'json',
        data: '',
        async: true,

        success: function (items) {
            console.log(items);
            console.log("去程交換")
            $("ul#bus-way-list").empty();
            $("#gobtn").html(`往 ${items[items.length - 1].StopName.Zh_tw}`);
            $("#backbtn").html(`往 ${items[0].StopName.Zh_tw}`);
            $("#gobtn").attr("data-type", 1);
            $("#backbtn").attr("data-type", 0);
            for (var i = 0; i < items.length; i++) {
                const Time = Math.floor(items[i].EstimateTime / 60); //將到站時間換算成分鐘
                if (items[i].EstimateTime == undefined) { //暫無公車靠近，顯示 過站
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station over");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html("過站"));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(items[i].StopName.Zh_tw);
                    liCard.append(
                        Carddiv, CardWay, CardName
                    );
                    $("#bus-way-list").append(liCard);

                } else if (items[i].EstimateTime < 0) { //末班駛離
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station stop");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html("末班駛離"));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(items[i].StopName.Zh_tw);

                    liCard.append(
                        Carddiv, CardWay, CardName
                    );
                    $("#bus-way-list").append(liCard);
                } else if (items[i].EstimateTime == 0) { //進站中
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station arrive");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html("進站中"));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(items[i].StopName.Zh_tw);
                    var CardBus = $("<div>");
                    CardBus.addClass("bus");
                    var CardBus_ID = $("<i>");
                    CardBus_ID.addClass("fa fa-bus");
                    var CardBus_Text = $("<span>");
                    CardBus_Text.html(items[i].PlateNumb);
                    CardBus.append(CardBus_ID, CardBus_Text);

                    liCard.append(
                        Carddiv, CardWay, CardName, CardBus
                    );
                    $("#bus-way-list").append(liCard);

                } else if (items[i].EstimateTime == 60) { //剩餘一分
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station arrive");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html(`${Time}分`));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(items[i].StopName.Zh_tw);
                    var CardBus = $("<div>");
                    CardBus.addClass("bus");
                    var CardBus_ID = $("<i>");
                    CardBus_ID.addClass("fa fa-bus");
                    var CardBus_Text = $("<span>");
                    CardBus_Text.html(items[i].PlateNumb);
                    CardBus.append(CardBus_ID, CardBus_Text);

                    liCard.append(
                        Carddiv, CardWay, CardName, CardBus
                    );
                    $("#bus-way-list").append(liCard);
                } else if (items[i].EstimateTime) { //顯示多久到站
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station stop");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html(`${Time}分`));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(items[i].StopName.Zh_tw);

                    liCard.append(
                        Carddiv, CardWay, CardName
                    );
                    $("#bus-way-list").append(liCard);
                }
            }
        }
    });


}


/* 回程資料 */
function getBackJson() {
    $("#bus-way-list").empty();
    clearInterval(getBackJson); // 讓畫面不會渲染出 回程路線
    check = "back";
    // var BackUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taichung?$filter=RouteName%2FZh_tw%20eq%20%27${roadLine}%27%20and%20Direction%20eq%20%271%27&$orderby=StopSequence%20asc&$top=100&$format=JSON`;
    var BackUrl = "./static/js/back.json";
    console.log(BackUrl);
    $.ajax({
        url: BackUrl,
        method: 'GET',
        dataType: 'json',
        data: '',
        async: true,

        success: function (data) {
            console.log(data);
            console.log("回程交換");
            $("ul#bus-way-list").empty();
            $("#gobtn").html(`往 ${data[data.length - 1].StopName.Zh_tw}`);
            $("#backbtn").html(`往 ${data[0].StopName.Zh_tw}`);
            $("#gobtn").attr("data-type", 0);
            $("#backbtn").attr("data-type", 1);
            for (var i = 0; i < data.length; i++) {
                const Time = Math.floor(data[i].EstimateTime / 60); //將到站時間換算成分鐘
                if (data[i].EstimateTime == undefined) { //暫無公車靠近，顯示 過站
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station over");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html("過站"));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(data[i].StopName.Zh_tw);
                    liCard.append(
                        Carddiv, CardWay, CardName
                    );
                    $("#bus-way-list").append(liCard);

                } else if (data[i].EstimateTime < 0) { //末班駛離
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station stop");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html("末班駛離"));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(data[i].StopName.Zh_tw);

                    liCard.append(
                        Carddiv, CardWay, CardName
                    );
                    $("#bus-way-list").append(liCard);
                } else if (data[i].EstimateTime == 0) { //進站中
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station arrive");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html("進站中"));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(data[i].StopName.Zh_tw);
                    var CardBus = $("<div>");
                    CardBus.addClass("bus");
                    var CardBus_ID = $("<i>");
                    CardBus_ID.addClass("fa fa-bus");
                    var CardBus_Text = $("<span>");
                    CardBus_Text.html(data[i].PlateNumb);
                    CardBus.append(CardBus_ID, CardBus_Text);

                    liCard.append(
                        Carddiv, CardWay, CardName, CardBus
                    );
                    $("#bus-way-list").append(liCard);

                } else if (data[i].EstimateTime == 60) { //剩餘一分
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station arrive");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html(`${Time}分`));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(data[i].StopName.Zh_tw);
                    var CardBus = $("<div>");
                    CardBus.addClass("bus");
                    var CardBus_ID = $("<i>");
                    CardBus_ID.addClass("fa fa-bus");
                    var CardBus_Text = $("<span>");
                    CardBus_Text.html(data[i].PlateNumb);
                    CardBus.append(CardBus_ID, CardBus_Text);

                    liCard.append(
                        Carddiv, CardWay, CardName, CardBus
                    );
                    $("#bus-way-list").append(liCard);
                } else if (data[i].EstimateTime) { //顯示多久到站
                    var liCard = $("<li>");
                    liCard.addClass("bus-state");
                    var Carddiv = $("<div>");
                    Carddiv.addClass("station stop");
                    var CardTime = $("<div>");
                    CardTime.addClass("time");
                    Carddiv.append(CardTime.html(`${Time}分`));
                    var CardWay = $("<div>");
                    CardWay.addClass("way");
                    var CardName = $("<div>");
                    CardName.addClass("sta-name");
                    CardName.html(data[i].StopName.Zh_tw);

                    liCard.append(
                        Carddiv, CardWay, CardName
                    );
                    $("#bus-way-list").append(liCard);
                }
            }
        }
    });
}
setInterval(checkWay, 30000);



