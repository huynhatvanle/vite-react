*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
DA-01 Verify that Add New successfully with enter the data
    [Tags]    @smoketest    @regression
    # When Background Happy paths
    # When Click on the "Xóa" button in the "Email" table line
    Then SPL_09


*** Keywords ***
Go to page create data user
    When Login to admin
    # When Login to admin
    When Click "Quản lý người dùng" menuBalence
    When Click "Thêm quản trị viên" button
    # When Click "Tạo mới" sub menu to "/vn/user/add"

Background Happy paths
    When Go to page create data user
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

# SPL_06
#    When Go to page create data user
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Sleep    2
#    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
#    When Click "Trở về" button

# SPL_07
#    When Go to page create data user
#    When Enter "text" in "Họ và tên" with "0000!@#$"
#    When Enter "email" in "Email" with ""
#    Sleep    2
#    Then Required message "Họ và tên" displayed under "Xin vui lòng chỉ nhập chữ!" field
#    When Click "Trở về" button

# SPL_08
#    When Go to page create data user
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Sleep    2
#    Then Required message "Email" displayed under "Xin vui lòng nhập email" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "nguyenvan"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "nguyenvan@"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "nguyenvan.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "nguyenvan@.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "nguyenvan@@#$.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "@gmail.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

SPL_09
    When Go to page create data user
    When Enter "email" in "Email" with "@#$@outlook.com"
    When Enter "phone" in "Số điện thoại" with ""
    Sleep    2
    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
    When Click "Trở về" button
