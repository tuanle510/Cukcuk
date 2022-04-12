$(document).ready(function () {
  var button = $("#combobox-dropdown");
  var comboboxData = $(".m-combobox-data");
  button.click(function (e) {
    e.preventDefault();
    console.log("hello");
    comboboxData.toggle();
    if (comboboxData.is(":visible")) {
      button.addClass("button-active");
      $(".fa-chevron-down").hide();
      $(".fa-chevron-up").show();
    } else {
      button.removeClass("button-active");
      $(".fa-chevron-down").show();
      $(".fa-chevron-up").hide();
    }
  });

  $("#inputCombobox").focus(function (e) {
    button.addClass("button-focus");
  });

  $("#inputCombobox").blur(function (e) {
    button.removeClass("button-focus");
  });
});
