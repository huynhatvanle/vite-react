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
      
    Scenario: U-57 Verify that login successfully with valid Email and Password
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then User look message "Tạo thành công" popup
      When Click "Huỷ bỏ" button
      When Click on the "Xóa" button in the "Email" table line

Rule: Bad paths
    Background:
      Given User go to login page
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Click "Người Dùng" menu
      When Click "Tạo mới" sub menu to "/vn/user/add"

      Scenario: U-01 Verify that login unsuccessfully with valid Họ và tên field blank
      When Enter "text" in "Họ và tên" with ""
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Họ và tên" displayed under "Đây là trường bắt buộc!" field
      When Click "Huỷ bỏ" button

      Scenario: U-02 Verify that login unsuccessfully with valid Email field blank

        Given the user is on the login page
        When the user enters their name as "_RANDOM_" in the "Họ và tên" field
        And the user leaves the "Email" with ""
        And the user enters "Password1" in the "Mật khẩu" field 
        And the user enters "Password1" in the "Nhập lại mật khẩu" field
        And the user enters "_RANDOM_" in the "Số điện thoại" field
        And the user selects a date in the "Ngày sinh" field
        And the user selects "Tester" from the "Vị trí" dropdown menu
        And the user selects a date in the "Ngày đầu đi làm" field
        And the user selects "Supper Admin" from the "Vai trò" dropdown menu
        And the user enters "_RANDOM_" in the "Mô tả" textarea field 
        And the user uploads an image file "image.jpg" in the "Tải ảnh lên" field
        And the user clicks the "Lưu lại" button
        Then the message "Đây là trường bắt buộc!" appears under the "Email" field
        When the user clicks the "Huỷ bỏ" button

      Scenario: U-03 Verify that login unsuccessfully with invalid Email

  Given the user is on the login page
  When the user clicks the "Người Dùng" menu
  And the user enters their name as "_RANDOM_" in the "Họ và tên" field
  And the user enters "nguyenvan" in the "Email" field
  And the user enters "Password1" in the "Mật khẩu" field 
  And the user enters "Password1" in the "Nhập lại mật khẩu" field
  And the user enters "0788888475" in the "Số điện thoại" field
  And the user selects a date in the "Ngày sinh" field
  And the user selects "Tester" from the "Vị trí" dropdown menu
  And the user selects a date in the "Ngày đầu đi làm" field
  And the user selects "Supper Admin" from the "Vai trò" dropdown menu
  And the user enters "_RANDOM_" in the "Mô tả" textarea field 
  And the user uploads an image file "image.jpg" in the "Tải ảnh lên" field
  And the user clicks the "Lưu lại" button
  Then the message "Vui lòng nhập địa chỉ email hợp lệ!" appears under the "Email" field for each of the following emails:
    - nguyenvan@
    - nguyenvan.com
    - nguyenvan@.com
    - nguyenvan@@#$.com
    - @gmail.com
    - @#$@outlook.com
    - !@#$dd
  When the user clicks the "Huỷ bỏ" button.

      Scenario: U-07 Verify that login unsuccessfully with invalid So dien thoai
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "07888888823224343"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-08 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-09 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-10 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-11 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-11 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      
      Scenario: U-08 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-09 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-10 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-11 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-11 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      
      Scenario: U-08 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-09 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-10 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-11 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-11 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button