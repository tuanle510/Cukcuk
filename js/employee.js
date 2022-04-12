$(document).ready(function () {
  new EmployeePage();
});

class EmployeePage {
  TitlePage = "Danh sách nhân viên";
  constructor() {
    // load data
    this.loadData();
    // khởi tạo các sự kiện
    this.initEvent();
  }

  initEvent() {
    $("#btnShowForm").click(this.btnShowForm);
    $(".btnCloseForm").click(this.btnCloseForm);
    $(".sidebar").click(this.btnSideBar);
    $("[required]").blur(this.validateRequired.bind(this));
    // $(document).on("dblclick","#employeeTable tbody tr", this.showDataOnForm());
  }

  /**
   * Hiện data trong form dialog
   * Created: LTTUAN(12/04/2022)
   */
  showDataOnForm() {
    alert("hello");
  }

  /**
   * Thực hiện load dữ liệu
   * Created: LTTUAN (12/04/2022)
   */
  loadData() {
    try {
      var data = null;
      // 1. Lấy dữ liệu từ Api được cung cấp
      $.ajax({
        url: "http://amis.manhnv.net/api/v1/Employees", // Dia chi cua api
        method: "GET",
        // data: "data", // tham số đầu vào cho api nếu có
        // contentType: "application/json",
        // dataType: "json",
        async: false,
        success: function (response) {
          data = response;
        },
        error: function (response) {},
      });

      // 2. xử lí dữ liệu
      // 2.1 duyệt từng đối tượng
      var count = 1;
      for (const entity of data) {
        // 2.2 lấy ra thông tin
        let employeeCode = entity.EmployeeCode;
        let employeeName = entity.EmployeeName;
        let dob = entity.DateOfBirth;
        let salary = Math.floor(Math.random() * 10000000);
        // let salary = entity.Salary;
        let phone = entity.PhoneNumber;
        let email = entity.Email;
        let gender = entity.GenderName;
        let departmentName = entity.DepartmentName;

        // xu li thong tin ngay thang
        dob = this.formatDate(dob);
        // dinh dang thong tin tien te
        salary = this.formatCurrency(salary);

        // 3. building dữ liệu lên UI.
        let trHTML = `
        <tr>
        <td class="text-alight-center">${count}</td>
          <td class="text-align-left">${employeeCode}</td>
          <td class="text-align-left">
            ${employeeName}
          </td>
          <td class="text-align-left">${gender}</td>
          <td class="text-align-center">${dob}</td>
          <td class="text-align-left">${phone}</td>
          <td class="text-align-left">
            ${email}
          </td>
          <td class="text-align-left">Fresher</td>
          <td class="text-align-left" title="${departmentName}" style="max-width: 130px;text-overflow: ellipsis ; white-space: nowrap; overflow: hidden;">${departmentName}</td>
          <td class="text-align-right"> ${salary}</td>
          <td class="text-align-left">Đang thử việc</td>
        </tr>
        `;

        $("#employeeTable tbody").append(trHTML);
        count++;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // format ngày tháng năm
  formatDate(date) {
    var date = new Date(date);
    // kiểm tra có phải date không
    if (Object.prototype.toString.call(date) === "[object Date]") {
      // it is a date
      if (isNaN(date)) {
        return "";
      } else {
        // lấy ra ngày
        let dd = date.getDate();
        dd = dd < 10 ? `0${dd}` : `${dd}`;
        // lấy ra tháng
        let mm = date.getMonth() + 1;
        mm = mm < 10 ? `0${mm}` : `${mm}`;
        // lấy ra năm
        let yy = date.getFullYear();
        return `${dd}/${mm}/${yy}`;
      }
    } else {
      console.log("lỗi");
    }
  }

  // format tiền lương
  formatCurrency(salary) {
    salary = salary.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return salary;
  }

  validateRequired(event) {
    var input = event.currentTarget;
    // kiểm tra giá trị của input có hay không?
    var value = $(input).val();
    // Nếu không có thì hiện thị trạng thái lỗi
    if (value == null || value == "") {
      $(input).addClass("m-input-error");
      $(input).attr("title", "Thông tin này không được để trống");
    } else {
      $(input).removeClass("m-input-error");
      $(input).removeAttr("title");
    }
  }

  /**
   * Hiển thị form chi tiết
   * CreatedBy: LTTuan (08.04.2022)
   *
   */
  btnShowForm() {
    $("#addStaff").show();
    $("#employeeCodeInput").focus();
  }

  btnCloseForm() {
    $("#addStaff").hide();
    $(".m-input").removeClass("m-input-error");
    $(".m-input").removeAttr("title");
  }

  btnSideBar() {
    if ($(".m-menu-text").is(":hidden")) {
      $(".m-navbar").css("width", "225px");
      $(".m-content").css("left", "225px");
      $(".m-menu-text").show();
    } else {
      $(".m-navbar").css("width", "53px");
      $(".m-content").css("left", "53px");
      $(".m-menu-text").hide();
    }
  }
}
