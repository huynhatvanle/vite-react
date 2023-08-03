*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

## =============================Navigate to Create Data page===================================
CRD-01 Verify that it is possible to navigate to the page for creating a new Data with Partner
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click "Tạo mới" button
    Then User look title form "Tạo mới dữ liệu Partner"
    And User look title "Tạo mới dữ liệu Partner"

CRD-02 Verify that it is possible to navigate to the page for creating a new Data with Member
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Member"
    And Click "Tạo mới" button
    Then User look title form "Tạo mới dữ liệu Member"
    And User look title "Tạo mới dữ liệu Member"

CRD-03 Verify that it is possible to navigate to the page for creating a new Data with Value
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Value"
    And Click "Tạo mới" button
    Then User look title form "Tạo mới dữ liệu Value"
    And User look title "Tạo mới dữ liệu Value"

CRD-04 Verify that it is possible to navigate to the page for creating a new Data with Services
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Services"
    And Click "Tạo mới" button
    Then User look title form "Tạo mới dữ liệu Services"
    And User look title "Tạo mới dữ liệu Services"

CRD-05 Verify that it is possible to navigate to the page for creating a new Data with Mission
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Mission"
    And Click "Tạo mới" button
    Then User look title form "Tạo mới dữ liệu Mission"
    And User look title "Tạo mới dữ liệu Mission"

##===================================VALIDATION TEXT CREATE PARTNER===================================
CRD-06 Verify that validation text of "Order" field display when enter data invalid "Order" field
    [Tags]    @smoketest    @regression
    When Go to create data Partner page
    And Enter "text" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

CRD-07 Verify that the "Order" field validation text is displayed when entering data in the "Order" field with invalid quantities
    [Tags]    @smoketest    @regression
    When Go to create data Partner page
    And Enter "number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

##==============================VALIDATION TEXT CREATE DATA============================
CRD-08 Verify that validation text when create new Data with blank "Name" field
    [Tags]    @smoketest    @regression
    When Go to create data Member page
    And Enter "text" in "Name" with ""
    And Enter "text" in "Order" with ""
    Then Required message "Name" displayed under "Xin vui lòng nhập name" field

CRD-09 Verify that validation text of "Order" field display when enter data invalid "Order" field
    [Tags]    @smoketest    @regression
    When Go to create data Member page
    And Enter "text" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

CRD-10 Verify that the "Order" field validation text is displayed when entering data in the "Order" field with invalid quantities
    [Tags]    @smoketest    @regression
    When Go to create data Member page
    And Enter "number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

# ===================================ERROR MESSAGE===================================
CRD-11 Verify that error message display when create new Code with "Mã" is already taken with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create data Member page
    And Enter "order number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with "Partner_01"
    And Enter "text" in textarea "Description" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Tên đã tồn tại" popup

CRD-12 Verify that error message display when create new Code with "Mã" is already taken with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create data Member page
    And Enter "order number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with "Partner_01"
    And Enter "text" in textarea "Description" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Tên đã tồn tại" popup

# ===================================CREATE SUCCESSFULLY===================================
CRD-13 Verify that create new Data with Partner is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create data Partner page
    And Enter information when create data partner
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Dữ liệu"
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-14 Verify that create new Data with Partner is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create data Partner page
    And Enter information when create data partner
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới dữ liệu Partner"
    And User look all field empty when create data Partner
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-15 Verify that create new Data with Member is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create data Member page
    And Enter information when create data with Member
    And Select language with "Vietnam"
    And Enter information when create data with Member
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Dữ liệu"
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-16 Verify that create new Data with Member is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create data Member page
    And Enter information when create data with Member
    And Select language with "Vietnam"
    And Enter information when create data with Member
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới dữ liệu Member"
    And User look all field empty when create data Member
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-17 Verify that create new Data with Value is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create data Value page
    And Enter information when create data with Value
    And Select language with "Vietnam"
    And Enter information when create data with Value
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Dữ liệu"
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-18 Verify that create new Data with Value is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create data Value page
    And Enter information when create data with Value
    And Select language with "Vietnam"
    And Enter information when create data with Value
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới dữ liệu Value"
    And User look all field empty when create data Value
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-19 Verify that create new Data with Services is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create data Services page
    And Enter information when create data with Services
    And Select language with "Vietnam"
    And Enter information when create data with Services
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Dữ liệu"
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-20 Verify that create new Data with Services is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create data Services page
    And Enter information when create data with Services
    And Select language with "Vietnam"
    And Enter information when create data with Services
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới dữ liệu Services"
    And User look all field empty when create data Services
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-21 Verify that create new Data with Mission is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create data Mission page
    And Enter information when create data with Mission
    And Select language with "Vietnam"
    And Enter information when create data with Mission
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách Dữ liệu"
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

CRD-22 Verify that create new Data with Mission is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create data Mission page
    And Enter information when create data with Mission
    And Select language with "Vietnam"
    And Enter information when create data with Mission
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới dữ liệu Mission"
    And User look all field empty when create data Mission
    And Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Tên dữ liệu" table line

# -----------------------------Verify refresh page--------------------------------------
# CRD-23 Verify entered data not showing when Refresh with F5 key
#     [Tags]    @smoketest    @regression
#     When Go to create data Partner page
#     And Enter information when create data
#     And Select language with "Vietnam"
#     And Enter information when create data
#     And Reload Page
#     Then User look "Order" field empty
#     And User look "Name" field empty
#     And User look "Description" field empty

# -----------------------------View list of Data--------------------------------------
CRD-24 Verify that the list of Data Partner can be viewed successfully
    [Tags]    @smoketest    @regression
    When Go to list data Partner page
    Then Show list of "data"

CRD-25 Verify that the list of Data Member can be viewed successfully
    [Tags]    @smoketest    @regression
    When Go to list data Member page
    Then Show list of "data"

CRD-26 Verify that the list of Data Value can be viewed successfully
    [Tags]    @smoketest    @regression
    When Go to list data Value page
    Then Show list of "data"

CRD-27 Verify that the list of Data Services can be viewed successfully
    [Tags]    @smoketest    @regression
    When Go to list data Services page
    Then Show list of "data"

CRD-28 Verify that the list of Data Mission can be viewed successfully
    [Tags]    @smoketest    @regression
    When Go to list data Mission page
    Then Show list of "data"

# CRD-29 Verify that Admin can search an existing Data when entering correct keyword to search box
#     Login to Admin
#     When Click "Thiết lập" menu
#     And Click "Dữ liệu" sub menu
#     And Search "text" in "Tìm kiếm" with "Partner_01"
#     Then Show list of "data"

# CRD-30 Verify that Admin can search an existing Data when entering incorrect keyword to search box
#     Login to Admin
#     When Click "Thiết lập" menu
#     And Click "Dữ liệu" sub menu
#     And Search "text" in "Tìm kiếm" with "_RANDOM_"
#     Then No data are shown

# CRD-31 Verify that Next page and Previous page
#     Login to admin
#     When Click "Thiết lập" menu
#     And Click "Dữ liệu" sub menu
#     And Click ">" to "next" page
#     Log To Console    Danh sách data trang 2
#     Then Show list of "codes"
#     And Click "<" to "prev" page
#     Log To Console    Danh sách data trang 1
#     Then Show list of "codes" 

##=======================VERIFY EDIT DATA================================##
# =============================Navigate to Edit Data page===================================
EDD-01 Verify that it is possible to navigate to the page for edit Data with Partner
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Select Data need to edit
    Then User look title form "pages.Data/Edit"
    And User look title "pages.Data/Edit"

EDD-02 Verify that it is possible to navigate to the page for edit Data with Member
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Member"
    And Select Data need to edit
    Then User look title form "pages.Data/Edit"
    And User look title "pages.Data/Edit"

EDD-03 Verify that it is possible to navigate to the page for edit Data with Value
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Value"
    And Select Data need to edit
    Then User look title form "pages.Data/Edit"
    And User look title "pages.Data/Edit"

EDD-04 Verify that it is possible to navigate to the page for edit Data with Services
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Services"
    And Select Data need to edit
    Then User look title form "pages.Data/Edit"
    And User look title "pages.Data/Edit"

EDD-05 Verify that it is possible to navigate to the page for edit Data with Mission
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    And Click list Data_Type with "Mission"
    And Select Data need to edit
    Then User look title form "pages.Data/Edit"
    And User look title "pages.Data/Edit"

#===================================VALIDATION TEXT EDIT PARTNER===================================
EDD-06 Verify that validation text of "Order" field display when enter data invalid "Order" field
    [Tags]    @smoketest    @regression
    When Go to edit data Partner page
    And Enter "text" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

EDD-07 Verify that the "Order" field validation text is displayed when entering data in the "Order" field with invalid quantities
    [Tags]    @smoketest    @regression
    When Go to edit data Partner page
    And Enter "number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

##==============================VALIDATION TEXT EDIT DATA============================
EDD-08 Verify that validation text when edit Data with blank "Name" field
    [Tags]    @smoketest    @regression
    When Go to edit data Member page
    And Enter "text" in "Name" with ""
    And Enter "text" in "Order" with ""
    Then Required message "Name" displayed under "Xin vui lòng nhập name" field

EDD-09 Verify that validation text of "Order" field display when enter data invalid "Order" field
    [Tags]    @smoketest    @regression
    When Go to edit data Member page
    And Enter "text" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

EDD-10 Verify that the "Order" field validation text is displayed when entering data in the "Order" field with invalid quantities
    [Tags]    @smoketest    @regression
    When Go to edit data Member page
    And Enter "number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with ""
    Then Required message "Order" displayed under "Xin vui lòng chỉ nhập số" field

# ===================================ERROR MESSAGE===================================
EDD-11 Verify that error message display when edit Data with "Name" is already taken with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit data Member page
    And Enter "order number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with "Partner_01"
    And Enter "text" in textarea "Description" with "_RANDOM_"
    And Enter "text" in editor "Content" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Tên đã tồn tại" popup

EDD-12 Verify that error message display when edit with "Name" is already taken with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit data Member page
    And Enter "order number" in "Order" with "_RANDOM_"
    And Enter "text" in "Name" with "Partner_01"
    And Enter "text" in textarea "Description" with "_RANDOM_"
    And Enter "text" in editor "Content" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Tên đã tồn tại" popup

# # ===================================EDIT DATA SUCCESSFULLY===================================
EDD-13 Verify that edit Data with Partner is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit data Partner page
    And Enter information when edit data partner
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Dữ liệu"

EDD-14 Verify that edit Data with Partner is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit data Partner page
    And Enter information when edit data partner
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới dữ liệu Partner"
    And User look all field empty when edit data Partner

EDD-15 Verify that edit Data with Member is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit data Member page
    And Enter information when edit data with Member
    And Select language with "Vietnam"
    And Enter information when edit data with Member
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Dữ liệu"

EDD-16 Verify that edit Data with Member is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit data Member page
    And Enter information when edit data with Member
    And Select language with "Vietnam"
    And Enter information when edit data with Member
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới dữ liệu Member"
    And User look all field empty when edit data Member

EDD-17 Verify that edit Data with Value is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit data Value page
    And Enter information when edit data with Value
    And Select language with "Vietnam"
    And Enter information when edit data with Value
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Dữ liệu"

EDD-18 Verify that edit Data with Value is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit data Value page
    And Enter information when edit data with Value
    And Select language with "Vietnam"
    And Enter information when edit data with Value
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới dữ liệu Value"
    And User look all field empty when edit data Value

EDD-19 Verify that edit Data with Services is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit data Services page
    And Enter information when edit data with Services
    And Select language with "Vietnam"
    And Enter information when edit data with Services
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Dữ liệu"

EDD-20 Verify that edit Data with Services is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit data Services page
    And Enter information when edit data with Services
    And Select language with "Vietnam"
    And Enter information when edit data with Services
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới dữ liệu Services"
    And User look all field empty when edit data Services

EDD-21 Verify that edit Data with Mission is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit data Mission page
    And Enter information when edit data with Mission
    And Select language with "Vietnam"
    And Enter information when edit data with Mission
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Dữ liệu"

EDD-22 Verify that edit Data with Mission is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit data Mission page
    And Enter information when edit data with Mission
    And Select language with "Vietnam"
    And Enter information when edit data with Mission
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới dữ liệu Mission"
    And User look all field empty when edit data Mission

*** Keywords ***
Click list ${name} with "${text}"
    ${element}=    Set Variable    xpath=//div[contains(@class, 'truncate') and text()='${text}']
    Wait Until Element Is Visible    ${element}
    Click    ${element}
    Wait Until Element Spin
    Wait Until Element Spin

User look "${name}" field empty
    ${element}=    Get Element Form Item By Name     ${name}    //input[contains(@class, "ant-input")]
    Element Text Should Be    ${element}    ${EMPTY}

User look textarea "${name}" field empty
    ${element}=               Get Element Form Item By Name     ${name}                       //textarea
    Element Text Should Be    ${element}    ${EMPTY}

User look editor "${name}" field empty
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ce-paragraph")]
  Element Text Should Be    ${element}    ${EMPTY}

User look all field empty when ${name} data ${type}
  User look "Name" field empty
  User look "Order" field empty   
  IF  '${type}' == 'Member'
    User look "Position" field empty
    User look textarea "Description" field empty
    User look editor "Content" field empty
  ELSE IF  '${type}' == 'Value'
    User look textarea "Description" field empty
  ELSE IF  '${type}' == 'Services'
    User look textarea "Description" field empty
  ELSE IF  '${type}' == 'Mission'
    User look textarea "Description" field empty
  END

Show list of "${name}"
    Wait Until Element Spin
    Wait Until Element Spin
    ${elements}=        Get Elements        xpath=//*[contains(@class, "ant-table-row")]
    ${count}=    Set Variable    2
    ${stt}=    Set Variable    1
    Log To Console    =======================List Of ${name}=================================================
    FOR    ${item}    IN    @{elements}
        ${name_data}=        Get Text        //tbody[1]/tr[${count}]/td[1]
        ${order}=            Get Text        //tbody[1]/tr[${count}]/td[2]
        Log To Console        ${stt}. Tên dữ liệu: ${name_data} || Order: ${order}
        Log To Console        ===================================================================================
        ${count}=    Evaluate    ${count} + 1
        ${stt}=    Evaluate    ${stt} + 1
    END
    ${total}=    Evaluate    ${count} - 2
    Log To Console    Tổng số lượng ${name} là: ${total}

Select ${name} need to edit
  ${elements}            Get Elements            xpath=//button[@title="Sửa"]
  ${elementCount}        Get Length            ${elements}
  Click    ${elements}[0]
  Wait Until Element Spin

Go to ${name} data ${type} page
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Dữ liệu" sub menu
    IF  '${type}' == 'Partner'
      Wait Until Element Spin
    ELSE IF  '${type}' != 'Partner'
      Click list Data_Type with "${type}"
    END
    IF  '${name}' == 'create'
      Click "Tạo mới" button
      Wait Until Element Spin
      Sleep    ${SHOULD_TIMEOUT}
    ELSE IF  '${name}' == 'edit'
      Select Data need to edit
      Sleep    2
    ELSE IF  '${name}' == 'list'
      Wait Until Element Spin
      Sleep    ${SHOULD_TIMEOUT}
    END

Select language with "${name}"
    ${element}    Set Variable    //div[text()='${name}']   
    Click    ${element}

Enter information when ${name} data partner
    And Enter "text" in "Name" with "_RANDOM_"
    And Enter "order number" in "Order" with "_RANDOM_"
    And Select file in "Ảnh" with "sieunhando.jpg"

Enter information when ${type} data with ${name}
    And Enter "order number" in "Order" with "_RANDOM_"
    And Select file in "Ảnh" with "sieunhando.jpg"
    And Enter "text" in "Name" with "_RANDOM_"
    IF  '${name}' == 'Member'
      Enter "text" in "Position" with "_RANDOM_"
    END
    And Enter "text" in textarea "Description" with "_RANDOM_"
    IF  '${name}' == 'Member'
      Enter "text" in editor "Content" with "_RANDOM_"
    END

User look title form "${text}"
    ${element}    Set Variable    //h1[@class="text-xl font-bold hidden sm:block" and //h1[text() = "${text}"]]
    Wait Until Element Is Visible    ${element}
    Element Text Should Be    ${element}    ${text}

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