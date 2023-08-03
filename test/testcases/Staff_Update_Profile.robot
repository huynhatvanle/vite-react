*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

# ---------------------NAVIGATE CREATE USER PAGE-------------------------------------------------------
PRO-01 Verify that it is possible to navigate to the page for update profile
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    Then User look title "Thông tin cá nhân"

# ---------------------VALIDATION TEXT-------------------------------------------------
PRO-02 Verify that validation text in "Họ và tên" field when blank "Họ và tên" field
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    And Click in "Email" field
    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field

PRO-03 Verify that validation text in "Email" field when blank "Email" field
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "email" in "Email" with "${EMPTY}"
    And Click in "Mật khẩu" field
    Then Required message "Email" displayed under "Xin vui lòng nhập email" field

PRO-04 Verify that validation text in "Email" field when enter invalid email format and less than 6 characters long
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "email" in "Email" with "text"
    And Click in "Mật khẩu" field
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"
    And Required message "Email" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"

PRO-05 Verify that validation text in "Email" field when enter invalid email format and greater than 6 characters long
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "text" in "Email" with "_RANDOM_"
    And Click in "Mật khẩu" field
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"

PRO-06 Verify that validation text in "Mật khẩu" field when enter "Mật khẩu" field less than 6 characters
    [Tags]          @smoketest         @regression
    Go to profile page with Staff
    When Enter "text" in "Mật khẩu" with "12345"
    And Click in "Nhập lại mật khẩu" field
    Then Required message "Mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"
    And Required message "Mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự số!"

PRO-07 Verify that validation text in "Mật khẩu" field when enter "Mật khẩu" field not enough security
    [Tags]          @smoketest         @regression
    Go to profile page with Staff
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Click in "Nhập lại mật khẩu" field
    Then Required message "Mật khẩu" displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" field

PRO-08 Verify that validation text in "Nhập lại mật khẩu" field when enter "Nhập lại mật khẩu" field less than 8 characters
    [Tags]          @smoketest         @regression
    Go to profile page with Staff
    When Enter "text" in "Nhập lại mật khẩu" with "Nhat123"
    And Click in "Số điện thoại" field
    Then Required message "Nhập lại mật khẩu" field displayed under "Hai mật khẩu không giống nhau!"
    And Required message "Nhập lại mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!"

PRO-09 Verify that validation text in "Nhập lại mật khẩu" field when enter "Nhập lại mật khẩu" field greater than 8 characters
    [Tags]          @smoketest         @regression
    Go to profile page with Staff
    When Enter "text" in "Nhập lại mật khẩu" with "_RANDOM_"
    And Click in "Số điện thoại" field
    Then Required message "Nhập lại mật khẩu" field displayed under "Hai mật khẩu không giống nhau!"
    And Required message "Nhập lại mật khẩu" field displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt"

PRO-10 Verify that validation text in "Nhập lại mật khẩu" field when enter "Nhập lại mật khẩu" field does not match
    [Tags]          @smoketest         @regression
    Go to profile page with Staff
    When Enter "text" in "Nhập lại mật khẩu" with "Nhat@01101999"
    And Enter "text" in "Mật khẩu" with "Hovannhat@01101999"
    And Click in "Số điện thoại" field
    Then Required message "Nhập lại mật khẩu" displayed under "Hai mật khẩu không giống nhau!" field

PRO-11 Verify that validation text in "Số điện thoại" field when blank "Số điện thoại" field
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "phone" in "Số điện thoại" with "${EMPTY}"
    And Click in "Mật khẩu" field
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field

PRO-12 Verify that validation text in "Số điện thoại" field When enter invalid phone number format
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "text" in "Số điện thoại" with "_RANDOM_"
    And Click in "Mật khẩu" field
    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field

PRO-13 Verify that validation text in "Số điện thoại" field When enter phone number greater than 12 characters
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "number" in "Số điện thoại" with "_RANDOM_"
    And Click in "Mật khẩu" field
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa phải có 12 ký tự số!" field

PRO-14 Verify that validation text in "Ngày sinh" field When blank "Ngày sinh" field
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Delete information "Ngày sinh"
    And Click in "Mật khẩu" field
    Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field

PRO-15 Verify that validation text in "Vị tri" field when blank "Vị trí"
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Delele select "Vị trí" field
    Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field

##========================ERROR MESSAGE==========================================================
# PRO-16 Verify that Staff can update successfully when change name        #TEST CASE FAILED
#     [Tags]    @smoketest    @regression
#     Login to Staff
#     Hover to avatar
#     Click "Thông tin cá nhân" to profile
#     And Enter "text" in "Họ và tên" with "staff@gmail.com"
#     And Click "Lưu lại" button
#     Then User look message "Email đã được sử dụng" popup

#--------------------------------EDIT PROFILE SUCCESSFULLY------------------------------------------
PRO-17 Verify that Staff can update successfully when change name
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-18 Verify that Staff can update successfully when change Email
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "email" in "Email" with "staff@gmail.com"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-19 Verify that Staff can update successfully when change Phone Number
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter "phone" in "Số điện thoại" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-20 Verify that Staff can update successfully when change Date Of Birth
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    And Enter date in "Ngày sinh" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-21 Verify that Staff can update successfully when change password
    [Tags]    @smoketest    @regression
    Go to profile page with Staff
    When Enter "text" in "Mật khẩu" with "Tester@123"
    And Enter "text" in "Nhập lại mật khẩu" with "Tester@123"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

# -------------------DISPLAY PASSWORD AND RETYPE PASSWORD--------------------------------------------------------------
PRO-22 Verify that can see "Mật khẩu" và "Nhập lại mật khẩu" field are displayed as characters
    Go to profile page with Staff
    When Enter "text" in "Mật khẩu" with "Nhat@01101999"
    And Enter "text" in "Nhập lại mật khẩu" with "Nhat@01101999"
    And Click "Eye" icon to show "Mật khẩu" field and "Nhập lại mật khẩu" field
    Then User look "Mật khẩu" field with type "text"
    And User look "Nhập lại mật khẩu" field with type "text"

# #--------------------------------LOG OUT SUCCESSFULLY------------------------------------------
PRO-23 Verify that Staff can log out successfully
    [Tags]    @smoketest    @regression
    Login to Staff
    When Hover to avatar
    And Click "Đăng xuất" to logout
    Then User look title "Đăng nhập"

*** Keywords ***

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

Go to profile page with ${account}
  IF  '${account}' == 'Admin'
    Login to Admin
  ELSE IF  '${account}' == 'Manager'
    Login to Manager
  ELSE IF  '${account}' == 'Staff'
    Login to Staff
  END
  Hover to avatar
  Click "Thông tin cá nhân" to profile
  Sleep    2

Required message "${name}" field displayed under "${text}"
  ${element}=               Get Element Form Item By Name     ${name}                //*[contains(@class, "ant-picker-input")]/input
  Wait Until Element Is Visible        //div[contains(text(),'${text}')]
  Element Text Should Be    //div[contains(text(),'${text}')]                        ${text}

# Xóa thông tin hiện tại của trường: Ngày sinh hoặc Ngày đầu đi làm
Delete information "${name}"
    IF  '${name}' == 'Ngày sinh'
        ${num}=    Evaluate    0
    ELSE IF  '${name}' != 'Ngày sinh'
        ${num}=    Evaluate    1
    END
    And Enter date in "${name}" with ""
    ${elements}=               Get Elements        //span[@class='ant-picker-clear']
    Click    ${elements}[${num}]
    And Enter date in "${name}" with ""     

# Xóa thông tin hiện tại của trường: Vị trí hoặc Vai trò
Delele select "${name}" field
    IF  '${name}' == 'Vị trí'
        ${num}=    Evaluate    0
    ELSE IF  '${name}' == 'Thời gian'
        ${num}=    Evaluate    0
    ELSE IF  '${name}' == 'Vai trò'
        ${num}=    Evaluate    1
    END
    ${elements}=               Get Elements        //span[@class='ant-select-clear'] 
    Click    ${elements}[${num}]

Click "Eye" icon to show "Mật khẩu" field and "Nhập lại mật khẩu" field
    ${element}=    Get Elements    xpath=//*[contains(@class, 'absolute') and @id='Layer_1']
    Click    ${element}[0]
    Click    ${element}[1]

User look "${name}" field with type "${type}"
    ${element}=        Get Element Form Item By Name        ${name}        //input[contains(@class, "ant-input")]
    ${password_field_type}        Get Attribute        ${element}        type
    Should Be Equal As Strings        ${password_field_type}            ${type}

Hover to avatar
    Mouse Move Relative To        xpath=//header/div[1]/div[2]/section[1]/div[1]        0

Click "${profile}" to ${name}
    ${element}=        Set Variable        //div[text() = '${profile}']
    Wait Until Element Is Visible          ${element}
    Click    ${element}