*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Variables ***
${username_valid}    Hoàng Diệu
${email_valid}    staff@gmail.com
${phone_number_valid}    0941225407  

*** Test Cases ***

VLOU-01 Verify that user can view the list of Staff successfully
    Login to Manager
    And Click "Người Dùng" menu
    And Click list Role with "Staff"
    Then Show list of "users"

VLOU-02 Verify that user can view the list of Manager successfully
    Login to Manager
    And Click "Người Dùng" menu
    And Click list Role with "Manager"
    Then Show list of "users"

VLOU-03 Verify that user can view the list of Supper Manager successfully
    Login to Manager
    And Click "Người Dùng" menu
    And Click list Role with "Supper Admin"
    Then Show list of "users"

VLOU-04 Verify that Manager can search successfully when entering correct keyword to search box with "Họ và tên"
    Login to Manager
    And Click "Người Dùng" menu
    And Search "text" in "Tìm kiếm" with "${username_valid}"
    Then Show list of "users"

VLOU-05 Verify that Manager can search successfully when entering correct keyword to search box with "Email"
    Login to Manager
    And Click "Người Dùng" menu
    And Search "email" in "Tìm kiếm" with "${email_valid}"
    Then Show list of "users"

VLOU-06 Verify that Manager can search successfully when entering correct keyword to search box with "Phone"
    Login to Manager
    And Click "Người Dùng" menu
    And Search "phone" in "Tìm kiếm" with "${phone_number_valid}"
    Then Show list of "users"

VLOU-07 Verify that Manager can search unsuccessfully when entering incorrect keyword to search box with "Họ và tên"
    Login to Manager
    And Click "Người Dùng" menu
    And Search "text" in "Tìm kiếm" with "_RANDOM_"
    Then No users are shown

VLOU-08 Verify that Manager can search unsuccessfully when entering incorrect keyword to search box with "Email"
    Login to Manager
    And Click "Người Dùng" menu
    And Search "email" in "Tìm kiếm" with "_RANDOM_"
    Then No users are shown

VLOU-09 Verify that Manager can search unsuccessfully when entering incorrect keyword to search box with "Phone number"
    Login to Manager
    And Click "Người Dùng" menu
    And Search "phone" in "Tìm kiếm" with "_RANDOM_"
    Then No users are shown

# VLOU-10 Verify that Next page and Previous page
#     Login to Manager
#     And Click "Người Dùng" menu
#     And Click ">" to "next" page
#     Log To Console    Danh sách user trang 2
#     Then Show list of "users"
#     And Click "<" to "prev" page
#     Log To Console    Danh sách user trang 1
#     Then Show list of "users"

*** Keywords ***
Login to Manager
  Enter "email" in "Tên đăng nhập" with "manager@gmail.com"
  Enter "text" in "Mật khẩu" with "Tester@123"
  Click "Đăng nhập" button
  User look message "Thành công" popup

Click list ${name} with "${text}"
    ${element}=    Set Variable    xpath=//div[contains(@class, 'truncate') and text()='${text}']
    Wait Until Element Is Visible    ${element}
    Click    ${element}
    Wait Until Element Spin
    Wait Until Element Spin
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

No ${name} are shown
    Wait Until Element Spin
    ${element}=    Set Variable    //div[@class="bg-gray-100 text-gray-400 py-4"]
    Wait Until Element Is Visible    ${element}
    ${text}=    Get Text    ${element}
    Run Keyword If  '${text}' == 'Trống'    Log To Console    Không có ${name} nào ứng với từ khóa tìm kiếm