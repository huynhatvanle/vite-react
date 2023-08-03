*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***

# ---------------------VERIFY VALIDATION TEXT-------------------------------------------------------
LG-01 Validation text with "Tên đăng nhập" field
    [Tags]    @smoketest    @regression
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field

LG-02 Validation text with "Mật khẩu" field
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

LG-03 Validation text with "Tên đăng nhập" field and "Mật khẩu" field
    [Tags]    @smoketest    @regression
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field
    And Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

LG-04 Validation text with "Tên đăng nhập" field when enter invalid email format
    [Tags]    @smoketest    @regression
    When Enter "text" in "Tên đăng nhập" with "_RANDOM_"
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field

# ---------------------ERROR MESSAGE------------------------------------------------------------
LG-05 Verify that Đăng nhập unsuccessfully because enter incorrect Email
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "Password1!"
    And Click "Đăng nhập" button
    Then User look message "Người dùng _@Tên đăng nhập@_ không tồn tại!" popup

LG-06 Verify that Đăng nhập unsuccessfully because enter incorrect password
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "admin@admin.com"
    And Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then User look message "Thông tin đăng nhập không hợp lệ cho người dùng _@Tên đăng nhập@_" popup

LG-07 Verify that Đăng nhập unsuccessfully because enter incorrect username and password
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Đăng nhập" button
    Then User look message "Người dùng _@Tên đăng nhập@_ không tồn tại!" popup

LG-08 Verify that Đăng nhập unsuccessfully because enter password less than 6 characters
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "Nhat"
    And Click "Đăng nhập" button
    Then User look message "password must be longer than or equal to 6 characters" popup

# # ----------------------------------LOGIN SUCCESSFULLY-------------------------------------------------------------
LG-09 Verify that Đăng nhập successfully accout Admin with valid Email and Mật khẩu
    [Tags]    @smoketest    @regression
    When Login to admin
    Then User look title "Danh sách nghỉ phép"
    And User look dashboard "Admin"
    And User look menu "Người Dùng"
    And User look menu "Nghỉ phép"
    And User look menu "Thiết lập"

LG-10 Verify that Đăng nhập successfully account Manager with valid Email and Mật khẩu
    [Tags]    @smoketest    @regression
    When Login to Manager
    Then User look title "Danh sách nghỉ phép"
    And User look dashboard "Admin"
    And User look menu "Người Dùng"
    And User look menu "Nghỉ phép"
    And User look menu "Thiết lập"

LG-11 Verify that Đăng nhập successfully account Staff with valid Email and Mật khẩu
    [Tags]    @smoketest    @regression
    When Login to Staff
    And User look dashboard "Admin"
    Then User look title "Danh sách nghỉ phép"
    And User look menu "Nghỉ phép"
    And User look menu "Thiết lập"

LG-12 Verify that successfully login when using the Enter key
    [Tags]    @smoketest    @regression
    Enter "email" in "Tên đăng nhập" with "staff@gmail.com"
    Enter "text" in "Mật khẩu" with "Tester@123"
    Enter at "Mật khẩu" field to Login
    Then User look title "Danh sách nghỉ phép"
    And User look menu "Nghỉ phép"
    And User look menu "Thiết lập"

# ----------------------------------NAVIGATE FORGOT PASSWORD-------------------------------------------------------------
LG-13 Verify that CAN navigate to the "Forgot Password" page from the link on the Log In page
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    Then User look title form Forgot Password "Quên mật khẩu?"

LG-14 Verify that validation text of "Email" field display when "Email" field empty
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Click "Gửi" button
    Then Required message "Email" displayed under "Xin vui lòng nhập email" field

LG-15 Verify that validation text of "Email" field display when "Email" field invalid email format and less than 6 characters
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Enter "text" in "Email" with "abcd"
    And Click "Gửi" button
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"
    And Required message "Email" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"

LG-16 Verify that validation text of "Email" field display when "Email" field invalid email format and greater than 6 characters
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Enter "text" in "Email" with "_RANDOM_"
    And Click "Gửi" button
    Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field

LG-17 Verify that the forgot password can be cancel using the "Huỷ bỏ" button
    [Tags]    @smoketest    @regression
    When Click "Quên mật khẩu?" link
    And Click "Huỷ bỏ" button
    Then "Quên mật khẩu?" form disappears

# ----------------------------------DISPLAY PASSWORD-------------------------------------------------------------
LG-18: Verify displays the password
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click "Eye" icon to display password
    Then User look "Mật khẩu" field with type "text"

# # ----------------------------------RELOAD PAGE-------------------------------------------------------------
# LG-19: Verify refresh page
#     [Tags]    @smoketest    @regression
#     When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#     And Enter "text" in "Mật khẩu" with "_RANDOM_"
#     And Reload Page
#     Then User look "Tên đăng nhập" field empty
#     And User look "Mật khẩu" field empty

*** Keywords ***
# #############--------------LOGIN----------------##################################
# Kiểm tra Menu khi đăng nhập thành công
User look menu "${text}"
  Element Text Should Be    xpath=//li[span[contains(text(), "${text}")]]    ${text}
 
# Click vào link "Quên mật khẩu?"
Click "${name}" link
  ${element}=    Set Variable    //button[contains(@class, 'text-blue-600')]    
  Click   ${element}

# Kiểm tra Tiêu đề khi nhấn vào link "Quên mật khẩu?"
User look title form Forgot Password "${title}"
  Element Text Should Be    xpath=//h3[contains(text(),'${title}')]      ${title}

# Form "Quên mật khẩu" biến mất
"${forgotpassword}" form disappears
    Wait Until Element Is Not Exist    //h3[contains(text(),'${forgotpassword}')]

# Click icon "Eye" để hiện thị mật khẩu
Click "Eye" icon to display password
    ${element}=    Set Variable    xpath=//*[contains(@class, 'absolute') and @id='Layer_1']
    Click    ${element}

# Kiểm tra mật khẩu có hiển thị hay không khi click icon "eye"
User look "${name}" field with type "${type}"
    ${element}=        Get Element Form Item By Name        ${name}        //input[contains(@class, "ant-input")]
    ${password_field_type}        Get Attribute        ${element}        type
    Should Be Equal As Strings        ${password_field_type}            ${type}

# Kiểm tra khi reload page
User look "${name}" field empty
    ${element}=    Get Element Form Item By Name     ${name}    //input[contains(@class, "ant-input")]
    Element Text Should Be    ${element}    ${EMPTY}

# Kiểm tra xem thông báo lỗi có hiển thị đúng vị trí mong đợi không (hiển thị 2 validation text).
Required message "${name}" field displayed under "${text}"
  ${element}=               Get Element Form Item By Name     ${name}                //*[contains(@class, "ant-picker-input")]/input
  Wait Until Element Is Visible        //div[contains(text(),'${text}')]
  Element Text Should Be    //div[contains(text(),'${text}')]                        ${text}

Login to Manager
  Enter "email" in "Tên đăng nhập" with "manager@gmail.com"
  Enter "text" in "Mật khẩu" with "Tester@123"
  Click "Đăng nhập" button
  User look message "Thành công" popup

Login to Staff
  Enter "email" in "Tên đăng nhập" with "staff@gmail.com"
  Enter "text" in "Mật khẩu" with "Tester@123"
  Click "Đăng nhập" button
  User look message "Thành công" popup