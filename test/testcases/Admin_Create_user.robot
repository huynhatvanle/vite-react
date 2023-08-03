*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Variables ***
${username_valid}    Hoàng Diệu
${email_valid}    staff@gmail.com
${phone_number_valid}    0941225407    

*** Test Cases ***

# # ---------------------NAVIGATE CREATE USER PAGE-------------------------------------------------------
CRU-01 Verify that the page can be navigated to create a new user with the Staff role
    [Tags]    @smoketest    @regression
    Login to Admin
    And Click "Người Dùng" menu
    And Click list Role with "Staff"
    And Click "Tạo mới" button
    Then User look title "Tạo mới người dùng Staff"
    And User look title "Tạo mới người dùng Staff"

CRU-02 Verify that the page can be navigated to create a new user with the Manager role
    [Tags]    @smoketest    @regression
    Login to Admin
    And Click "Người Dùng" menu
    And Click list Role with "Manager"
    And Click "Tạo mới" button
    Then User look title "Tạo mới người dùng Manager"
    And User look title "Tạo mới người dùng Manager"

CRU-03 Verify that the page can be navigated to create a new user with the Supper Admin role
    [Tags]    @smoketest    @regression
    Login to Admin
    And Click "Người Dùng" menu
    And Click list Role with "Supper Admin"
    And Click "Tạo mới" button
    Then User look title "Tạo mới người dùng Supper Admin"
    And User look title "Tạo mới người dùng Supper Admin"

# # ---------------------VALIDATION TEXT-------------------------------------------------
CRU-04 Verify that validation text when blank all fields & "Lưu lại" button
    [Tags]    @smoketest         @regression
    Go to page create user with the "Staff" role
    When Click "Lưu lại" button
    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
    And Required message "Email" displayed under "Xin vui lòng nhập email" field
    And Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
    And Required message "Nhập lại mật khẩu" displayed under "Xin vui lòng nhập nhập lại mật khẩu" field
    And Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
    And Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field
    And Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field
    And Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field

CRU-05 Verify that validation text when blank all fields & "Lưu và tạo mới" button
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Click "Lưu và tạo mới" button
    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
    And Required message "Email" displayed under "Xin vui lòng nhập email" field
    And Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
    And Required message "Nhập lại mật khẩu" displayed under "Xin vui lòng nhập nhập lại mật khẩu" field
    And Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
    And Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field
    And Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field
    And Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field

CRU-06 Verify that validation text of "Họ và tên" field display when blank "Họ và tên" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Họ và tên" with "${EMPTY}"
    And Enter "email" in "Email" with "${EMPTY}"
    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
    
CRU-07 Verify that validation text of "Email" field display when blank "Email" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "email" in "Email" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Email" displayed under "Xin vui lòng nhập email" field

CRU-08 Verify that validation text in "Email" field when enter invalid email format and less than 6 characters long
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Email" with "text"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"
    And Required message "Email" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"

CRU-09 Verify that validation text in "Email" field when enter invalid email format and greater than 6 characters long
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Email" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"

CRU-10 Verify that validation text in "Mật khẩu" field when blank "Mật khẩu" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Mật khẩu" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
    
CRU-11 Verify that validation text in "Mật khẩu" field When enter password less than 6 characters
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Mật khẩu" with "12345"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"
    And Required message "Mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự số!"

CRU-12 Verify that validation text in "Mật khẩu" field When enter password not enough security
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Mật khẩu" displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" field

CRU-13 Verify that validation text in "Nhập lại mật khẩu" field when blank "Nhập lại mật khẩu" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Nhập lại mật khẩu" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Nhập lại mật khẩu" displayed under "Xin vui lòng nhập nhập lại mật khẩu" field

CRU-14 Verify that validation text in "Nhập lại mật khẩu" field when enter retype_password less than 8 characters
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Nhập lại mật khẩu" with "Nhat123"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Nhập lại mật khẩu" field displayed under "Hai mật khẩu bạn nhập không nhất quán!"
    And Required message "Nhập lại mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!"

CRU-15 Verify that validation text in "Nhập lại mật khẩu" field when enter retype_password greater than 8 characters
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Nhập lại mật khẩu" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Nhập lại mật khẩu" field displayed under "Hai mật khẩu bạn nhập không nhất quán!"
    And Required message "Nhập lại mật khẩu" field displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt"

CRU-16 Verify that validation text in "Nhập lại mật khẩu" field when enter retype_password does not match
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Mật khẩu" with "Nhat@01101999"
    When Enter "text" in "Nhập lại mật khẩu" with "Hovannhat@01101999"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Nhập lại mật khẩu" displayed under "Hai mật khẩu bạn nhập không nhất quán!" field

CRU-17 Verify that validation text in "Số điện thoại" field when blank "Số điện thoại" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "phone" in "Số điện thoại" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field

CRU-18 Verify that validation text in "Số điện thoại" field When enter invalid phone number format
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "text" in "Số điện thoại" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field

CRU-19 Verify that validation text in "Số điện thoại" field When enter phone number greater than 12 characters
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter "number" in "Số điện thoại" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa phải có 12 ký tự số!" field

CRU-20 Verify that validation text in "Ngày sinh" field when blank "Ngày sinh" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter date in "Ngày sinh" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field

CRU-21 Verify that validation text in "Vị trí" field when blank "Vị trí" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Click select "Vị trí" with "Developer"
    And Delele select "Vị trí" field
    Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field

CRU-22 Verify that validation text in "Ngày đầu đi làm" field when blank "Ngày đầu đi làm" field
    [Tags]          @smoketest         @regression
    Go to page create user with the "Staff" role
    When Enter date in "Ngày đầu đi làm" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field

##--------------------------------------ERROR MESSAGE--------------------------------------------------------
CRU-23 Verify that Create user unsuccessfully because email is already taken & "lưu lại" button
    Go to page create user with the "Staff" role
    When Enter "text" in "Họ và tên" with "_RANDOM_"
    And Enter "email" in "Email" with "staff@gmail.com"
    And Enter "text" in "Mật khẩu" with "Nhat@01101999"
    And Enter "text" in "Nhập lại mật khẩu" with "Nhat@01101999"
    And Enter "phone" in "Số điện thoại" with "_RANDOM_"
    And Enter date in "Ngày sinh" with "_RANDOM_"
    And Click select "Vị trí" with "Developer"
    And Enter date in "Ngày đầu đi làm" with "_RANDOM_"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Email đã được sử dụng" popup

CRU-24 Verify that Create user unsuccessfully because email is already taken & "lưu và tạo mới" button
    Go to page create user with the "Staff" role
    When Enter "text" in "Họ và tên" with "_RANDOM_"
    And Enter "email" in "Email" with "staff@gmail.com"
    And Enter "text" in "Mật khẩu" with "Nhat@01101999"
    And Enter "text" in "Nhập lại mật khẩu" with "Nhat@01101999"
    And Enter "phone" in "Số điện thoại" with "_RANDOM_"
    And Enter date in "Ngày sinh" with "_RANDOM_"
    And Click select "Vị trí" with "Developer"
    And Enter date in "Ngày đầu đi làm" with "_RANDOM_"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Email đã được sử dụng" popup

##--------------------------------------VERIFY CREATE USER SUCCESSFULLY---------------------------
CRU-25 Verify that Create user successfully when select "Vai trò" with "Staff" & "Lưu lại" button
    Go to page create user with the "Staff" role
    When Enter invalid information to create user
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Người dùng"
    When Click on the "Xóa" button in the "Email" table line
    Then User look message "Xóa thành công" popup

CRU-26 Verify that Create user successfully when select "Vai trò" with "Staff" & "Lưu và tạo mới" button
    Go to page create user with the "Staff" role
    When Enter invalid information to create user
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới người dùng Staff"
    And User look all field empty when create user
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Email" table line
    Then User look message "Xóa thành công" popup

CRU-27 Verify that Create user successfully when select "Vai trò" with "Manager" & "Lưu lại" button
    Go to page create user with the "Manager" role
    When Enter invalid information to create user
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Người dùng"
    When Click on the "Xóa" button in the "Email" table line
    Then User look message "Xóa thành công" popup

CRU-28 Verify that Create user successfully when select "Vai trò" with "Manager" & "Lưu và tạo mới" button
    Go to page create user with the "Manager" role
    When Enter invalid information to create user
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới người dùng Manager"
    And User look all field empty when create user
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Email" table line
    Then User look message "Xóa thành công" popup

CRU-29 Verify that Create user successfully when select "Vai trò" with "Supper Admin" & "Lưu lại" button
    Go to page create user with the "Supper Admin" role
    When Enter invalid information to create user
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Người dùng"
    When Click on the "Xóa" button in the "Email" table line
    Then User look message "Xóa thành công" popup

CRU-30 Verify that Create user successfully when select "Vai trò" with "Supper Admin" & "Lưu và tạo mới" button
    Go to page create user with the "Supper Admin" role
    When Enter invalid information to create user
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới người dùng Supper Admin"
    And User look all field empty when create user
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Email" table line
    Then User look message "Xóa thành công" popup

## -------------------DISPLAY PASSWORD AND RETYPE PASSWORD--------------------------------------------------------------
CRU-31 Verify that can see "Mật khẩu" và "Nhập lại mật khẩu" field are displayed as characters
    Go to page create user with the "Staff" role
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Enter "text" in "Nhập lại mật khẩu" with "_RANDOM_"
    And Click "Eye" icon to show "Mật khẩu" field and "Nhập lại mật khẩu" field
    Then User look "Mật khẩu" field with type "text"
    And User look "Nhập lại mật khẩu" field with type "text"

## ------------------------------------------------------ERROR MESSGAE WHEN DELETE USER-------------------------------------------------------
CRU-32 Verify that Delete user unsuccessfully because user has submitted a request for leave that needs to be approved
    Login to admin
    And Click "Người Dùng" menu
    And Click "Xóa" user has submitted a request for leave that needs to be approved
    Then User look message "Còn những yêu cầu nghỉ cần duyệt" popup

CRU-33 Verify that Delete user unsuccessfully because user still managing other people
    Login to admin
    And Click "Người Dùng" menu
    And Click "Xóa" user still managing other people
    Then User look message "common.user.Still managing other people" popup

###-----------------------------------------RELOAD PAGE---------------------------------------------------##
# CRU-34 Verify entered data not showing when Refresh with F5 key
#     Go to page create user with the "Staff" role
#     When Enter invalid information to create user
#     And Click select "Vai trò" with "Supper Admin"
#     And Reload Page
#     Then User look all field empty when create user

#-------------------------------------VIEW LIST OF USER--------------------------------------------------------------------------------------
CRU-35 Verify that user can view the list of Staff successfully
    Login to admin
    And Click "Người Dùng" menu
    And Click list Role with "Staff"
    Then Show list of "users"

CRU-36 Verify that user can view the list of Manager successfully
    Login to admin
    And Click "Người Dùng" menu
    And Click list Role with "Manager"
    Then Show list of "users"

CRU-37 Verify that user can view the list of Supper Admin successfully
    Login to admin
    And Click "Người Dùng" menu
    And Click list Role with "Supper Admin"
    Then Show list of "users"

CRU-38 Verify that Admin can search successfully when entering correct keyword to search box with "Họ và tên"
    Login to admin
    And Click "Người Dùng" menu
    And Search "text" in "Tìm kiếm" with "${username_valid}"
    Then Show list of "users"

CRU-39 Verify that Admin can search successfully when entering correct keyword to search box with "Email"
    Login to admin
    And Click "Người Dùng" menu
    And Search "email" in "Tìm kiếm" with "${email_valid}"
    Then Show list of "users"

CRU-40 Verify that Admin can search successfully when entering correct keyword to search box with "Phone"
    Login to admin
    And Click "Người Dùng" menu
    And Search "phone" in "Tìm kiếm" with "${phone_number_valid}"
    Then Show list of "users"

CRU-41 Verify that Admin can search unsuccessfully when entering incorrect keyword to search box with "Họ và tên"
    Login to admin
    And Click "Người Dùng" menu
    And Search "text" in "Tìm kiếm" with "_RANDOM_"
    Then No users are shown

CRU-42 Verify that Admin can search unsuccessfully when entering incorrect keyword to search box with "Email"
    Login to admin
    And Click "Người Dùng" menu
    And Search "email" in "Tìm kiếm" with "_RANDOM_"
    Then No users are shown

CRU-43 Verify that Admin can search unsuccessfully when entering incorrect keyword to search box with "Phone number"
    Login to admin
    And Click "Người Dùng" menu
    And Search "phone" in "Tìm kiếm" with "_RANDOM_"
    Then No users are shown

# CRU-44 Verify that Next page and Previous page
#     Login to admin
#     And Click "Người Dùng" menu
#     And Click ">" to "next" page
#     Log To Console    Danh sách user trang 2
#     Then Show list of "users"
#     And Click "<" to "prev" page
#     Log To Console    Danh sách user trang 1
#     Then Show list of "users"

*** Keywords ***
# #############--------------CREATE USER----------------#########################
# Kiểm tra xem thông báo lỗi có hiển thị đúng vị trí mong đợi không (hiển thị 2 validation text).
Required message "${name}" field displayed under "${text}"
  ${element}=               Get Element Form Item By Name     ${name}                //*[contains(@class, "ant-picker-input")]/input
  Wait Until Element Is Visible        //div[contains(text(),'${text}')]
  Element Text Should Be    //div[contains(text(),'${text}')]                        ${text}

User look textarea "${name}" field empty
    ${element}=               Get Element Form Item By Name     ${name}                       //textarea
    Element Text Should Be    ${element}    ${EMPTY}

User look select "${name}" field empty
    ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-select-selection-search-input")]
    Element Text Should Be    ${element}    ${EMPTY}

# Kiểm tra mật khẩu có hiển thị hay không khi click icon "eye"
User look "${name}" field with type "${type}"
    ${element}=        Get Element Form Item By Name        ${name}        //input[contains(@class, "ant-input")]
    ${password_field_type}        Get Attribute        ${element}        type
    Should Be Equal As Strings        ${password_field_type}            ${type}

# Input empty
User look "${name}" field empty
    ${element}=    Get Element Form Item By Name     ${name}    //input[contains(@class, "ant-input")]
    Element Text Should Be    ${element}    ${EMPTY}

# Ngày sinh empty
User look date in "${name}" field empty
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-picker-input")]/input
  Element Text Should Be    ${element}    ${EMPTY}

# Click sub menu "Danh sách" trong menu "Người Dùng"
Click "${list}" submenu in "Người Dùng" menu
    ${element}=        Set Variable        xpath=(//span[text()='${list}'])[2]
    Click     ${element}

# XÓA USER KHI USER ĐÓ CÒN NHỮNG YÊU CẦU NGHỈ PHÉP CẦN PHÊ DUYỆT (Có 3 user Staff, chọn User thứ 2 để xóa)
Click "${delete}" user has submitted a request for leave that needs to be approved
    Click list Role with "Staff"
    Wait Until Element Spin
    ${elements}=        Get Elements        xpath=//button[@title="${delete}"]
    ${elementCount}    Get Length            ${elements}
    ${randomIndex}=    Evaluate              ${elementCount}-1
    Click     ${elements}[${randomIndex}]
    Click Confirm To Action

# XÓA USER KHI USER ĐÓ ĐANG QUẢN LÝ MỘT USER KHÁC (Có 3 user Manager, chọn User thứ 2 để xóa)
Click "${delete}" user still managing other people
    Click list Role with "Manager"    
    Wait Until Element Spin
    ${elements}=        Get Elements        xpath=//button[@title="${delete}"]
    ${elementCount}    Get Length            ${elements}
    ${randomIndex}=    Evaluate              ${elementCount}-1
    Click     ${elements}[${randomIndex}]
    Click Confirm To Action

# Click vào icon "Eye" để hiển thị mật khẩu và nhập lại mật khẩu
Click "Eye" icon to show "Mật khẩu" field and "Nhập lại mật khẩu" field
    ${element}=    Get Elements    xpath=//*[contains(@class, 'absolute') and @id='Layer_1']
    Click    ${element}[0]
    Click    ${element}[1]

# Chon danh sách user ứng với vai trò tương ứng
Click list ${name} with "${text}"
    ${element}=    Set Variable    xpath=//div[contains(@class, 'truncate') and text()='${text}']
    Wait Until Element Is Visible    ${element}
    Click    ${element}
    Wait Until Element Spin
    Wait Until Element Spin

# Nhập từ khóa cần tìm kiếm
Search "${type}" in "${name}" with "${text}"
    Wait Until Element Spin
    Wait Until Element Spin
    ${text}=                  Get Random Text                   ${type}                       ${text}
    ${element}=               Set Variable        //input[@placeholder="${name}"]
    Clear Text                ${element}
    Fill Text                 ${element}                        ${text}                       True
    ${cnt}=                   Get Length                        ${text}
    IF  ${cnt} > 0
        Set Global Variable     ${STATE["${name}"]}               ${text}
    END
    Sleep    2

The page is refreshed with empty fields
    Then User look "Họ và tên" field empty
    And User look "Email" field empty
    And User look "Mật khẩu" field empty
    And User look "Nhập lại mật khẩu" field empty
    And User look "Số điện thoại" field empty

# Hiển thị danh sách
Show list of "${name}"
    Wait Until Element Spin
    Wait Until Element Spin
    ${elements}=        Get Elements        xpath=//*[contains(@class, "ant-table-row")]
    ${count}=    Set Variable    2
    ${stt}=    Set Variable    1
    Log To Console    =======================List Of ${name}=================================================
    FOR    ${item}    IN    @{elements}
          ${fullname}=        Get Text    //tbody/tr[${count}]/td[1]/div[1]/span[1]
          ${position}=        Get Text    //tbody/tr[${count}]/td[2]
          ${role}=            Get Text    //tbody/tr[${count}]/td[3]
          ${manager}=         Get Text    //tbody/tr[${count}]/td[4]
          ${team}=            Get Text    //tbody/tr[${count}]/td[5]
          ${Email}=           Get Text    //tbody/tr[${count}]/td[6]
          ${phone_number}=    Get Text    //tbody/tr[${count}]/td[7]
          
          IF  '${manager}' == '${EMPTY}'
            ${manager}=    Set Variable    Không có quản lý
          END
            
          IF  '${team}' == '${EMPTY}'
            ${team}=    Set Variable    Không có nhóm
          END
          
          Log To Console        ${stt}. ${fullname} | ${position} | ${role} | ${manager} | ${team} | ${Email} | ${phone_number} |
          Log To Console        ========================================================================================================
          ${count}=    Evaluate    ${count} + 1
          ${stt}=    Evaluate    ${stt} + 1
        END
    ${total}=    Evaluate    ${count} - 2
    Log To Console    Tổng số lượng ${name} là: ${total}

# Không có user nào được hiển thị khi nhập từ khóa tìm kiếm không hợp lệ
No ${name} are shown
    Wait Until Element Spin
    ${element}=    Set Variable    //div[@class="bg-gray-100 text-gray-400 py-4"]
    Wait Until Element Is Visible    ${element}
    ${text}=    Get Text    ${element}
    Run Keyword If  '${text}' == 'Trống'    Log To Console    Không có ${name} nào ứng với từ khóa tìm kiếm

# Chọn Next page hoặc Previous page  
Click "${icon}" to "${next}" page
    ${element}=    Set Variable    //button[@aria-label="${next}"]
    Wait Until Element Is Visible    ${element}
    Click    ${element}
    Wait Until Element Spin

Go to page create user with the "${role}" role
  Login to admin
  When Click "Người Dùng" menu
  IF  '${role}' == 'Staff'
    Wait Until Element Spin
  ELSE IF  '${role}' != 'Staff'
    Click list Role with "${role}"
  END
  Click "Tạo mới" button
  Wait Until Element Spin
  Sleep    ${SHOULD_TIMEOUT}

User look all field empty when create user
  User look "Họ và tên" field empty
  User look "Email" field empty
  User look "Mật khẩu" field empty
  User look "Nhập lại mật khẩu" field empty
  User look "Số điện thoại" field empty
  User look date in "Ngày sinh" field empty
  User look select "Vị trí" field empty
  User look date in "Ngày đầu đi làm" field empty

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

Delele select at "Quản lý" field
    ${elements}=               Get Element        //span[@class='ant-select-clear'] 
    Click    ${elements}

Enter invalid information to create user
  When Enter "text" in "Họ và tên" with "_RANDOM_"
  And Enter "email" in "Email" with "_RANDOM_"
  And Enter "text" in "Mật khẩu" with "Nhat@01101999"
  And Enter "text" in "Nhập lại mật khẩu" with "Nhat@01101999"
  And Enter "phone" in "Số điện thoại" with "_RANDOM_"
  And Enter date in "Ngày sinh" with "_RANDOM_"
  And Click select "Vị trí" with "Developer"
  And Enter date in "Ngày đầu đi làm" with "_RANDOM_"
  And Enter "words" in textarea "Mô tả" with "_RANDOM_"