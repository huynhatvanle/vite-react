*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

## ============================Navigate Edit Post Type page======================================================
EDPT_01 Verify that it is possible to navigate to the page for Edit Name Post Type
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Post" sub menu
    And Click on the "Sửa" button in "News" at Post Type
    Then User look title "pages.PostType/Edit"

##===========================Validation text=====================================================================
EDPT_02 Verify that validation text when Edit Name Post Type with blank "Name" field & "Lưu lại" button
    When Go to edit name post type
    And Enter "text" in "Name" with "${EMPTY}"
    And Click "Lưu lại" button
    Then Required message "Name" displayed under "Xin vui lòng nhập name" field

EDPT_03 Verify that validation text when Edit Name Post Type with blank "Name" field & "Lưu và tạo mới" button
    When Go to edit name post type
    And Enter "text" in "Name" with "${EMPTY}"
    And Click "Lưu và tạo mới" button
    Then Required message "Name" displayed under "Xin vui lòng nhập name" field

EDPT_04 Verify that validation text when Edit Name Post Type with blank "Name" field & Press Enter Key
    When Go to edit name post type
    And Enter "text" in "Name" with "${EMPTY}"
    And Press "Enter" Key
    Then Required message "Name" displayed under "Xin vui lòng nhập name" field

##==============================Edit Name Post Type Successfully=========================================
EDPT_05 Verify that Edit Name Post Type successfully when change name & "Lưu lại" button
    When Go to edit name post type
    And Enter "text" in "Name" with "Projects"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách post"

EDPT_06 Verify that Edit Name Post Type successfully when change name & Press Enter key
    When Go to edit name post type
    And Enter "text" in "Name" with "Projects"
    And Press "Enter" Key
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách post"

EDPT_07 Verify that Edit Name Post Type successfully when change name & "Lưu và tạo mới" button
    When Go to edit name post type
    And Enter "text" in "Name" with "Projects"
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách nghỉ phép"

## ---------------------Navigate to Create Post page-------------------------------------------------------
CRP-01 Verify that it is possible to navigate to the page for creating a new Post with Projects
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Post" sub menu
    And Click "Tạo mới" button
    Then User look title form "Tạo mới post Projects"
    And User look title "Tạo mới post Projects"

CRP-02 Verify that it is possible to navigate to the page for creating a new Post with News
    [Tags]    @smoketest    @regression
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Post" sub menu
    And Click list Post_Type with "News"
    And Click "Tạo mới" button
    Then User look title form "Tạo mới post News"
    And User look title "Tạo mới post News"

#===================================VALIDATION TEXT-------------------------------------------------
CRP-03 Verify that validation text when create new Post with blank "Name" field
    [Tags]    @smoketest    @regression
    When Go to create post Projects page
    And Enter "text" in "Name" with ""
    And Enter "text" in "Slug" with ""
    Then Required message "Name" displayed under "Xin vui lòng nhập name" field

CRP-04 Verify that validation text when create new Post with blank "Slug" field
    [Tags]    @smoketest    @regression
    When Go to create post Projects page
    And Enter "text" in "Slug" with ""
    And Enter "text" in "Name" with ""
    Then Required message "Slug" displayed under "Xin vui lòng nhập slug" field

# # ========================================ERROR MESSAGE========================================
CRP-05 Verify that error message display when create new Post with "Name" is already taken with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create post Projects page
    And Enter "text" in "Name" with "Automation Testing"
    And Enter "text" in "Slug" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "common.Post.name is already taken" popup

CRP-06 Verify that error message display when create new Post with "Name" is already taken with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create post Projects page
    And Enter "text" in "Name" with "Automation Testing"
    And Enter "text" in "Slug" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "common.Post.name is already taken" popup

CRP-07 Verify that error message display when create new Post with "Name" is already taken with Press Key Enter
    [Tags]    @smoketest    @regression
    When Go to create post Projects page
    And Enter "text" in "Name" with "Automation Testing"
    And Enter "text" in "Slug" with "_RANDOM_"
    And Press "Enter" Key
    Then User look message "common.Post.name is already taken" popup

# ========================================CREATE SUCCESSFULLY========================================
CRP-08 Verify that create new Post with Project is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create post Projects page
    Enter information when create post
    Select language with "Vietnam"
    Enter information when create post
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách post"
    And Click on the "Xóa" button in the "Tên Post" table line

CRP-09 Verify that create new Post with Project is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create post Projects page
    Enter information when create post
    Select language with "Vietnam"
    Enter information when create post
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới post Projects"
    And User look all field empty when create post
    When Click "Huỷ bỏ" button
    And Click on the "Xóa" button in the "Tên Post" table line

CRP-10 Verify that create new Post with News is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to create post News page
    Enter information when create post
    Select language with "Vietnam"
    Enter information when create post
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách post"
    And Click on the "Xóa" button in the "Tên Post" table line

CRP-11 Verify that create new Post with News is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to create post News page
    Enter information when create post
    Select language with "Vietnam"
    Enter information when create post
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới post News"
    And User look all field empty when create post
    When Click "Huỷ bỏ" button
    And Click on the "Xóa" button in the "Tên Post" table line

# # # ========================================Verify refresh page========================================
# # CRP-12 Verify entered data not showing when Refresh with F5 key
# #     [Tags]    @smoketest    @regression
# #     When Go to create post Projects page
# #     And Enter information when create post
# #     And Reload Page
# #     Then User look "Created At" field empty
# #     And User look "Name" field empty
# #     And User look "Slug" field empty
# #     And User look "Description" field empty
# #     And User look "Content" field empty

# # ========================================View list of Post========================================
CRP-13 Verify that the list of Post with Projects can be viewed successfully
    [Tags]    @smoketest    @regression
    When Go to list post Projects page
    Then Show list of "post"

CRP-14 Verify that the list of Post with News can be viewed successfully
    [Tags]    @smoketest    @regression
    When Go to list post News page
    Then Show list of "post"

# CRP-15 Verify that Admin can search an existing Post when entering correct keyword to search box
#     [Tags]    @smoketest    @regression
#     When Go to list post Projects page
#     And Search "text" in "Tìm kiếm" with "Automation Testing"
#     Then Show list of "post"

# CRP-16 Verify that Admin can search an existing Post when entering incorrect keyword to search box
#     [Tags]    @smoketest    @regression
#     When Go to list post Projects page
#     And Search "text" in "Tìm kiếm" with "_RANDOM_"
#     Then No post are shown

CRP-17 Verify that Admin can view the next/previous when click on corresponding button in pagination navigate
    [Tags]    @smoketest    @regression
    When Go to list post Projects page
    And Click ">" to "next" page
    Log To Console    Danh sách post trang 2
    Then Show list of "post"
    And Click "<" to "prev" page
    Log To Console    Danh sách post trang 1
    Then Show list of "post"

##============================EDIT POST=====================================================================
EDP-01 Verify that it is possible to navigate to the page for Edit Name Post Type
    [Tags]    @smoketest    @regression
    Login to admin
    And Click "Thiết lập" menu
    And Click "Post" sub menu
    And Select Post need to edit
    Then User look title "pages.Post/Edit"
    And User look title form "pages.Post/Edit"

# #===================================VALIDATION TEXT-------------------------------------------------
EDP-02 Verify that validation text when Edit Post with blank "Name" field
    [Tags]    @smoketest    @regression
    When Go to edit post Projects page
    And Enter "text" in "Name" with ""
    And Enter "text" in "Slug" with ""
    Then Required message "Name" displayed under "Xin vui lòng nhập name" field

EDP-03 Verify that validation text when Edit Post with blank "Slug" field
    [Tags]    @smoketest    @regression
    When Go to edit post Projects page
    And Enter "text" in "Slug" with ""
    And Enter "text" in "Name" with ""
    Then Required message "Slug" displayed under "Xin vui lòng nhập slug" field

# # ========================================ERROR MESSAGE========================================
EDP-04 Verify that error message display when Edit Post with "Name" is already taken with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit post Projects page
    And Enter "text" in "Name" with "Automation Testing"
    And Enter "text" in "Slug" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "common.Post.name is already taken" popup

EDP-05 Verify that error message display when Edit Post with "Name" is already taken with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit post Projects page
    And Enter "text" in "Name" with "Automation Testing"
    And Enter "text" in "Slug" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "common.Post.name is already taken" popup

EDP-06 Verify that error message display when Edit Post with "Name" is already taken with Press Key Enter
    [Tags]    @smoketest    @regression
    When Go to edit post Projects page
    And Enter "text" in "Name" with "Automation Testing"
    And Enter "text" in "Slug" with "_RANDOM_"
    And Press "Enter" Key
    Then User look message "common.Post.name is already taken" popup

# # ========================================EDIT POST SUCCESSFULLY========================================
EDP-07 Verify that Edit Post with Project is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit post Projects page
    Enter information when edit post
    Select language with "Vietnam"
    Enter information when edit post
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách post"

EDP-08 Verify that Edit Post with Project is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit post Projects page
    Enter information when edit post
    Select language with "Vietnam"
    Enter information when edit post
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới post Projects"
    And User look all field empty when edit post

EDP-09 Verify that Edit Post with News is successful & "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to edit post News page
    Enter information when edit post
    Select language with "Vietnam"
    Enter information when edit post
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách post"

EDP-10 Verify that Edit Post with News is successful & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to edit post News page
    Enter information when edit post
    Select language with "Vietnam"
    Enter information when edit post
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới post News"
    And User look all field empty when edit post

*** Keywords ***
###========================CREATE POST====================================================
Click list ${name} with "${text}"
    ${element}=    Set Variable    xpath=//div[contains(@class, 'truncate') and text()='${text}']
    Wait Until Element Is Visible    ${element}
    Click    ${element}
    Wait Until Element Spin
    Wait Until Element Spin

Click on the "${text}" button in "${name}" at Post Type
  Wait Until Element Spin
  ${element}=               Get Elements           //button[@title = "${text}"]
  IF  '${name}' == 'Projects'
      Click                     ${element}[0]
  ELSE IF  '${name}' == 'News'
      Click                     ${element}[1]
  END
  Click Confirm To Action

Press "${enter}" Key
    ${element}=               Get Element Form Item By Name     Name                       //input[contains(@class, "ant-input")]
    Press Keys                ${element}                        ${enter}

Enter information when ${name} post
    And Enter date in "Created At" with "01-10-2023"
    And Select file in "Thumbnail Url" with "image.jpg"
    And Enter "name" in "Name" with "_RANDOM_"
    And Enter "test name" in "Slug" with "_RANDOM_"
    And Enter "text" in textarea "Description" with "_RANDOM_"
    And Enter "word" in editor "Content" with "_RANDOM_"

User look "${name}" field empty
    ${element}=    Get Element Form Item By Name     ${name}    //input[contains(@class, "ant-input")]
    Element Text Should Be    ${element}    ${EMPTY}

User look textarea "${name}" field empty
    ${element}=               Get Element Form Item By Name     ${name}                       //textarea
    Element Text Should Be    ${element}    ${EMPTY}

User look date in "${name}" field empty
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-picker-input")]/input
  Element Text Should Be    ${element}    ${EMPTY}

User look editor "${name}" field empty
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ce-paragraph")]
  Element Text Should Be    ${element}    ${EMPTY}

User look all field empty when ${name} post
  User look date in "Created At" field empty
  User look "Name" field empty
  User look "Slug" field empty
  User look textarea "Description" field empty
  User look editor "Content" field empty

Select language with "${name}"
    ${element}    Set Variable    //div[text()='${name}']   
    Click    ${element}

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

Show list of "${name}"
    Wait Until Element Spin
    Wait Until Element Spin
    ${elements}=        Get Elements        xpath=//*[contains(@class, "ant-table-row")]
    ${count}=    Set Variable    2
    ${stt}=    Set Variable    1
    Log To Console    =======================List Of ${name}=================================================
    FOR    ${item}    IN    @{elements}
        ${name_post}=       Get Text        //tbody[1]/tr[${count}]/td[1]
        ${slug}=            Get Text        //tbody[1]/tr[${count}]/td[2]
        Log To Console        ${stt}. Tên Post: ${name_post} || Slug: ${slug}
        Log To Console        ===================================================================================
        ${count}=    Evaluate    ${count} + 1
        ${stt}=    Evaluate    ${stt} + 1
      END
    ${total}=    Evaluate    ${count} - 2
    Log To Console    Tổng số lượng ${name} là: ${total}

Select ${name} need to edit
  ${elements}            Get Elements            xpath=//button[@title="Sửa"]
  ${elementCount}        Get Length            ${elements}
  Click    ${elements}[2]
  Wait Until Element Spin 

Go to edit name post type
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Post" sub menu
    And Click on the "Sửa" button in "Projects" at Post Type
    Sleep    2

Go to ${name} post ${type} page
    Login to Admin
    When Click "Thiết lập" menu
    And Click "Post" sub menu
    IF  '${type}' == 'Projects'
      Wait Until Element Spin
    ELSE IF  '${type}' == 'News'
      Click list Post_Type with "${type}"
    END
    IF  '${name}' == 'create'
      Click "Tạo mới" button
    ELSE IF  '${name}' == 'edit'
      Select Post need to edit
    ELSE IF  '${name}' == 'list'
      Wait Until Element Spin
    END
    Wait Until Element Spin
    Sleep    ${SHOULD_TIMEOUT}

Click "${icon}" to "${next}" page
    ${element}=    Set Variable    //button[@aria-label="${next}"]
    Wait Until Element Is Visible    ${element}
    Click    ${element}
    Wait Until Element Spin