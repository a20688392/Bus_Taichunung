window.onload = function () {
    init_getJson();
};

function init_getJson() {

    let dataurl = "./static/js/qa.json";

    $.ajax({
        url: dataurl,
        method: 'GET',
        dataType: 'json',
        data: '',
        async: true,

        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                //card
                var Card = $("<div>");
                Card.addClass("qa");
                Card.attr("title", "Q&A");
                //照片
                var CardQ = $("<p>");
                CardQ.addClass("Q");
                CardQ.html("Q："+data[i].Q);

                var CardA = $("<p>");
                CardA.addClass("A");
                CardA.html("A："+data[i].A);

                Card.append(
                    CardQ,
                    CardA
                );
                $(".QA").append(Card);
            }

        }
    });
}