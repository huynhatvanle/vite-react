*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
# DN-01 Verify that Admin CAN login successfuly with valid Email and Password
#    [Tags]    @smoketest    @regression
#    When Login to admin
#    When Login to admin

DN-02 Verify that validation text of Email appears when login with empty Email
    [Tags]    @smoketest    @regression
    When Enter "text" in "Mật khẩu" with "Ari123456#"
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Đây là trường bắt buộc!" field

DN-03 Verify that validation text of Password appears when login with empty Password
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    When Click "Đăng nhập" button
    Then Required message "Mật khẩu" displayed under "Đây là trường bắt buộc!" field

DN-04 Verify that validation text of Email and Password appears when login with empty Email and Password
    [Tags]    @smoketest    @regression
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Đây là trường bắt buộc!" field
    Then Required message "Mật khẩu" displayed under "Đây là trường bắt buộc!" field

DN-05 Verify that validation text of Email appears when entering invalid email format
    [Tags]    @smoketest    @regression
    When Enter "text" in "Tên đăng nhập" with "nguyenvan"
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field

DN-06 Verify that validation text of Mật khẩu appears when entering password less than 6-character
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "admin@gmail.com"
    When Click "Đăng nhập" button
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
