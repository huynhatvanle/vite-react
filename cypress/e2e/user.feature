Feature: Login

  Rule: Happy paths
    Background:
      Given User go to login page
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Click "Người Dùng" menu
      When Click "Tạo mới" sub menu to "/vn/user/add"
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#      When Enter "text" in "Ngày sinh" with "_RANDOM_"
      When Click select "Vị trí" with "Tester"
#      When Enter "text" in "Ngày đầu đi làm" with "_RANDOM_"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "text" in textarea "Mô tả" with "_RANDOM_"

    Scenario: SI-01 Verify that login successfully with valid Email and Password
      Then User look message "Thành công" popup

