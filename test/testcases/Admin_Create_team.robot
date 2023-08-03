*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

# ---------------------NAVIGATE CREATE TEAM PAGE-------------------------------------------------------
CRT-01 Verify that it is possible to navigate to the page for creating a new team
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu
    And Click "Tạo mới" button
    Then User look title "Thêm mới nhóm"

# ---------------------VALIDATION TEXT-------------------------------------------------
CRT-02 Verify that create team unsuccessfull because blank all field & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Click "Lưu lại" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field
    And Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

CRT-03 Verify that create team unsuccessfull because blank all field & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Click "Lưu và tạo mới" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field
    And Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

CRT-04 Verify that create team unsuccessfull because no enter "Tên Nhóm" field & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Click select "Quản lý" with "Hồ Văn Nhật"
    And Click "Lưu lại" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field

CRT-05 Verify that create team unsuccessfull because no enter "Tên Nhóm" field & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Click select "Quản lý" with "Hồ Văn Nhật"
    And Click "Lưu và tạo mới" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field

CRT-06 Verify that create team unsuccessfull because no enter "Quản lý" field & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Click "Lưu lại" button
    Then Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

CRT-07 Verify that create team unsuccessfull because no enter "Quản lý" field & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

# ---------------------------ERROR MESSAGE----------------------------------------
# CRT-08 Verify that create team unsuccessfull because team is already taken & "Lưu lại" button    # TEST CASE FAILED 
#     [Tags]    @smoketest    @regression
#     When Go to page create team
#     And Enter "text" in "Tên Nhóm" with "Nhân viên ARI"
#     And Enter "text" in textarea "Mô tả" with "_RANDOM_"
#     And Click select "Quản lý" with "Hồ Văn Nhật"
#     And Click "Lưu lại" button
#     Then User look message "Tên Nhóm đã được sử dụng" popup

# CRT-09 Verify that create team unsuccessfull because team is already taken & "Lưu và tạo mới" button    # TEST CASE FAILED 
#     [Tags]    @smoketest    @regression
#     When Go to page create team
#     And Enter "text" in "Tên Nhóm" with "Nhân viên ARI"
#     And Enter "text" in textarea "Mô tả" with "_RANDOM_"
#     And Click select "Quản lý" with "Hồ Văn Nhật"
#     And Click "Lưu và tạo mới" button
#     Then User look message "Tên Nhóm đã được sử dụng" popup

# ---------------------------CREATE TEAM SUCCESSFULLY---------------------------------------
CRT-10 Verify that creating a team successfully with the sanme manager with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Enter "text" in textarea "Mô tả" with "_RANDOM_"
    And Click select "Quản lý" with "Hồ Văn Nhật"
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Nhóm"
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

CRT-11 Verify that creating a team successfully with the same manager with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Enter "text" in textarea "Mô tả" with "_RANDOM_"
    And Click select "Quản lý" with "Hồ Văn Nhật"
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Thêm mới nhóm"
    And User look all field empty when create team
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

CRT-12 Verify that create new team is successful when create team with another manager & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Enter "text" in textarea "Mô tả" with "_RANDOM_"
    And Click select "Quản lý" with "Nguyễn Ngọc Đức"
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Nhóm"
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

CRT-13 Verify that create new team is successful when create team with another manager & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Enter "text" in textarea "Mô tả" with "_RANDOM_"
    And Click select "Quản lý" with "Nguyễn Ngọc Đức"
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Thêm mới nhóm"
    And User look all field empty when create team
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

CRT-14 Verify that create new team is successful when create team with leave description blank & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Click select "Quản lý" with "Nguyễn Ngọc Đức"
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Nhóm"
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

CRT-15 Verify that create new team is successful when create team with leave description blank & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Click select "Quản lý" with "Nguyễn Ngọc Đức"
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Thêm mới nhóm"
    And User look all field empty when create team
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên Nhóm" table line
    Then User look message "Xóa thành công" popup

###-------------------RELOAD PAGE-----------------------------------------------------------------------------------------
# CRT-16 Verify entered data not showing when Refresh with F5 key
#     [Tags]    @smoketest    @regression
#     When Go to page create team
#     And Enter "text" in "Tên Nhóm" with "_RANDOM_"
#     And Enter "text" in textarea "Mô tả" with "_RANDOM_"
#     And Click select "Quản lý" with "Hoàng Diệu"
#     And Reload Page
#     Then User look "Tên Nhóm" field empty
#     And User look textarea "Mô tả" field empty
#     And User look select "Quản lý" field empty

##=======================VIEW LIST OF TEAM====================================##
CRT-17 Verify that user can view the list of teams successfully
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu to "vn/team"
    Then Show list of "teams"

CRT-18 Verify that Admin can search successfully when entering correct keyword to search box with "Tên nhóm"
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu to "vn/team"
    And Search "text" in "Tìm kiếm" with "Nhân viên ARI"
    Then Show list of "teams"

CRT-19 Verify that Admin can search unsuccessfully when entering incorrect keyword to search box
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu to "vn/team"
    And Search "text" in "Tìm kiếm" with "_RANDOM_"
    Then No team are shown

# CRT-20 Verify that Next page and Previous page
#     Login to admin
#     When Click "Thiết lập" menu
#     And Click "Nhóm" sub menu to "vn/team"
#     And Click ">" to "next" page
#     Log To Console    Danh sách team trang 2
#     Then Show list of "teams"
#     And Click "<" to "prev" page
#     Log To Console    Danh sách team trang 1
#     Then Show list of "teams" 

##=======================VERIFY EDIT TEAM================================##
##=======================NAVIGATE TO EDIT TEAM PAGE===========================
EDT-01 Verify that edit team unsuccessfull because no enter "Tên Nhóm" field & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page edit team
    Then User look title "Chỉnh sửa nhóm"
    And User look title form "Chỉnh sửa nhóm"

# ---------------------VALIDATION TEXT-------------------------------------------------
EDT-02 Verify that edit team unsuccessfull because no enter "Tên Nhóm" field & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page edit team
    And Enter "text" in "Tên Nhóm" with "${EMPTY}"
    And Click "Lưu lại" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field

EDT-03 Verify that edit team unsuccessfull because no enter "Tên Nhóm" field & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page edit team
    And Enter "text" in "Tên Nhóm" with "${EMPTY}"
    And Click "Lưu và tạo mới" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field

EDT-04 Verify that edit team unsuccessfull because no enter "Quản lý" field
    [Tags]    @smoketest    @regression
    When Go to page edit team
    And Delele select at "Quản lý" field
    Then Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

##========================ERROR MESSAGE WHEN EDIT TEAM=====================================##
# EDT-05 Verify that user can edit team's name successfully & "Lưu lại" button        #TEST CASE FAILED
#     Go to page edit team
#     And Enter "text" in "Tên Nhóm" with "Nhân viên ARI"
#     And Click "Lưu lại" button
#     Then User look message "Tên nhóm đã được sử dụng" popup

# EDT-06 Verify that user can edit team's name successfully & "Lưu và tạo mới" button         #TEST CASE FAILED
#     Go to page edit team
#     And Enter "text" in "Tên Nhóm" with "Nhân viên ARI"
#     And Click "Lưu lại" button
#     Then User look message "Tên nhóm đã được sử dụng" popup

##========================EDIT TEAM SUCCESSFULLY=====================================##
EDT-07 Verify that user can edit team's name successfully & "Lưu lại" button
    Go to page edit team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Nhóm"

EDT-08 Verify that user can edit team's name successfully & "Lưu và tạo mới" button
    Go to page edit team
    And Enter "text" in "Tên Nhóm" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Thêm mới nhóm"
    And User look all field empty when edit team

EDT-09 Verify that user can edit team successfully when change manager has team & "Lưu lại" button
    Go to page edit team
    And Click select "Quản lý" with "Nguyễn Ngọc Đức"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Nhóm"

EDT-10 Verify that user can edit team successfully when change manager has team & "Lưu và tạo mới" button
    Go to page edit team
    And Click select "Quản lý" with "Nguyễn Ngọc Đức"
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Thêm mới nhóm"
    And User look all field empty when edit team

EDT-11 Verify that user can edit team successfully when change manager has no team & "Lưu lại" button
    Go to page edit team
    And Click select "Quản lý" with "Hồ Văn Nhật"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Nhóm"

EDT-12 Verify that user can edit team successfully when change manager has no team & "Lưu và tạo mới" button
    Go to page edit team
    And Click select "Quản lý" with "Hồ Văn Nhật"
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Thêm mới nhóm"
    And User look all field empty when edit team

*** Keywords ***

Select ${name} need to edit
  ${elements}            Get Elements            xpath=//button[@title="Sửa"]
  ${elementCount}        Get Length            ${elements}
  Click    ${elements}[0]
  Wait Until Element Spin

Delele select at "Quản lý" field
    ${elements}=               Get Element        //span[@class='ant-select-clear'] 
    Click    ${elements}

Go to page ${name} team
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Nhóm" sub menu
    IF  '${name}' == 'create'
      Click "Tạo mới" button
    ELSE IF  '${name}' == 'edit'
      Select team need to edit
    END
    Wait Until Element Spin
    Sleep    ${SHOULD_TIMEOUT}

User look "${name}" field empty
    ${element}=    Get Element Form Item By Name     ${name}    //input[contains(@class, "ant-input")]
    Element Text Should Be    ${element}    ${EMPTY}

User look textarea "${name}" field empty
    ${element}=               Get Element Form Item By Name     ${name}                       //textarea
    Element Text Should Be    ${element}    ${EMPTY}

User look select "${name}" field empty
    ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-select-selection-search-input")]
    Element Text Should Be    ${element}    ${EMPTY}

User look all field empty when ${name} team
  User look "Tên Nhóm" field empty
  User look textarea "Mô tả" field empty
  User look select "Quản lý" field empty

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

User look title form "${text}"
    ${element}    Set Variable    //h1[@class="text-xl font-bold hidden sm:block" and //h1[text() = "${text}"]]
    Wait Until Element Is Visible    ${element}
    Element Text Should Be    ${element}    ${text}
