*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
DA-01 Verify that Add New successfully with enter the data
    [Tags]    @smoketest    @regression
    Then SPL_43


*** Keywords ***
Go to page create data user
    When Login to admin
    When Click "Quản lý người dùng" menuBalence

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
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
#    When Click "Trở về" button

# SPL_07
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "0000!@#$"
#    When Enter "email" in "Email" with ""
#    Then Required message "Họ và tên" displayed under "Xin vui lòng chỉ nhập chữ!" field
#    When Click "Trở về" button

# SPL_08
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Email" displayed under "Xin vui lòng nhập email" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan@"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan@.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan@@#$.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "@gmail.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "@#$@outlook.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "!@#$"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_10
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
#    When Click "Trở về" button

# SPL_11
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "03450127@#"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field
#    When Click "Trở về" button

# SPL_12
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "0374208"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field
#    When Click "Trở về" button

# SPL_13
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "0084456456788"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa 12 ký tự số!" field
#    When Click "Trở về" button

# SPL_14
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
#    When Click "Lưu" button
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field
#    When Click "Trở về" button

# SPL_15
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "Nguyen Van H"
#    When Enter "email" in "Email" with "nguyenvann@outlook.com"
#    When Enter "phone" in "Số điện thoại" with "035666336"
#    When Click "Lưu" button
#    Then User look message "Số điện thoại đã được đăng ký trước đó." popup
#    When Click "Trở về" button

# SPL_16
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "Nguyen Van I"
#    When Enter "email" in "Email" with "nguyenvanm@gmail.com"
#    When Enter "phone" in "Số điện thoại" with "0354208788"
#    When Click "Lưu" button
#    Then User look message "Email đã được đăng ký trước đó." popup
#    When Click "Trở về" button

# SPL_17
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Click "Trở về" button
#    When Check title "Quản lý người dùng" page

# SPL_18
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Trở về" button
#    When Check title "Quản lý người dùng" page

# SPL_19
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "Nguyen Van Admin"
#    When Enter "email" in "Email" with "nguyenadmin@getnadat.com"
#    When Enter "phone" in "Số điện thoại" with "84365058489"
#    When Click "Lưu" button
#    Then User look message "Tạo người dùng mới thành công." popup

# SPL_31
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    Wait Until Element Spin
#    When Enter "text" in "Họ và tên" with ""
#    When Click "Lưu" button
#    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field

# SPL_32
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "text" in "Họ và tên" with "Nguyen 12!@"
#    When Click "Lưu" button
#    Then Required message "Họ và tên" displayed under "Xin vui lòng chỉ nhập chữ" field

# SPL_33
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field

# SPL_34
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "03865698q!"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field

# SPL_35
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "8435846"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field

# SPL_36
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "0084356711230"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa 12 ký tự số!" field

# SPL_38
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "text" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
#    When Click "Lưu" button
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field

# SPL_39
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    ${text}=    Set Variable    //input[contains(@id,"email")]
#    ${email}=    Get Text    ${text}
#    Log To Console    ${email}
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Click "Hủy thao tác" button
#    ${text1}=    Set Variable    //input[contains(@id,"email")]
#    ${email1}=    Get Text    ${text1}
#    Should Be Equal    ${email}    ${email1}
#    Log To Console    ${text1}

# SPL_40
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    ${text}=    Set Variable    //input[contains(@id,"name")]
#    ${email}=    Get Text    ${text}
#    Log To Console    ${email}
#    ${text}=    Set Variable    //input[contains(@id,"email")]
#    ${email}=    Get Text    ${text}
#    Log To Console    ${email}
#    ${text}=    Set Variable    //input[contains(@id,"phoneNumber")]
#    ${email}=    Get Text    ${text}
#    Log To Console    ${email}
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Hủy thao tác" button
#    ${text1}=    Set Variable    //input[contains(@id,"name")]
#    ${email1}=    Get Text    ${text1}
#    Log To Console    ${text1}
#    ${text1}=    Set Variable    //input[contains(@id,"email")]
#    ${email1}=    Get Text    ${text1}
#    Log To Console    ${text1}
#    ${text1}=    Set Variable    //input[contains(@id,"phoneNumber")]
#    ${email1}=    Get Text    ${text1}
#    Should Be Equal    ${email}    ${email1}
#    Log To Console    ${text1}

# SPL_41
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "text" in "Họ và tên" with ""
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

# SPL_42
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

SPL_43
    When Go to page create data user
    Wait Until Element Spin
    When Click "Avata" myprofile "Thông tin cá nhân"
    When Enter "text" in textarea "Ghi chú" with ""
    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
    When Click "Lưu" button
    Then User look message "Chỉnh sửa tài khoản thành công" popup
