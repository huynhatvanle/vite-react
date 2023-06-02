Feature: Login

  Rule: Happy paths
    Background:
      Given User go to login page
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Click "Nhóm" menu
      When Click "Tạo mới" button
      Then User look "Thêm mới" modal
  
Scenario: T_1 Verify that login successfully with valid Email and Password
      When Enter "text" in "Tên Nhóm" with "_RANDOM_"
      When Enter "email" in "Mô tả" with "_RANDOM_"
      When Click select "Quản lý" with "Minh Thư"
      when Click "Lưu lại" button
      