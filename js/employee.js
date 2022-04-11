$(document).ready(function () {
  new EmployeePage();
});

class EmployeePage {
  TitlePage = 'Danh sách nhân viên';
  constructor() {
    // Load da ta
    this.loadData();
    // khởi tạo các sự kiện
    this.initEvent();
  }

  initEvent() {
    $('#btnShowForm').click(this.btnShowForm);
    $('.btnCloseForm').click(this.btnCloseForm);
    $('[required]').blur(this.validateRequired.bind(this));
  }

  loadData() {}

  validateRequired(event) {
    this.loadData();
    var input = event.currentTarget;
    console.log(input);
    // kiểm tra giá trị của input có hay không?
    var value = $(input).val();
    // Nếu không có thì hiện thị trạng thái lỗi
    if (value == null || value == '') {
      $(input).addClass('m-input-error');
      $(input).attr('title', 'Thông tin này không được để trống');
    } else {
      $(input).removeClass('m-input-error');
      $(input).removeAttr('title');
    }
  }

  /**
   * Hiển thị form chi tiết
   * CreatedBy: LTTuan (08.04.2022)
   *
   */

  btnShowForm() {
    $('#addStaff').show();
  }

  btnCloseForm() {
    $('#addStaff').hide();
  }
}
