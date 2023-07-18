Feature: LOGIN FEATURE

    Background:
        When Login to admin

    Rule: Navigate to Create user page
        Scenario: SI-01: Verify that it is possible to navigate to the page for creating a new user using the "Tạo mới" button in the "Người Dùng" menu.
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            Then User look title "Tạo mới người dùng"

        Scenario: SI-02: Verify that it is possible to navigate to the page for creating a new user using the "Tạo mới" button in the "Danh sách" menu.
            When Click "Người Dùng" menu
            And Click "Danh sách" sub menu to "/vn/user/list"
            And Click "Tạo mới" button
            Then User look title "Tạo mới người dùng"

    Rule: Verify validation text
        Scenario Outline: SI-03, 04: Verify that validation text when create new user with all fields empty & "Lưu lại" button
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Click "<button>" button
            Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
            And Required message "Email" displayed under "Xin vui lòng nhập email" field
            And Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
            And Required message "Nhập lại mật khẩu" displayed under "Xin vui lòng nhập nhập lại mật khẩu" field
            And Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
            And Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field
            And Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field
            And Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field
            And Required message "Vai trò" displayed under "Xin vui lòng chọn vai trò" field
            Examples:
                | button         |
                | Lưu lại        |
                | Lưu và tạo mới |

        Scenario: SI-05: Verify that validation text of "Họ và tên" field display when create new user with "Họ và tên" field empty
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Họ và tên" with ""
            And Enter "text" in "Email" with "hovannhat@gmail.com"
            Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field

        Scenario Outline: SI-06, 07, 08: Verify that validation text of "Email" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "email" in "Email" with "<data>"
            And Enter "text" in "Mật khẩu" with "hovannhat@gmail.com"
            Then Required message "Email" displayed under "<message>" field
            Examples:
                | data           | message                                                                     |
                |                | Xin vui lòng nhập email                                                     |
                | text           | Xin vui lòng nhập địa chỉ email hợp lệ!Xin vui lòng nhập tối thiểu 6 ký tự! |
                | text@.com.mail | Xin vui lòng nhập địa chỉ email hợp lệ!                                     |

        Scenario Outline: SI-09, 10, 11: Verify that validation text of "Mật khẩu" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Mật khẩu" with "<data>"
            And Enter "text" in "Nhập lại mật khẩu" with ""
            Then Required message "Mật khẩu" displayed under "<message>" field
            Examples:
                | data      | message                                                                                               |
                |           | Xin vui lòng nhập mật khẩu                                                                            |
                | 12345     | Xin vui lòng nhập tối thiểu 6 ký tự!Xin vui lòng nhập tối thiểu 6 ký tự số!                           |
                | text_user | Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt |

        Scenario Outline: SI-12, 13, 14, 15: Verify that validation text of "Nhập lại mật khẩu" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Nhập lại mật khẩu" with "<data>"
            And Enter "phone" in "Số điện thoại" with ""
            Then Required message "Nhập lại mật khẩu" displayed under "<message>" field
            Examples:
                | data         | message                                                                                                                                     |
                |              | Xin vui lòng nhập nhập lại mật khẩu                                                                                                         |
                | 12345        | Hai mật khẩu bạn nhập không nhất quán!Xin vui lòng nhập tối thiểu 8 ký tự số!                                                               |
                | text_user    | Hai mật khẩu bạn nhập không nhất quán!Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt |
                | Nhat@0110199 | Hai mật khẩu bạn nhập không nhất quán!                                                                                                      |

        Scenario Outline: SI-16, 17, 18, 19: Verify that validation text of "Số điện thoại" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Số điện thoại" with "<data>"
            And Enter date in "Ngày sinh" with ""
            Then Required message "Số điện thoại" displayed under "<message>" field
            Examples:
                | data           | message                                       |
                |                | Xin vui lòng nhập số điện thoại               |
                | abcde          | Xin vui lòng chỉ nhập số                      |
                | 12345          | Xin vui lòng nhập tối thiểu 8 ký tự số!       |
                | 01234567891011 | Xin vui lòng nhập tối đa phải có 12 ký tự số! |

        Scenario: SI-20: Verify that validation text of "Ngày sinh" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter date in "Ngày sinh" with ""
            And Click select "Vị trí" with "Tester"
            Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field

        Scenario: SI-21: Verify that validation text of "Vị trí" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Click select "Vị trí" with "Tester"
            And Clear "Vị trí"
            Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field

        Scenario: SI-22: Verify that validation text of "Ngày đầu đi làm" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter date in "Ngày đầu đi làm" with ""
            And Click select "Vai trò" with " "
            Then Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field

        Scenario: SI-23: Verify that validation text of "Vai trò" field
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Click select "Vai trò" with "Staff"
            And Clear "Vai trò"
            Then Required message "Vai trò" displayed under "Xin vui lòng chọn vai trò" field

    Rule: Verify error message
        Scenario Outline: SI-24, 25: Verify that error message display when create new user  with Email is already taken
            When Click "Người Dùng" menu
            When Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Họ và tên" with "<username>"
            And Enter "email" in "Email" with "<email>"
            And Enter "text" in "Mật khẩu" with "<password>"
            And Enter "text" in "Nhập lại mật khẩu" with "<retype_password>"
            And Enter "phone" in "Số điện thoại" with "<Phone>"
            And Enter date in "Ngày sinh" with "<date_of_birth>"
            And Click select "Vị trí" with "<position>"
            And Enter date in "Ngày đầu đi làm" with "<start_date>"
            And Click select "Vai trò" with "<Role>"
            And Enter "words" in textarea "Mô tả" with "_RANDOM_"
            And Select file in "Tải ảnh lên" with "image.jpg"
            And Click "<button>" button
            Then User look message "Email đã được sử dụng" popup
            Examples:
                | username    | email           | password      | retype_password | Phone      | date_of_birth | position | start_date | Role  | button         |
                | Hồ Văn Nhật | staff@gmail.com | Nhat@01101999 | Nhat@01101999   | 0941225407 | 02-09-1999    | Tester   | 05-06-2023 | Staff | Lưu lại        |
                | Hồ Văn Nhật | staff@gmail.com | Nhat@01101999 | Nhat@01101999   | 0941225407 | 02-09-1999    | Tester   | 05-06-2023 | Staff | Lưu và tạo mới |

    Rule: Verify Create Successfuly
        Scenario Outline: SI-26, 27: Verify that error message display when create new user  with Email is already taken
            When Click "Người Dùng" menu
            When Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Họ và tên" with "<username>"
            And Enter "email" in "Email" with "<email>"
            And Enter "text" in "Mật khẩu" with "<password>"
            And Enter "text" in "Nhập lại mật khẩu" with "<retype_password>"
            And Enter "phone" in "Số điện thoại" with "<Phone>"
            And Enter date in "Ngày sinh" with "<date_of_birth>"
            And Click select "Vị trí" with "<position>"
            And Enter date in "Ngày đầu đi làm" with "<start_date>"
            And Click select "Vai trò" with "<Role>"
            And Enter "words" in textarea "Mô tả" with "_RANDOM_"
            And Select file in "Tải ảnh lên" with "image.jpg"
            And Click "<button>" button
            Then User look message "Tạo thành công" popup
            And Click "Huỷ bỏ" button
            And Click on the "Xóa" button in the "Email" table line
            Examples:
                | username       | email                  | password      | retype_password | Phone      | date_of_birth | position | start_date | Role  | button         |
                | Trương Văn Gắn | truongvangan@gmail.com | Nhat@01101999 | Nhat@01101999   | 0941225407 | 02-09-1999    | Tester   | 05-06-2023 | Staff | Lưu lại        |
                | Hoàng Minh Tuệ | hoangminhtue@gmail.com | Nhat@01101999 | Nhat@01101999   | 0941225407 | 02-09-1999    | Tester   | 05-06-2023 | Staff | Lưu và tạo mới |

    Rule: Verify displays the Password
        Scenario: SI-28: Verify that Password and Retype_Password can be displayed in text format.
            When Click "Người Dùng" menu
            And Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Mật khẩu" with "Nhat@01101999"
            And Click Eye icon with "Mật khẩu" and eq "0"
            Then User look password as text in "Mật khẩu"
            And Enter "text" in "Nhập lại mật khẩu" with "Nhat@01101999"
            And Click Eye icon with "Nhập lại mật khẩu" and eq "1"
            Then User look password as text in "Nhập lại mật khẩu"

    Rule: Verify refresh page
        Scenario: SI-29: Verify entered data not showing when Refresh with F5 key
            When Click "Người Dùng" menu
            When Click "Tạo mới" sub menu to "/vn/user/add"
            And Enter "text" in "Họ và tên" with "<username>"
            And Enter "email" in "Email" with "<email>"
            And Enter "text" in "Mật khẩu" with "<password>"
            And Enter "text" in "Nhập lại mật khẩu" with "<retype_password>"
            And Enter "phone" in "Số điện thoại" with "<Phone>"
            And Enter date in "Ngày sinh" with "<date_of_birth>"
            And Click select "Vị trí" with "<position>"
            And Enter date in "Ngày đầu đi làm" with "<start_date>"
            And Click select "Vai trò" with "<Role>"
            And Reload page
            Then User look empty in "Họ và tên"
            And User look empty in "Email"
            And User look empty in "Mật khẩu"
            And User look empty in "Nhập lại mật khẩu"
            And User look empty in "Số điện thoại"
            And User look empty in "Ngày sinh"
            And User look empty in "Vị trí"
            And User look empty in "Ngày đầu đi làm"
            And User look empty in "Vai trò"
            Examples:
                | username       | email                  | password      | retype_password | Phone      | date_of_birth | position | start_date | Role  |
                | Trương Văn Gắn | truongvangan@gmail.com | Nhat@01101999 | Nhat@01101999   | 0941225407 | 02-09-1999    | Tester   | 05-06-2023 | Staff |


