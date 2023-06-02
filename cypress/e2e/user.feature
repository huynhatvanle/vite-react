Feature: Login

  Rule: Happy paths
    Background:
      Given User go to login page
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Click "Người Dùng" menu
      When Click "Tạo mới" sub menu to "/vn/user/add"
      
    Scenario: U-00 Verify that login successfully with valid Email and Password
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
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
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Click "Người Dùng" menu
      When Click "Tạo mới" sub menu to "/vn/user/add"

      Scenario: U-01 Verify that validation text of Họ và tên appears when leaving the Họ và tên field blanks
      When Enter "text" in "Họ và tên" with ""
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
      When Click "Huỷ bỏ" button

      Scenario: U-02 Verify that validation text of Email appears when leaving the Email field blanks

      Given the user is on the login page
      When the user enters their name as "_RANDOM_" in the "Họ và tên" field
      And the user leaves the "Email" with ""
      And the user enters "Password1!" in the "Mật khẩu" field 
      And the user enters "Password1!" in the "Nhập lại mật khẩu" field
      And the user enters "_RANDOM_" in the "Số điện thoại" field
      And the user selects a date in the "Ngày sinh" field
      And the user selects "Tester" from the "Vị trí" dropdown menu
      And the user selects a date in the "Ngày đầu đi làm" field
      And the user selects "Supper Admin" from the "Vai trò" dropdown menu
      And the user enters "_RANDOM_" in the "Mô tả" textarea field 
      And the user uploads an image file "image.jpg" in the "Tải ảnh lên" field
      And the user clicks the "Lưu lại" button
      Then the message "Xin vui lòng nhập email" appears under the "Email" field
      When the user clicks the "Huỷ bỏ" button

      Scenario: <testcasename> Verify that validation text of Email appears when entering the invalid email

      Given the user is on the login page
      When the user clicks the "Người Dùng" menu
      And the user enters their name as "_RANDOM_" in the "Họ và tên" field
      And the user enters "<email>" in the "Email" field
      And the user enters "Password1!" in the "Mật khẩu" field 
      And the user enters "Password1!" in the "Nhập lại mật khẩu" field
      And the user enters "0788888475" in the "Số điện thoại" field
      And the user selects a date in the "Ngày sinh" field
      And the user selects "Tester" from the "Vị trí" dropdown menu
      And the user selects a date in the "Ngày đầu đi làm" field
      And the user selects "Supper Admin" from the "Vai trò" dropdown menu
      And the user enters "_RANDOM_" in the "Mô tả" textarea field 
      And the user uploads an image file "image.jpg" in the "Tải ảnh lên" field
      And the user clicks the "Lưu lại" button
      Then the message "Vui lòng nhập địa chỉ email hợp lệ!" appears under the "Email" field for each of the following emails:
        | testcasename| email             |
        | U-03        | nguyenvan@        |
        | U-04        | nguyenvan.com     |
        | U-05        | nguyenvan@.com    |
        | U-06        | nguyenvan@@#$.com |
        | U-07        | @gmail.com        |
        | U-08        | @#$@outlook.com   |
        | U-09        | !@#$dd            |
      When the user clicks the "Huỷ bỏ" button.

      Scenario: U-10 Verify that validation text of Mật khẩu appears when leaving the Mật khẩu field blanks
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with ""
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "07888888823224343"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
      When Click "Huỷ bỏ" button

      Scenario: U-11 Verify that validation text of Mật khẩu appears when entering Mật khẩu less than 6-character
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "aB12."
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Mật khẩu" displayed under "Vui lòng nhập tối thiểu 6 ký tự!" field
      When Click "Huỷ bỏ" button

      Scenario: U-12 Verify that the validation text for the Mật khẩu appears when entering a Mật khẩu that does not contain at least one uppercase character
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "1234a."
      When Enter "text" in "Nhập lại mật khẩu" with "1234a."
      When Enter "phone" in "Số điện thoại" with "0788888888"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Mật khẩu" displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" field
      When Click "Huỷ bỏ" button

      Scenario: U-13 Verify that the validation text for the Nhập lại mật khẩu and Mật khẩu different
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Passwo1!"
      When Enter "phone" in "Số điện thoại" with "07888888"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Nhập lại mật khẩu" displayed under "Hai mật khẩu bạn nhập không nhất quán!" field
      When Click "Huỷ bỏ" button

      Scenario: U-14 Verify that the validation text for the Mật khẩu appears when entering Mật khẩu that does not contain at least one special character
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888883"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Mật khẩu" displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" field
      When Click "Huỷ bỏ" button

      Scenario: U-15 Verify that validation text of Số điện thoại appears when leaving Số điện thoại field blanks
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with ""
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
      When Click "Huỷ bỏ" button

      
      Scenario: U-16 Verify that validation text of Số điện thoại appears when entering non-numeric data
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "078888888a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Vui lòng chỉ nhập số" field
      When Click "Huỷ bỏ" button

      Scenario: U-17 Verify that validation text of Số điện thoại appears when entering greater than 12 numbers
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "078888888884333636"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Vui lòng nhập tối đa phải có 12 ký tự số!" field
      When Click "Huỷ bỏ" button

      Scenario: U-18 Verify that validation text of Ngày sinh appears when leaving Ngày sinh field blanks
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field
      When Click "Huỷ bỏ" button

      Scenario: U-19 Verify that validation text of Vị trí appears when leaving Vị trí field blanks
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field
      When Click "Huỷ bỏ" button

      Scenario: U-20 Verify that validation text of Ngày bắt đầu đi làm appears when leaving Ngày bắt đầu đi làm field blanks
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Ngày bắt đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field
      When Click "Huỷ bỏ" button

      
      Scenario: U-21 Verify that validation text of Vai trò appears when leaving Vai trò field blanks
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Vai trò" displayed under "Xin vui lòng chọn vai trò" field
      When Click "Huỷ bỏ" button

      Scenario: U-22 The admin CAN not create an account with the already registered email
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1!"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then User look message "Thất bại" popup
      When Click "Huỷ bỏ" button
      When Click on the "Xóa" button in the "Email" table line
----------------------------------------------------------------
