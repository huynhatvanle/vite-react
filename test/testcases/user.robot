*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
# DN-01 Verify that the validation text of "Họ và tên" field displays when creating a user with "Họ và tên" field empty & "Lưu lại" button
#    [Tags]    @smoketest    @regression
#    Then CRU-User-05

# DN-02 Verify that the validation text of "Họ và tên" field displays when creating a user with "Họ và tên" field empty & "Lưu và tạo mới" button
#    [Tags]    @smoketest    @regression
#    Then CRU-User-06

# DN-03 Verify that the validation text of "Email" field displays when creating a user with "Email" field empty & "Lưu lại" button
#    [Tags]    @smoketest    @regression
#    Then CRU-User-07

# DN-04 Verify that the validation text of "Email" field displays when creating a user with "Email" field empty & "Lưu và tạo mới" button
#    [Tags]    @smoketest    @regression
#    Then CRU-User-08

# DN-01 Verify that creating accounts when add image
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Select file in "Tải ảnh lên" with "image.jpg"

# DN-02 Verify that creating accounts when add image1
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "hoangdieu181021@gmail.com"
#    When Enter "text" in "Mật khẩu" with "Password1!"
#    When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Supper Admin"
#    When Click "Lưu lại" button
#    Then User look message "Email đã được sử dụng" popup

# DN-30-1 Verify that creating a staff with the correct fields with "Lưu lại" button
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "Na115689."
#    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Staff"
#    When Click "Lưu lại" button
#    Then User look message "Tạo thành công" popup

# DN-30-2 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "Na115689."
#    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Staff"
#    When Click "Lưu và tạo mới" button
#    Then User look message "Tạo thành công" popup

# DN-31-1 Verify that creating a manager with the correct fields with "Lưu lại" button
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "Na115689."
#    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Manager"
#    When Click "Lưu lại" button
#    Then User look message "Tạo thành công" popup

# DN-31-2 Verify that creating a manager with the correct fields with "Lưu và tạo mới" button
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "Na115689."
#    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Manager"
#    When Click "Lưu và tạo mới" button
#    Then User look message "Tạo thành công" popup

# DN-31-1 Verify that creating a staff with the correct fields with "Lưu lại" button
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "Na115689."
#    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Manager"
#    When Click "Lưu lại" button
#    Then User look message "Tạo thành công" popup

# DN-32-1 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "Na115689."
#    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Supper Admin"
#    When Click "Lưu lại" button
#    Then User look message "Tạo thành công" popup

# DN-32-2 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Tạo mới" sub menu to "/vn/user/add"
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "Na115689."
#    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    When Click select "Vị trí" with "Tester"
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    When Click select "Vai trò" with "Supper Admin"
#    When Click "Lưu và tạo mới" button
#    Then User look message "Tạo thành công" popup

# DN-33 Verify that account edit successfully when change name
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    Edit User 2

# DN-34 Verify that account edit successfully when change Email
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Enter "email" in "Email" with "_RANDOM_"
#    Edit User 2

# DN-35 Verify that account edit successfully when change phone number
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    Edit User 2

# DN-36 Verify that account edit successfully when change date of birth
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Enter date in "Ngày sinh" with "_RANDOM_"
#    Edit User 2
# DN-37 Verify that account edit successfully when change location
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Click select "Vị trí" with "Developer"
#    Edit User 2

# DN-38 Verify that account edit successfully when change start date of work
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#    Edit User 2

# DN-39 Verify that account edit successfully when change the role
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Click select "Vai trò" with "Staff"
#    Edit User 2

# DN-40 Verify that account edit successfully when change the vacation
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    Edit User 2

# DN-44 Verify that account edit successfully when change name
#    [Tags]    @smoketest    @regression
#    Edit User 1
#    When Enter "text" in "Email" with "hoangdieu181021@gmail.com"
#    Edit User 2
# DN-46 Verify that delete successfully staff account
#    [Tags]    @smoketest    @regression
#    Delete User Staff

# DN-47 Verify that delete successfully manager account
#    [Tags]    @smoketest    @regression
#    Delete User Manager

# DN-48 Verify that delete successfully supper admin account
#    [Tags]    @smoketest    @regression
#    Delete User Supper Admin

# DN-50 Verify that error message can not delete account with no leave request approved yet
#    [Tags]    @smoketest    @regression
#    Delete User false

# DN-54 Verify that user can search an existing team when entering correct keyword to search box
#     [Tags]    @smoketest    @regression
#     View list of user
        
DN-21 Verify that enter the correct keyword into the role field
    [Tags]    @smoketest    @regression
    When Login to admin
    When Click "Người Dùng" menu
    When Click "Tạo mới" button
    When Click select "Vai trò" with "Manager"



*** Keywords ***
Go to page create data
    When Login to admin
    When Click "Người Dùng" menu
    When Click "Tạo mới" sub menu to "/vn/user/add"

Background Happy paths
    When Go to page create data
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
    Then User look message "Tạo thành công" popup
    When Click "Huỷ bỏ" button

Wait 3 seconds
    Sleep    3s

# Edit User 1
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Danh sách " sub menu to "/vn/user/list"
#    When Click "Sửa" button by "Hoàng Diệuu"
#    Wait 3 seconds
# Edit User 2
#    When Enter "text" in "Ngày nghỉ" with "5"
#    When Click "Lưu lại" button
#    Then User look message "Tạo thành công" popup
#    When Click "Danh sách " sub menu to "/vn/user/list"

# Delete User Staff
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Danh sách " sub menu to "/vn/user/list"
#    When Click "Xóa" button by "nhan165"
#    Then User look message "Xóa thành công" popup

# Delete User Manager
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Danh sách " sub menu to "/vn/user/list"
#    When Click "Xóa" button by "Khanh4544"
#    Then User look message "Xóa thành công" popup

# Delete User Supper Admin
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Danh sách " sub menu to "/vn/user/list"
#    When Click "Xóa" button by "Thannhh55"
#    Then User look message "Xóa thành công" popup

# # Delete User
# #    When Login to admin
# #    When Click "Người Dùng" menu
# #    When Click "Danh sách " sub menu to "/vn/user/list"
# #    When Click "Xóa" button by "Dung4"
# #    When Click "Hủy bỏ" button
# #    # Then User look message "Xóa thành công" popup

# Delete User false
#    When Login to admin
#    When Click "Người Dùng" menu
#    When Click "Danh sách " sub menu to "/vn/user/list"
#    When Click "Xóa" button by "lê văn vũ quốc"
#    Then User look message "Còn những yêu cầu nghỉ cần duyệt" popup

View list of user
    When Login to admin
    When Click "Người Dùng" menu
    When Click "Danh sách " sub menu to "/vn/user/list"
    When Enter "text" in input "Tìm kiếm" with "Diệu"
