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

SPL_03 Verify UI in Chỉnh sửa nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Click    //*[contains(@class, "ant-table-row")][1]    left    2

SPL_04 Verify that validation text appears when leaving all mandatory fields blank
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Click "Lưu" button
    Then Required message "Tên nhà cung cấp" displayed under "Xin vui lòng nhập tên nhà cung cấp" field
    Then Required message "Tỉnh/Thành phố" displayed under "Xin vui lòng chọn tỉnh/thành phố" field
    Then Required message "Quận/Huyện" displayed under "Xin vui lòng chọn quận/huyện" field
    Then Required message "Phường/Xã" displayed under "Xin vui lòng chọn phường/xã" field
    Then Required message "Địa chỉ cụ thể" displayed under "Xin vui lòng nhập địa chỉ cụ thể" field
    Then Required message "Họ tên đại diện" displayed under "Xin vui lòng chọn họ tên đại diện" field
    Then Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập số điện thoại đại diện" field
    Then Required message "Email đại diện" displayed under "Xin vui lòng nhập email đại diện" field

SPL_03 Verify UI in Chỉnh sửa nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Click    //*[contains(@class, "ant-table-row")][1]    left    2

SPL_03 Verify UI in Chỉnh sửa nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Click    //*[contains(@class, "ant-table-row")][1]    left    2
