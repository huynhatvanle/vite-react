Feature: User

  Rule: Happy paths
    Background:
      When Login to admin
      When Click "Người Dùng" menu
      When Click "Tạo mới" sub menu to "/vn/user/add"
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh" with "_RANDOM_"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button

    Scenario: SI-01 Verify that login successfully with valid Email and Password
      Then User look message "Tạo thành công" popup
      When Click "Huỷ bỏ" button
      When Click on the "Xóa" button in the "Email" table line

