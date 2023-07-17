Feature: Signin

  Rule: Happy paths
    Background:
      Given User go to login page

    Scenario: SI-01 Verify that login successfully with valid Email and Password
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Check "Danh sách nghỉ phép" header
      When Check "Người Dùng" user
      When Check "Thiết lập" setup
      When Click "Tiếng Việt" translate
 