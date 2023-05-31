Feature: Login

  Rule: Happy paths
    Background:
      Given User go to login page

    Scenario: SI-01 Verify that login successfully with valid Email and Password
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup

  Rule: Bad paths
    Background:
      Given User go to login page

    Scenario: SI-02 Verify that Login unsuccessfully with invalid Email
      When Enter "email" in "Tên đăng nhập" with "adminsss@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Click "Đăng nhập" button
      Then User look message "Người dùng adminsss@admin.com không tồn tại!" popup

    Scenario: SI-03 Verify that Login unsuccessfully with invalid Password
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!2"
      When Click "Đăng nhập" button
      Then User look message "Thông tin đăng nhập không hợp lệ cho người dùng admin@admin.com" popup

    Scenario: SI-04 Verify that Login unsuccessfully because no enter Email and Password
      When Click "Đăng nhập" button
      Then Required message "Tên đăng nhập" displayed under "Đây là trường bắt buộc!" field
      Then Required message "Mật khẩu" displayed under "Đây là trường bắt buộc!" field

    Scenario: SI-05 Verify that Login unsuccessfully because no enter Email
      When Enter "text" in "Mật khẩu" with "Password1!2"
      When Click "Đăng nhập" button
      Then Required message "Tên đăng nhập" displayed under "Đây là trường bắt buộc!" field

    Scenario: SI-06 Verify that Login unsuccessfully because no enter Password
      When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
      When Click "Đăng nhập" button
      Then Required message "Mật khẩu" displayed under "Đây là trường bắt buộc!" field
