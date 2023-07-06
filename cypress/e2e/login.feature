Feature: Login

  Rule: Happy paths
    Background:
      Given User go to login page

    Scenario: SI-01 Verify that login successfully with valid Email and Password
      When Login to admin

  Rule: Bad paths
    Background:
      Given User go to login page

    Scenario: SI-02 Verify that Login unsuccessfully with invalid Email
      When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Click "Đăng nhập" button
      Then User look message "Người dùng _@Tên đăng nhập@_ không tồn tại!" popup

    Scenario: SI-03 Verify that Login unsuccessfully with invalid Password
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!!"
      When Click "Đăng nhập" button
      Then User look message "Thông tin đăng nhập không hợp lệ cho người dùng _@Tên đăng nhập@_" popup

    Scenario: SI-04 Verify that Login unsuccessfully because no enter Email and Password
      When Click "Đăng nhập" button
      Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field
      Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

    Scenario: SI-05 Verify that Login unsuccessfully because no enter Email
      When Enter "text" in "Mật khẩu" with "Password12"
      When Click "Đăng nhập" button
      Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field

    Scenario: SI-06 Verify that Login unsuccessfully because no enter Password
      When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
      When Click "Đăng nhập" button
      Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
