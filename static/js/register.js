$(document).ready(function () {
  $("#sub").click(function () {
    if ($("#inputName").val != "") {
      checkname = 1;
    }
    if ($("#inputAccount").val != "") {
      checkaccount = 1;
    }
    console.log(checkname);
    console.log(checkaccount);
    console.log(checkpassword);
    console.log(checkphone);
    console.log(checkemail);
    if (
      checkname != 1 ||
      checkaccount != 1 ||
      checkpassword != 1 ||
      checkphone != 1 ||
      checkemail != 1
    ) {
      alert("有資料不正確或沒填!");
    } else {
      const options = {
        method: "POST",
        headers: { "content-type": "multipart/form-data" },
        data: {
          name: $("#inputName").val(),
          account: $("#inputAccount").val(),
          password: $("#inputPassword").val(),
          checkpassword: $("#inputAgainPassword").val(),
          phone: $("#inputPhone").val(),
          email: $("#inputEmail").val(),
        },
        url: "/register",
      };

      axios(options)
        .then((res) => {
          window.location.href = "http://localhost:5000/";
          console.log(res);
          console.log("????????????????????????");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

var search = $("#inputAgainPassword");
var searchphone = $("#inputPhone");
var searchemail = $("#inputEmail");
let checkname = 0;
let checkaccount = 0;
let checkpassword = 0;
let checkphone = 0;
let checkemail = 0;
search.bind("input", function () {
  //input屬性 = 使用者每次操作都跑一次 function
  check();
});
searchphone.bind("input", function () {
  //input屬性 = 使用者每次操作都跑一次 function
  checkphoneregxp();
});
searchemail.bind("input", function () {
  //input屬性 = 使用者每次操作都跑一次 function
  checkemailregxp();
});

function check() {
  console.log($("#inputPassword").val());
  console.log($("#inputAgainPassword").val());
  if ($("#inputPassword").val() == $("#inputAgainPassword").val()) {
    $("#inputPassword").attr("class", "is-valid form-control");
    $("#inputAgainPassword").attr("class", "is-valid form-control");
    checkpassword = 1;
  } else {
    $("#inputPassword").attr("class", "is-invalid form-control");
    $("#inputAgainPassword").attr("class", "is-invalid form-control");
    checkpassword = 0;
  }
}

function checkphoneregxp() {
  console.log($("#inputPhone").val());
  var phoneRegxp = /^09[0-9]{8}$/;
  if (phoneRegxp.test($("#inputPhone").val()) != true) {
    console.log("電話號碼錯誤");
    $("#inputPhone").attr("class", "is-invalid form-control");
    checkphone = 0;
  } else {
    $("#inputPhone").attr("class", "is-valid form-control");
    checkphone = 1;
  }
}
function checkemailregxp() {
  console.log($("#inputEmail").val());
  var emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/;

  if (emailRegxp.test($("#inputEmail").val()) != true) {
    console.log("電子信箱格式錯誤");
    $("#inputEmail").attr("class", "is-invalid form-control");
    checkemail = 0;
  } else {
    $("#inputEmail").attr("class", "is-valid form-control");
    checkemail = 1;
  }
}
