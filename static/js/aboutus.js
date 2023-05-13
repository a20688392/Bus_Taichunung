window.onload = function () {
    init_getJson();
}

function init_getJson() {

    let dataurl = "./static/js/aboutus.json";
    
    $.ajax({
        url: dataurl,
        method: 'GET',
        dataType: 'json',
        data: '',
        async: true,

        success: function (data) {
            console.log(data);
            for (var i = 0; i < 2; i++) {
                //card
                var liCard = $("<li>");
                liCard.addClass("card");
                liCard.attr("title", "個人資訊");
                //照片
                var Cardimg = $("<img>");
                Cardimg.addClass("headimg");
                Cardimg.attr("src",data[0].img[i]);
                //班級
                var CardClass = $("<p>");
                CardClass.html(data[0].class);
                // CardLink.addClass("busLink");
                //名字
                var Cardname = $("<p>");
                Cardname.html(data[0].name[i]);
                //學號
                var Cardnum = $("<p>");
                Cardnum.html("學號: " + data[0].number[i]);
                // 座右銘
                var Cardnka = $("<p>");
                Cardnka.html("座右銘： "+data[0].nickname[i]);
                
                liCard.append(
                    Cardimg,
                    CardClass,
                    Cardname,
                    Cardnum,
                    Cardnka
                );
                $("ul#aboutus").append(liCard);
            }

        }
    });
}