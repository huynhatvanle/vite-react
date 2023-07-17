*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
DN-01 Verify that Admin CAN login successfuly with valid Email and Password
    [Tags]    @smoketest    @regression
    When Login to admin
    Sleep    50s

# DN-02 Verify that validation text of Email appears when login with empty Email
#    [Tags]    @smoketest    @regression
#    When Enter "text" in "Mật khẩu" with "Ari123456#"
#    When Click "Đăng nhập" button
#    Then Required message "Tên đăng nhập" displayed under "Đây là trường bắt buộc!" field

# DN-03 Verify that validation text of Password appears when login with empty Password
#    [Tags]    @smoketest    @regression
#    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#    When Click "Đăng nhập" button
#    Then Required message "Mật khẩu" displayed under "Đây là trường bắt buộc!" field

# DN-04 Verify that validation text of Email and Password appears when login with empty Email and Password
#    [Tags]    @smoketest    @regression
#    When Click "Đăng nhập" button
#    Then Required message "Tên đăng nhập" displayed under "Đây là trường bắt buộc!" field
#    Then Required message "Mật khẩu" displayed under "Đây là trường bắt buộc!" field

# DN-05 Verify that validation text of Email appears when entering invalid email format
#    [Tags]    @smoketest    @regression
#    When Enter "text" in "Tên đăng nhập" with "nguyenvan"
#    When Click element input "Mật khẩu"
#    Then Required message "Tên đăng nhập" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Enter "text" in "Tên đăng nhập" with "nguyenvan@"
#    When Click element input "Mật khẩu"
#    Then Required message "Tên đăng nhập" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field
#    When Enter "text" in "Tên đăng nhập" with "nguyenvan.com"
#    When Click element input "Mật khẩu"
#    Then Required message "Tên đăng nhập" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field

# DN-06 Verify that validation text of Mật khẩu appears when entering password less than 6-character
#    [Tags]    @smoketest    @regression
#    When Enter "text" in "Mật khẩu" with "abc"
#    When Click element input "Tên đăng nhập"
#    Then Check displayed under "Mật khẩu" field

# DN-07 User login unsuccessfuly with Email does not exist in the system
#    [Tags]    @smoketest    @regression
#    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#    When Enter "text" in "Mật khẩu" with "_RANDOM_"
#    When Click "Đăng nhập" button
#    Then User look message "Tài khoản chưa được tạo hoặc chưa được kích hoạt." popup

# DN-08 User login unsuccessfuly with invalid Password
#    [Tags]    @smoketest    @regression
#    When Enter "email" in "Tên đăng nhập" with "admin_balan@getnada.com"
#    When Enter "text" in "Mật khẩu" with "_RANDOM_"
#    When Click "Đăng nhập" button
#    Then User look message "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại" popup

# DN-09 Verify CAN navigate to "Quên Mật Khẩu" page from link on Sign in page
#    [Tags]    @smoketest    @regression
#    When Click "Quên mật khẩu" button
#    When Check Url "/vn/forgot-password" Page

# DN-10 Verify the password is displayed when clicking on the "Eye" icon in Mật khẩu field
#    [Tags]    @smoketest    @regression
#    When Click "Quên mật khẩu" button
#    When Check Url "/vn/forgot-password" Page
