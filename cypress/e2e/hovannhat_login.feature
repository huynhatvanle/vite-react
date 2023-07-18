Feature: LOGIN FEATURE

    Background:
        Given User go to login page
    Rule: Verify validation text
        Scenario: SI-01: Validation text with "Tên đăng nhập" field
            When  Enter "text" in "Mật khẩu" with "Password1!"
            When Click "Đăng nhập" button
            Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field

        Scenario: SI-02 Validation text with "Mật khẩu" field
            When  Enter "text" in "Tên đăng nhập" with "admin@admin.com"
            When Click "Đăng nhập" button
            Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

        Scenario: SI-03 Validation text with "Tên đăng nhập" field and "Mật khẩu" field
            When Click "Đăng nhập" button
            Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field
            Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

        Scenario: SI-04: Validation text with "Tên đăng nhập" field
            When  Enter "text" in "Tên đăng nhập" with "text_user"
            When  Enter "text" in "Mật khẩu" with "password"
            When Click "Đăng nhập" button
            Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field

    Rule: Verify error message
        Scenario Outline: Error message
            When  Enter "text" in "Tên đăng nhập" with "<username>"
            When  Enter "text" in "Mật khẩu" with "<password>"
            When Click "Đăng nhập" button
            Then User look message "<message>" popup

            Examples:
                | username            | password   | message                                                           |
                | text_user@gmail.com | Password1! | Người dùng _@Tên đăng nhập@_ không tồn tại!                       |
                | admin@admin.com     | text_pass  | Thông tin đăng nhập không hợp lệ cho người dùng _@Tên đăng nhập@_ |
                | text_user@gmail.com | text_pass  | Người dùng _@Tên đăng nhập@_ không tồn tại!                       |
                | text_user@gmail.com | text       | password must be longer than or equal to 6 characters             |

    Rule: Verify Sign in successfuly
        Scenario Outline: SI-09 Verify that Admin + Manager can successfully login with correct 'Tên đăng nhập' and 'Mật khẩu'
            When  Enter "text" in "Tên đăng nhập" with "admin@admin.com"
            When  Enter "text" in "Mật khẩu" with "Password1!"
            When Click "Đăng nhập" button
            Then User look message "Thành công" popup
            And User look title "Danh sách nghỉ phép"
            And User look dashboard "Admin"
            And User look menu "Người Dùng" option
            And User look menu "Nghỉ phép" option
            And User look menu "Thiết lập" option
            Examples:
                | username                     | password      |
                | admin@admin.com              | Password1!    |
                | hodutali_manager@husc.edu.vn | Nhat@01101999 |

        Scenario: SI-10 Verify that Staff can successfully login with correct 'Tên đăng nhập' and 'Mật khẩu'
            When  Enter "text" in "Tên đăng nhập" with "hovannhat@gmail.com"
            And  Enter "text" in "Mật khẩu" with "Nhat@01101999"
            And Click "Đăng nhập" button
            Then User look message "Thành công" popup
            And User look title "Danh sách nghỉ phép"
            And User look dashboard "Admin"
            And User look menu "Nghỉ phép" option
            And User look menu "Thiết lập" option

    Rule: Verify navigate to "Quên mật khẩu" page
        Scenario: SI-12 Verify that CAN navigate to the 'Quên mật khẩu' page from the link on the Đăng nhập page
            When Click "Quên mật khẩu?" link
            Then User look title "Quên mật khẩu?" with form Forgot Password

        Scenario Outline: SI-13: Verify that validation text of 'Email' field display when Quên mật khẩu with 'Email' field invalid email format and less than 6 characters.
            When Click "Quên mật khẩu?" link
            And Enter "text" in "Email" with "<email>"
            And Click "Gửi" button
            Then Required message "Email" displayed under "<message>" field
            Examples:
                | email      | message                                                                     |
                |            | Xin vui lòng nhập email                                                     |
                | abcd       | Xin vui lòng nhập địa chỉ email hợp lệ!Xin vui lòng nhập tối thiểu 6 ký tự! |
                | email_text | Xin vui lòng nhập địa chỉ email hợp lệ!                                     |

        Scenario: SI-16 Verify that the forgot password can be cancel using the "Cancel" button
            When Click "Quên mật khẩu?" link
            And Click "Huỷ bỏ" button
            Then User look title "Đăng nhập"

    Rule: Verify displays the Password
        Scenario: SI-17 Verify that the password can be displayed in text format when clicking on the 'Eye' icon.
            When Enter "text" in "Tên đăng nhập" with "hovannhat@gmail.com"
            And Enter "text" in "Mật khẩu" with "Nhat@01101999"
            And Click Eye icon with "Mật khẩu" and eq "0"
            Then User look password as text in "Mật khẩu"

    Rule: Verify refresh page
        Scenario: SI-18 Verify entered data not showing when Refresh button is clicked
            When Enter "text" in "Tên đăng nhập" with "hovannhat@gmail.com"
            And Enter "text" in "Mật khẩu" with "Nhat@01101999"
            And Reload page
            Then User look empty in "Tên đăng nhập"
            And User look empty in "Mật khẩu"