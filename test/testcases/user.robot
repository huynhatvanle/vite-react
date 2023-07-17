*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
DA-01 Verify that Add New successfully with enter the data
    [Tags]    @smoketest    @regression
    # When Background Happy paths
    # When Click on the "Xóa" button in the "Email" table line
    Then SPL_16


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

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "@#$@outlook.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Enter "email" in "Email" with "!@#$"
#    When Enter "phone" in "Số điện thoại" with ""
#    Sleep    2
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_10
#    When Go to page create data user
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Click "Lưu" button
#    Sleep    2
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
#    When Click "Trở về" button

# SPL_11
#    When Go to page create data user
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "03450127@#"
#    When Click "Lưu" button
#    Sleep    2
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field
#    When Click "Trở về" button

# SPL_12
#    When Go to page create data user
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "0374208"
#    When Click "Lưu" button
#    Sleep    2
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field
#    When Click "Trở về" button

# SPL_13
#    When Go to page create data user
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "0084456456788"
#    When Click "Lưu" button
#    Sleep    2
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa 12 ký tự số!" field
#    When Click "Trở về" button

# SPL_14
#    When Go to page create data user
#    When Enter "text" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
#    When Click "Lưu" button
#    Sleep    2
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field
#    When Click "Trở về" button
#    Chưa bắt điều kiện cho code

# SPL_15
#    When Go to page create data user
#    When Enter "text" in "Họ và tên" with "Nguyen Van H"
#    When Enter "email" in "Email" with "nguyenvann@outlook.com"
#    When Enter "phone" in "Số điện thoại" with "035666336"
#    When Click "Lưu" button
#    Sleep    2
#    Then User look message "Số điện thoại đã được đăng ký trước đó." popup
#    When Click "Trở về" button

SPL_16
    When Go to page create data user
    When Enter "text" in "Họ và tên" with "Nguyen Van I"
    When Enter "email" in "Email" with "nguyenvanm@gmail.com"
    When Enter "phone" in "Số điện thoại" with "0354208788"
    When Click "Lưu" button
    Sleep    2
    Then User look message "Email đã được đăng ký trước đó." popup
    When Click "Trở về" button
