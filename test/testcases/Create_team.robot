*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

# ---------------------NAVIGATE CREATE USER PAGE-------------------------------------------------------
CRT-01 Verify that it is possible to navigate to the page for creating a new team
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu to "/vn/team"
    And Click "Tạo mới" button
    Then User look title "Thêm mới nhóm"

# ---------------------VALIDATION TEXT-------------------------------------------------
CRT-02 Verify that create team unsuccessfull because blank all field
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Click "Lưu lại" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field
    And Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

CRT-03 Verify that create team unsuccessfull because blank all field
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Click "Lưu và tạo mới" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field
    And Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

CRT-04 Verify that create team unsuccessfull because no enter "Tên Nhóm" field
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Click select "Quản lý" with "Hồ Đức Tâm Linh"
    And Click "Lưu lại" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field

CRT-04 Verify that create team unsuccessfull because no enter "Tên Nhóm" field
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Click "Lưu lại" button
    Then Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

# ---------------------------ERROR MESSAGE----------------------------------------
CRT-05 Verify that create team unsuccessfull because team is already taken    # TEST CASE FAILED 
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "Nhân viên ARI"
    And Enter "text" in textarea "Mô tả" with "_RANDOM_"
    And Click select "Quản lý" with "Hồ Đức Tâm Linh"
    And Click "Lưu lại" button
    Then User look message "Tên Nhóm đã được sử dụng" popup
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

# ---------------------------CREATE TEAM SUCCESSFULLY---------------------------------------
CRT-06 Verify that creating a team successfully with the sanme manager with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Enter "text" in textarea "Mô tả" with "_RANDOM_"
    And Click select "Quản lý" with "Hồ Đức Tâm Linh"
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Chỉnh sửa nhóm"
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

CRT-07 Verify that creating a team successfully with the same manager with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Enter "text" in textarea "Mô tả" with "_RANDOM_"
    And Click select "Quản lý" with "Hồ Đức Tâm Linh"
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Chỉnh sửa nhóm"
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup