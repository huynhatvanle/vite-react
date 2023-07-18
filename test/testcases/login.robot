*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
# ---------------------VERIFY VALIDATION TEXT-------------------------------------------------------
DN-01 Validation text with "Tên đăng nhập" field
    [Tags]    @smoketest    @regression
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field

DN-02 Validation text with "Mật khẩu" field
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

DN-03 Validation text with "Tên đăng nhập" field and "Mật khẩu" field
    [Tags]    @smoketest    @regression
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field
    And Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

DN-04 SI-04: Validation text with "Tên đăng nhập" field when enter invalid email format
    [Tags]    @smoketest    @regression
    When Enter "text" in "Tên đăng nhập" with "_RANDOM_"
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field

# ---------------------ERROR MESAGE------------------------------------------------------------
DN-05 Verify that Đăng nhập unsuccessfully because enter incorrect Email
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "Password1!"
    And Click "Đăng nhập" button
    Then User look message "Người dùng _@Tên đăng nhập@_ không tồn tại!" popup

DN-06 Verify that Đăng nhập unsuccessfully because enter incorrect password
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "admin@admin.com"
    And Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then User look message "Thông tin đăng nhập không hợp lệ cho người dùng _@Tên đăng nhập@_" popup

DN-07 Verify that Đăng nhập unsuccessfully because enter incorrect username and password
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then User look message "Người dùng _@Tên đăng nhập@_ không tồn tại!" popup

DN-08 Verify that Đăng nhập unsuccessfully because enter password less than 6 characters
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "Nhat"
    And Click "Đăng nhập" button
    Then User look message "password must be longer than or equal to 6 characters" popup

# ----------------------------------LOGIN SUCCESSFULLY-------------------------------------------------------------
DN-09 Verify that Đăng nhập successfully accout Admin with valid Email and Mật khẩu
    [Tags]    @smoketest    @regression
    When Login to admin
    Then User look title "Danh sách nghỉ phép"
    And User look menu "Người Dùng"
    And User look menu "Nghỉ phép"
    And User look menu "Thiết lập"

DN-10 Verify that Đăng nhập successfully account Manager with valid Email and Mật khẩu
    [Tags]    @smoketest    @regression
    When Login to Manager
    Then User look title "Danh sách nghỉ phép"
    And User look menu "Người Dùng"
    And User look menu "Nghỉ phép"
    And User look menu "Thiết lập"

DN-11 Verify that Đăng nhập successfully account Staff with valid Email and Mật khẩu
    [Tags]    @smoketest    @regression
    When Login to Staff
    Then User look title "Danh sách nghỉ phép"
    And User look menu "Nghỉ phép"
    And User look menu "Thiết lập"

# ----------------------------------NAVIGATE FORGOT PASSWORD-------------------------------------------------------------
DN-12 Verify that CAN navigate to the "Forgot Password" page from the link on the Log In page
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    Then User look title form Forgot Password "Quên mật khẩu?"

DN-13 Verify that validation text of "Email" field display when "Email" field empty
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Click "Gửi" button
    Then Required message "Email" displayed under "Xin vui lòng nhập email" field

DN-14 Verify that validation text of "Email" field display when "Email" field invalid email format and less than 6 characters
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Enter "text" in "Email" with "abcd"
    And Click "Gửi" button
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"
    And Required message "Email" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"

DN-15 Verify that validation text of "Email" field display when "Email" field invalid email format and greater than 6 characters
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Enter "text" in "Email" with "_RANDOM_"
    And Click "Gửi" button
    Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field

DN-16 Verify that the forgot password can be cancel using the "Huỷ bỏ" button
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Click "Huỷ bỏ" button
    Then "Quên mật khẩu?" form disappears

# ----------------------------------DISPLAY PASSWORD-------------------------------------------------------------
DN-17: Verify displays the password
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Eye" icon to display password
    Then User look "Mật khẩu" field with type "text"

# # ----------------------------------RELOAD PAGE-------------------------------------------------------------
DN-18: Verify refresh page
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Reload Page
    Then User look "Tên đăng nhập" field empty
    And User look "Mật khẩu" field empty