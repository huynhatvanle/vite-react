*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
DA-01 Verify that Add New successfully with enter the data
    [Tags]    @smoketest    @regression
    Then SPL_30 Verify that admin CAN not change the role of sub admin


*** Keywords ***
Go to page create data user
    When Login to admin
    When Click "Quản lý người dùng" menuUser

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

# SPL_06 Verify that validation text of Họ và tên appears when leaving the Họ và tên field blanks
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
#    When Click "Trở về" button

# SPL_07 Verify that validation text of Họ và tên appears when entering number or special character
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "0000!@#$"
#    When Enter "email" in "Email" with ""
#    Then Required message "Họ và tên" displayed under "Xin vui lòng chỉ nhập chữ!" field
#    When Click "Trở về" button

# SPL_08 Verify that validation text of Email appears when leaving the Email field blanks
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Email" displayed under "Xin vui lòng nhập email" field
#    When Click "Trở về" button

# SPL_09.1 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09.2 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan@"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09.3 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09.4 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan@.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09.5 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "nguyenvan@@#$.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09.6 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "@gmail.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09.7 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "@#$@outlook.com"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_09.8 Verify that validation text of Email appears when entering the invalid email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "email" in "Email" with "!@#$"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Email" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Click "Trở về" button

# SPL_10 Verify that validation text of Số điện thoại appears when leaving the Số điện thoại field blanks
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
#    When Click "Trở về" button

# SPL_11 Verify that validation text of Số điện thoại appears when entering non-numeric character
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "03450127@#"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field
#    When Click "Trở về" button

# SPL_12 Verify that validation text of Số điện thoại appears when entering less than 8 numbers
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "0374208"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field
#    When Click "Trở về" button

# SPL_13 Verify that validation text of Số điện thoại appears when entering greater than 12 numbers
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "0084456456788"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa 12 ký tự số!" field
#    When Click "Trở về" button

# SPL_14 Verify that validation text of Ghi chú appears when entering greater than 500 characters
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
#    When Click "Lưu" button
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field
#    When Click "Trở về" button

# SPL_15 The admin CAN not create an account with the already registered email
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "Nguyen Van H"
#    When Enter "email" in "Email" with "nguyenvann@outlook.com"
#    When Enter "phone" in "Số điện thoại" with "035666336"
#    When Click "Lưu" button
#    Then User look message "Số điện thoại đã được đăng ký trước đó." popup
#    When Click "Trở về" button

# SPL_16 The admin CAN not create an account with the already registered phone number
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "Nguyen Van I"
#    When Enter "email" in "Email" with "nguyenvanm@gmail.com"
#    When Enter "phone" in "Số điện thoại" with "0354208788"
#    When Click "Lưu" button
#    Then User look message "Email đã được đăng ký trước đó." popup
#    When Click "Trở về" button

# SPL_17 Verify CAN navigate to the "Người dùng" page when clicking on "Trở về" button
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Click "Trở về" button
#    When Check title "Quản lý người dùng" page

# SPL_18 Verify that the account will not be created when the admin click on "Trở về" button
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Enter "email" in "Email" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Trở về" button
#    When Check title "Quản lý người dùng" page

# SPL_19 Verify that Admin CAN add an admin account with valid input
#    When Go to page create data user
#    When Click "Thêm quản trị viên" button
#    When Enter "text" in "Họ và tên" with "Nguyen Van Admin"
#    When Enter "email" in "Email" with "nguyenadmin@getnadat.com"
#    When Enter "phone" in "Số điện thoại" with "84365058489"
#    When Click "Lưu" button
#    Then User look message "Tạo người dùng mới thành công." popup

# SPL_20 Verify that validation text of Họ và tên appears when leaving the Họ và tên field blanks
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "text" in "Họ và tên" with ""
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field

# SPL_21 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "text" in "Họ và tên" with "123456"
#    When Enter "phone" in "Số điện thoại" with ""
#    Then Required message "Họ và tên" displayed under "Xin vui lòng chỉ nhập chữ!" field

# SPL_22 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "text" in "Số điện thoại" with ""
#    When Enter "text" in "Họ và tên" with ""
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field

# SPL_23 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "phone" in "Số điện thoại" with "khanhpro1"
#    When Enter "text" in "Họ và tên" with ""
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field

# SPL_24 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "words" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
#    When Enter "text" in "Họ và tên" with ""
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 kí tự" field

# SPL_25 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Click "Trở về" button

# SPL_26 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "text" in "Họ và tên" with "2khanh"
#    When Click "Trở về" button

# SPL_27 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "text" in "Họ và tên" with "khanh"
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

# SPL_28 Verify that validation text of Họ và tên appears when entering number or special character
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

# SPL_29 Verify that admin CAN not change the role from store owner to supplier
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When DoubleClick edit
#    When Click select role "Vai trò" with "Chủ cửa hàng"

SPL_30 Verify that admin CAN not change the role of sub admin
    [Tags]    @smoketest    @regression
    When Go to page create data user
    When DoubleClick edit
    When Check role disable
    When Click "Lưu" button

# SPL_31 Verify that validation text of Họ và tên appears when leaving Họ và tên field blanks
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    Wait Until Element Spin
#    When Enter "text" in "Họ và tên" with ""
#    When Click "Lưu" button
#    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field

# SPL_32 Verify that validation text of Họ và tên appears when entering numbers and special character
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "text" in "Họ và tên" with "Nguyen 12!@"
#    When Click "Lưu" button
#    Then Required message "Họ và tên" displayed under "Xin vui lòng chỉ nhập chữ" field

# SPL_33 Verify that validation text of Số điện thoại appears when leaving Số điện thoại field blanks
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field

# SPL_34 Verify that validation text of Số điện thoại appears when entering non-numeric data
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "03865698q!"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field

# SPL_35 Verify that validation text of Số điện thoại appears when entering smaller than 8 numbers
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "8435846"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field

# SPL_36 Verify that validation text of Số điện thoại appears when entering greater than 12 numbers
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "0084356711230"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa 12 ký tự số!" field

# SPL_38 Verify that validation text of Ghi chú appears when entering greater than 500 characters
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "text" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
#    When Click "Lưu" button
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field

# SPL_39 Verify that sub admin CAN CANCEL profile edit process successfully
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

# SPL_40 Verify that sub admin changed information will not be saved when CANCELLING editing
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

# SPL_41 Verify that sub admin CAN edit Họ và tên with valid input
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "text" in "Họ và tên" with ""
#    When Enter "text" in "Họ và tên" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

# SPL_42 Verify that sub admin CAN edit Số điện thoại with valid input
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "phone" in "Số điện thoại" with ""
#    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

# SPL_43 Verify that sub admin CAN edit Ghi chú
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Enter "text" in textarea "Ghi chú" with ""
#    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

# SPL_44 Verify that sub admin CAN edit profile image
#    When Go to page create data user
#    Wait Until Element Spin
#    When Click "Avata" myprofile "Thông tin cá nhân"
#    When Click profile "Align"
#    Wait Until Element Spin
#    When Click "Lưu" button
#    Then User look message "Chỉnh sửa tài khoản thành công" popup

# SPL_45 Verify that Add New successfully with enter the data3
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When Enter "Tìm kiếm" placeholder with "???"

# SPL_46 Verify that Add New successfully with enter the data
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When Enter "Tìm kiếm" placeholder with "USR1344"

# SPL_47 Verify that Add New successfully with enter the data
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    # When Enter "Tìm kiếm" placeholder with "Diệu"
#    When Enter "Tìm kiếm" placeholder with "Nguyen Van M"

# SPL_48 Verify that Add New successfully with enter the data
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    # When Enter "Tìm kiếm" placeholder with "Diệu"
#    When Enter "Tìm kiếm" placeholder with "nguyenvanm@gmail.com"

# SPL_49 Verify that Add New successfully with enter the data
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    # When Enter "Tìm kiếm" placeholder with "Diệu"
#    When Enter "Tìm kiếm" placeholder with "413561088962"

# SPL_50 Verify that the admin CAN view user listing information when selecting value on the pagination dropdown
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When Click pagination "20" user

# SPL_51 Verify the admin CAN view order listing information when select 'navigate pagination'
#    [Tags]    @smoketest    @regression
#    When Go to page create data user
#    When Click pagination "next" next page
#    When Click pagination "10" user
#    Wait Until Element Spin
#    When Click pagination "prev" next page
#    When Click pagination "10" user
#    Wait Until Element Spin
