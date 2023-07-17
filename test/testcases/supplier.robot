*** Settings ***
Resource            ../keywords/common.robot

# Library    SeleniumLibrary
Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
SPL_01 Verify UI in Danh sách nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Wait Until Element Spin
    ${elements}=    Set Variable    //tbody/tr
    ${count}=    Get Element Count    ${elements}
    Log To Console    ${count}

SPL_02 Verify UI in Thêm nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button

# SPL_03 Verify UI in Chỉnh sửa nhà cung cấp page displays correctly with design
#    [Tags]    @smoketest    @regression
#    Then Login to admin
#    When Click "Quản lý nhà cung cấp" menu
#    Double Click Element    //*[contains(@class, "ant-table-row")]//*[contains(text(), "SPL1129")]/ancestor::tr
