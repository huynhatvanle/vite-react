*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

VLOT-01 Verify that user can view the list of teams successfully
    Login to Manager
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu to "vn/team"
    Then Show list of "teams"

VLOT-02 Verify that Manager can search successfully when entering correct keyword to search box with "Tên nhóm"
    Login to Manager
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu to "vn/team"
    And Search "text" in "Tìm kiếm" with "Nhân viên ARI"
    Then Show list of "teams"

VLOT-03 Verify that Manager can search unsuccessfully when entering incorrect keyword to search box
    Login to Manager
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu to "vn/team"
    And Search "text" in "Tìm kiếm" with "_RANDOM_"
    Then No team are shown

# VLOT-04 Verify that Next page and Previous page
#     Login to Manager
#     When Click "Thiết lập" menu
#     And Click "Nhóm" sub menu to "vn/team"
#     And Click ">" to "next" page
#     Log To Console    Danh sách team trang 2
#     Then Show list of "teams"
#     And Click "<" to "prev" page
#     Log To Console    Danh sách team trang 1
#     Then Show list of "teams"

*** Keywords ***
Login to Manager
  Enter "email" in "Tên đăng nhập" with "manager@gmail.com"
  Enter "text" in "Mật khẩu" with "Tester@123"
  Click "Đăng nhập" button
  User look message "Thành công" popup

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

Show list of "${name}"
    Wait Until Element Spin
    Wait Until Element Spin
    ${elements}=        Get Elements        xpath=//*[contains(@class, "ant-table-row")]
    ${count}=    Set Variable    2
    ${stt}=    Set Variable    1
    Log To Console    =======================List Of ${name}=================================================
    FOR    ${item}    IN    @{elements}
        ${team_name}=        Get Text        //tbody[1]/tr[${count}]/td[1]
        ${manager}=          Get Text        //tbody/tr[${count}]/td[2]/div[1]/span[1]
        Log To Console        ${stt}. ${team_name} || ${manager}
        Log To Console        =======================================================
        ${count}=    Evaluate    ${count} + 1
        ${stt}=    Evaluate      ${stt} + 1
    END
    ${total}=    Evaluate    ${count} - 2
    Log To Console    Tổng số lượng ${name} là: ${total}

Click "${icon}" to "${next}" page
    ${element}=    Set Variable    //button[@aria-label="${next}"]
    Wait Until Element Is Visible    ${element}
    Click    ${element}
    Wait Until Element Spin 