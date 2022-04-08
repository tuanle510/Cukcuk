/**
 * Hiển thị form chi tiết
 * CreatedBy: LTTuan (08.04.2022)
 *
 */

$(document).ready(function () {
  // gắn các sự kiện cho các element
  $("#btnCloseDialog").click(function () {
    $("#addStaff").hide();
  });

  $("#btnAdd").click(btnAddOnClick);
});

function btnAddOnClick() {
  $("#addStaff").show();
}

