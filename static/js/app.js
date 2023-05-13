window.onload = function () {
    init_getJson();
};

var datas = '';
function init_getJson() {

    // var cros = 'https://cors-anywhere.herokuapp.com/'
    // var originUrl = "https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taichung?%24top=300&%24format=JSON"
    // var dataUrl = cros + originUrl
    //https://cors-anywhere.herokuapp.com/https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taichung?%24top=300&%24format=JSON
    $.ajax({
        // url: dataUrl,
        url: "./static/js/data.json",
        method: 'GET',
        dataType: 'json',
        data: '',
        async: true,

        success: function (data) {
            datas = data;
            console.log(datas);
            showBusWay(data);
        }
    });

}

function showBusWay(items) {
    li_items(items);

}

var search = $(".search");
search.bind("input", function () {//input屬性 = 使用者每次操作都跑一次 function
    searchBus();
});
function searchBus() {
    var searchVu = search.val(); // searchVu 為使用者輸入的路線號
    console.log(searchVu + 'test');
    console.log(datas);
    function filterItems(searchVu) {
        return datas.filter(function (i) {
            return i.SubRoutes[0].SubRouteName.Zh_tw.indexOf(searchVu.toUpperCase()) == 0;
            // 撈出開頭符合使用者搜尋的資料
            // .toUpperCase() 強制轉大寫
        })
    }

    function updatedList(items) { // 重新渲染路線結果
        $("ul#list").empty();
        li_items(items);

    }
    updatedList(filterItems(searchVu));
}
// 重新渲染路線結果
function li_items(items) {
    for (var i = 0; i < items.length; i++) {
        //card
        var liCard = $("<li>");
        liCard.addClass("card");
        liCard.attr("title", "路線詳情");
        //連結
        var CardLink = $("<a>");
        CardLink.attr("href", `busWay?Zh_tw=${items[i].SubRoutes[0].SubRouteName.Zh_tw}&En=${items[i].SubRoutes[0].SubRouteName.En}`);
        CardLink.addClass("busLink");
        //內容
        var CardText = $("<p>");
        CardText.addClass("bus_way center");
        var CardNum = $("<p>");
        CardNum.addClass("bus_num center");
        CardLink.append(
            CardText.html(items[i].SubRoutes[0].Headsign),
            CardNum.html(items[i].SubRoutes[0].SubRouteName.Zh_tw),
        );
        liCard.append(CardLink);
        $("ul#list").append(liCard);
    }
}
