*** Settings ***
Library     Browser
Library     FakerLibrary    locale=en_IN
Library     String
Resource    ../testcases/user.robot
Library     XML


*** Variables ***
${BROWSER}              chromium
${HEADLESS}             ${False}
${BROWSER_TIMEOUT}      60 seconds
${SHOULD_TIMEOUT}       0.1 seconds

${URL_DEFAULT}          http://localhost:5173
${STATE}                Evaluate    json.loads('''{}''')    json


*** Keywords ***
Login to admin
    Enter "email" in "Tên đăng nhập" with "admin_balan@getnada.com"
    Enter "text" in "Mật khẩu" with "Ari123456#"
    Click "Đăng nhập" button
    User look message "Đăng nhập thành công" popup
#### Setup e Teardown

Setup
    Set Browser Timeout    ${BROWSER_TIMEOUT}
    New Browser    ${BROWSER}    headless=${HEADLESS}
    New Page    ${URL_DEFAULT}
    ${STATE}=    Evaluate    json.loads('''{}''')    json

Tear Down
    Close Browser    ALL

Wait Until Element Is Visible
    [Arguments]    ${locator}    ${message}=${EMPTY}    ${timeout}=${BROWSER_TIMEOUT}
    Wait For Elements State    ${locator}    visible    ${timeout}    ${message}

Wait Until Element Is Not Exist
    [Arguments]    ${locator}    ${message}=${EMPTY}    ${timeout}=${BROWSER_TIMEOUT}
    Wait For Elements State    ${locator}    detached    ${timeout}    ${message}

Element Should Be Exist
    [Arguments]    ${locator}    ${message}=${EMPTY}    ${timeout}=${SHOULD_TIMEOUT}
    Wait For Elements State    ${locator}    attached    ${timeout}    ${message}

Element Should Be Visible
    [Arguments]    ${locator}    ${message}=${EMPTY}    ${timeout}=${SHOULD_TIMEOUT}
    Wait For Elements State    ${locator}    visible    ${timeout}    ${message}

Element Text Should Be
    [Arguments]    ${locator}    ${expected}    ${message}=${EMPTY}    ${ignore_case}=${EMPTY}
    Get Text    ${locator}    equal    ${expected}    ${message}

Element Should Not Be Visible
    [Arguments]    ${locator}    ${message}=${EMPTY}    ${timeout}=${SHOULD_TIMEOUT}
    Wait For Elements State    ${locator}    hidden    ${timeout}    ${message}

###    -----    Form    -----    ###

Get Random Text
    [Arguments]    ${type}    ${text}
    ${symbol}=    Set Variable    _RANDOM_
    ${new_text}=    Set Variable
    ${containsS}=    Get Regexp Matches    ${text}    _@(.+)@_    1
    ${cntS}=    Get length    ${containsS}
    ${contains}=    Get Regexp Matches    ${text}    ${symbol}
    ${cnt}=    Get length    ${contains}
    IF    ${cntS} > 0
        ${new_text}=    Set Variable    ${STATE["${containsS[0]}"]}
        ${symbol}=    Set Variable    _@${containsS[0]}@_
    ELSE IF    ${cnt} > 0 and '${type}' == 'test name'
        ${random}=    FakerLibrary.Sentence    nb_words=3
        ${words}=    Split String    ${TEST NAME}    ${SPACE}
        ${new_text}=    Set Variable    ${words[0]} ${random}
    ELSE IF    ${cnt} > 0 and '${type}' == 'number'
        ${new_text}=    FakerLibrary.Random Int
        ${new_text}=    Convert To String    ${new_text}
    ELSE IF    ${cnt} > 0 and '${type}' == 'percentage'
        ${new_text}=    FakerLibrary.Random Int    max=100
        ${new_text}=    Convert To String    ${new_text}
    ELSE IF    ${cnt} > 0 and '${type}' == 'paragraph'
        ${new_text}=    FakerLibrary.Paragraph
    ELSE IF    ${cnt} > 0 and '${type}' == 'email'
        ${new_text}=    FakerLibrary.Email
    ELSE IF    ${cnt} > 0 and '${type}' == 'phone'
        ${new_text}=    FakerLibrary.Random Int    min=55555555    max=999999999999
        ${new_text}=    Convert To String    ${new_text}
    ELSE IF    ${cnt} > 0 and '${type}' == 'color'
        ${new_text}=    FakerLibrary.Safe Hex Color
    ELSE IF    ${cnt} > 0 and '${type}' == 'date'
        ${new_text}=    FakerLibrary.Date    pattern=%d-%m-%Y
    ELSE IF    ${cnt} > 0 and '${type}' == 'word'
        ${new_text}=    FakerLibrary.Sentence    nb_words=2
    ELSE IF    ${cnt} > 0
        ${new_text}=    FakerLibrary.Sentence
    END
    ${cnt}=    Get Length    ${text}
    IF    ${cnt} > 0
        ${text}=    Replace String    ${text}    ${symbol}    ${new_text}
    END
    RETURN    ${text}

Get Element Form Item By Name
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "ant-form-item-label")]/label[text()="${name}"]/../../*[contains(@class, "ant-form-item")]${xpath}

Required message "${name}" displayed under "${text}" field
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-form-item-explain-error")]
    Element Text Should Be    ${element}    ${text}

Enter "${type}" in "${name}" with "${text}"
    ${text}=    Get Random Text    ${type}    ${text}
    ${element}=    Get Element Form Item By Name    ${name}    //input[contains(@class, "ant-input")]
    Clear Text    ${element}
    Fill Text    ${element}    ${text}    True
    ${cnt}=    Get Length    ${text}
    IF    ${cnt} > 0    Set Global Variable    ${STATE["${name}"]}    ${text}

Enter "${type}" in textarea "${name}" with "${text}"
    ${text}=    Get Random Text    ${type}    ${text}
    ${element}=    Get Element Form Item By Name    ${name}    //textarea
    Clear Text    ${element}
    Fill Text    ${element}    ${text}
    ${cnt}=    Get Length    ${text}
    IF    ${cnt} > 0    Set Global Variable    ${STATE["${name}"]}    ${text}

Enter date in "${name}" with "${text}"
    ${text}=    Get Random Text    date    ${text}
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-picker-input")]/input
    Click    ${element}
    Clear Text    ${element}
    Fill Text    ${element}    ${text}
    Press Keys    ${element}    Tab
    Press Keys    ${element}    Tab
    ${cnt}=    Get Length    ${text}
    IF    ${cnt} > 0    Set Global Variable    ${STATE["${name}"]}    ${text}

Click select "${name}" with "${text}"
    ${text}=    Get Random Text    Text    ${text}
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-select-show-arrow")]
    Click    ${element}
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //*[contains(@class, "ant-select-selection-search-input")]
    Fill Text    ${element}    ${text}
    Click    xpath=//*[contains(@class, "ant-select-item-option") and @title="${text}"]
    ${cnt}=    Get Length    ${text}
    IF    ${cnt} > 0    Set Global Variable    ${STATE["${name}"]}    ${text}

Enter "${type}" in editor "${name}" with "${text}"
    ${text}=    Get Random Text    ${type}    ${text}
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ce-paragraph")]
    Clear Text    ${element}
    Fill Text    ${element}    ${text}

Select file in "${name}" with "${text}"
    ${element}=    Get Element Form Item By Name    ${name}    //input[@type = "file"]
    Upload File By Selector    ${element}    test/upload/${text}

Click radio "${text}" in line "${name}"
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //*[contains(@class, "ant-radio-button-wrapper")]/span[contains(text(), "${text}")]
    Click    ${element}

Click switch "${name}" to be activated
    ${element}=    Get Element Form Item By Name    ${name}    //button[contains(@class, "ant-switch")]
    Click    ${element}

Click tree select "${name}" with "${text}"
    ${text}=    Get Random Text    Text    ${text}
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-tree-select")]
    Click    ${element}
    Fill Text    ${element}//input    ${text}
    Click    xpath=//*[contains(@class, "ant-select-tree-node-content-wrapper") and @title="${text}"]

Click assign list "${list}"
    ${words}=    Split String    ${list}    ,${SPACE}
    FOR    ${word}    IN    @{words}
        Click    xpath=//*[contains(@class, "ant-checkbox-wrapper")]/*[text()="${word}"]
    END
    Click    xpath=//*[contains(@class, "ant-transfer-operation")]/button[2]

###    -----    Table    -----    ###

Get Element Item By Name
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "item-text") and contains(text(), "${name}")]/ancestor::*[contains(@class, "item")]${xpath}

Click on the "${text}" button in the "${name}" item line
    Wait Until Element Spin
    ${element}=    Get Element Item By Name    ${STATE["${name}"]}    //button[@title = "${text}"]
    Click    ${element}
    Click Confirm To Action

Get Element Table Item By Name
    [Arguments]    ${name}    ${xpath}
    RETURN    xpath=//*[contains(@class, "ant-table-row")]//*[contains(text(), "${name}")]/ancestor::tr${xpath}

Click on the "${text}" button in the "${name}" table line
    Wait Until Element Spin
    ${element}=    Get Element Table Item By Name    ${STATE["${name}"]}    //button[@title = "${text}"]
    Click    ${element}
    Click Confirm To Action

###    -----    Tree    -----    ###

Get Element Tree By Name
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "ant-tree-node-content-wrapper") and @title = "${name}"]/*[contains(@class, "group")]${xpath}

Click on the previously created "${name}" tree to delete
    Wait Until Element Spin
    ${element}=    Get Element Tree By Name    ${STATE["${name}"]}
    Scroll To Element    ${element}
    Mouse Move Relative To    ${element}    0
    Click    ${element}//*[contains(@class, "la-trash")]
    Click Confirm To Action

Click on the previously created "${name}" tree to edit
    Wait Until Element Spin
    ${element}=    Get Element Tree By Name    ${STATE["${name}"]}
    Click    ${element}

###    -----    Element    -----    ###

Click "${text}" button
    Click    xpath=//button[@title = "${text}"]
    Click Confirm To Action
    Scroll By    ${None}

Click "${text}" tab button
    Click    xpath=//*[contains(@class, "ant-tabs-tab-btn") and contains(text(), "${text}")]

Select on the "${text}" item line
    Wait Until Element Spin
    ${element}=    Get Element Item By Name    ${text}
    Click    ${element}

Click "${text}" menu
    Click    xpath=//li[contains(@class, "items-center") and descendant::span[contains(text(), "${text}")]]

# Click "${text}" menuUser
#    Click    xpath=//li[contains(@class,"flex")]/span[contains(text(),"${text}")]

Click "${text}" sub menu to "${url}"
    Wait Until Element Spin
    Click    xpath=//a[contains(@class, "sub-menu") and descendant::span[contains(text(), "${text}")]]
    ${curent_url}=    Get Url
    Should Contain    ${curent_url}    ${URL_DEFAULT}${url}

User look message "${message}" popup
    ${contains}=    Get Regexp Matches    ${message}    _@(.+)@_    1
    ${cnt}=    Get length    ${contains}
    IF    ${cnt} > 0
        ${message}=    Replace String    ${message}    _@${contains[0]}@_    ${STATE["${contains[0]}"]}
    END
    Element Text Should Be    id=swal2-html-container    ${message}
    ${element}=    Set Variable    xpath=//*[contains(@class, "swal2-confirm")]
    ${passed}=    Run Keyword And Return Status
    ...    Element Should Be Visible    ${element}
    IF    '${passed}' == 'True'    Click    ${element}
    Wait Until Element Spin

Click Confirm To Action
    ${element}=    Set Variable    xpath=//*[contains(@class, "ant-popover")]//*[contains(@class, "ant-btn-primary")]
    ${count}=    Get Element Count    ${element}
    IF    ${count} > 0
        Click    ${element}
        Sleep    ${SHOULD_TIMEOUT}
    END

Wait Until Element Spin
    ${element}=    Set Variable    xpath=//*[contains(@class, "ant-spin-spinning")]
    ${count}=    Get Element Count    ${element}
    IF    ${count} > 0    Wait Until Element Is Not Exist    ${element}

Click "${text}" menuBalence
    Click    xpath=//ul[contains(@class, "menu")]//span[contains(text(),"${text}")]

Check title "${text}" page
    Element Text Should Be    xpath=//div[contains(@class,"verflow-y-auto")]/h1    ${text}

Click "${text1}" myprofile "${text2}"
    Click    xpath=//div[contains(@class,"flex items-center")]//img[contains(@alt,"${text1}")]
    Click    xpath=//span[contains(@class,"ant-dropdown-menu-title-content")]//div[contains(text(),"${text2}")]

Click profile "${text}"
    Upload File By Selector    //input[@type="file"]    D:/GitHub/vite-react/test/upload/Goku3.jpg

DoubleClick edit
    Click    xpath=//*[contains(@class, "ant-table-row")][1]    left    2

Click select role "${name}" with "${text}"
    Click    xpath=//div[contains(@class,"ant-select-selector")]/span[contains(@title,"${text}")]

Click pagination "${number}" user
    Click
    ...    xpath=//div[contains(@class,"left")]//div[contains(@class,"ant-select-selector")]
    Click    xpath=//div[contains(@class,"ant-select-item-option-content") and text() = "${number}"]
    Wait Until Element Spin
    ${data}=    Set Variable    xpath=//tbody/tr[contains(@class,"ant-table-row")]
    ${count}=    Get Element Count    ${data}
    Should Be Equal    "${number}"    "${count}"

Click pagination "${text}" next page
    Click
    ...    xpath=//div[contains(@class,"right flex")]//button[contains(@aria-label,"${text}") and not (contains(@aria-label,"_"))]

Enter "${name}" placeholder with "${text}"
    ${element}=    Set Variable    xpath=//div[contains(@class,"relative")]/input[contains(@placeholder, "${name}")]
    Fill Text    ${element}    ${text}

Check role disable
    Click    xpath=//div[contains(@class,"col-span-12 col-store")]//div[contains(@class,"ant-select-disabled")]

# supplier

Check Add Supplier with "${phone}"
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Tên nhà cung cấp" with "nhà cung cấp rau sạch"
    When Enter "phone" in "Số fax" with "_RANDOM_"
    When Click select "Tỉnh/Thành phố" with "Tỉnh Tuyên Quang"
    When Click select "Quận/Huyện" with "Huyện Lâm Bình"
    When Click select "Phường/Xã" with "Xã Bình An"
    When Enter "Text" in "Địa chỉ cụ thể" with "1 Đống Đa"
    When Enter "Text" in "Họ tên đại diện" with "Nguyễn Hoàng"
    When Enter "email" in "Email đại diện" with "_RANDOM_"
    When Enter "phone" in "Số điện thoại đại diện" with "${phone}"
    When Click "Lưu" button
    Then User look message "Tạo nhà cung cấp thành công." popup
    ${xpath}=    Set Variable    xpath=//tr[contains(@class,"ant-table-row")][1]/td[5]
    ${phonenumber}=    Get Text    ${xpath}
    Should Be Equal    ${phonenumber}    ${phone}

Enter Search with "${text}"
    ${element}=    Set Variable    //input[contains(@id,"search")]
    Clear Text    ${element}
    Fill Text    ${element}    ${text}    True
    Sleep    2
    Element Should Be Visible    //div[contains(@class,"bg-gray-100") and contains(text(),"Trống")]
    # IF    '${name}' == 'valid'
    #    Element Should Not Be Visible    //div[contains(@class,"bg-gray-100") and contains(text(),"Trống")]
    # END
    # IF    '${name}' == 'invalid'
    #    Element Should Be Visible    //div[contains(@class,"bg-gray-100") and contains(text(),"Trống")]
    # END

Check Enter Search "${name}" with "${text}"
    ${element}=    Set Variable    //input[contains(@id,"search")]
    Clear Text    ${element}
    Fill Text    ${element}    ${text}    True
    Sleep    5
    IF    '${name}' == 'Mã nhà cung cấp'
        ${count}=    Set Variable    1
    END
    IF    '${name}' == 'Tên nhà cung cấp'
        ${count}=    Set Variable    2
    END
    IF    '${name}' == 'Người đại diện'
        ${count}=    Set Variable    4
    END
    IF    '${name}' == 'Số điện thoại'
        ${count}=    Set Variable    5
    END
    IF    '${name}' == 'Address'
        ${count}=    Set Variable    3
    END
    ${xpath}=    Set Variable    xpath=//tr[contains(@class,"ant-table-row")][1]/td[${count}]
    ${data}=    Get Text    ${xpath}
    Should Be Equal    ${data}    ${text}

Enter field blanks in "${name}"
    ${element}=    Get Element Form Item By Name    ${name}    //input[contains(@class, "ant-input")]
    Clear Text    ${element}

Click field blanks Address with "${name}"
    ${element}=    Set Variable
    ...    //*[contains(@class, "ant-form-item-label")]/label[text()="${name}"]/../../../*[contains(@class, "ant-form-item")]/div/div/div/div
Check Url "${url}" Page
    ${url_current}=    Get Url
    Should Be Equal    ${url_current}    ${URL_DEFAULT}${url}

Check displayed under "${name}" field
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-form-item-explain-error")]
    Element Should Not Be Visible    ${element}

Click "${name}" Eye icon
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //input[contains(@class, "ant-input")]//following-sibling::*
    Click    ${element}
    Should Be Equal    first    second

Click on the "${text}" button in the "${name}" table line1
    Wait Until Element Spin
    ${element}=    Get Element Form Item By Name    ${STATE["${name}"]}    //input[contains(@class, "ant-input")]
    Log To Console    ${element}
    Click    ${element}
    Click Confirm To Action

Check empty in "${name}"
    ${element}=    Get Element Form Item By Name    ${name}    //input[contains(@class, "ant-input")]
    Should Be Empty    ${element}

Clear select "${name}"
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-select-show-arrow")]
    Hover    ${element}
    Click
    ...    //*[contains(@class, "ant-form-item-label")]/label[text()="${name}"]/../../../*[contains(@class, "ant-form-item")]/div/div/div/div/span[contains(@class,"ant-select-clear")]

# Thanh

Click Pagination dropdown with number page "${number}"
    Click    xpath=//span[contains(@class, "ant-select-selection-item")]
    Click    xpath=//div[contains(@class, "ant-select-item-option-content") and contains(text(), "${number}")]
    Wait Until Element Spin
    ${elements}=    Set Variable    //tbody/tr[contains(@class, "ant-table-row-level-0")]
    ${row_count}=    Get Element Count    ${elements}
    # Log To Console    The number of <tr> elements in <tbody> is ${row_count}
    # Log To Console    Display list : ${row_count}
    # Log To Console    Display list : ${number}
    Should Be Equal    '${row_count}'    '${number}'
    Log To Console    list shows the quantity corresponding: number page:${number} equal list shows:${row_count}

Get Element Pagination
    [Arguments]    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "flex sm:flex-wrap justify-center duration-300 transition-all")]/${xpath}

Click change "${text}" the page and pagination to "${page}"
    Click    xpath=//button[@aria-label = "${text}"]
    ${element}=    Get Element Pagination    button[contains(@class, "bg-teal-900")]
    Element Text Should Be    ${element}    ${page}

Check "${text}" in the supplier list table
    Element Text Should Be    xpath=//*[contains(@scope, "col") and text()="${text}" ]    ${text}
    Log To Console    ${text}

Double click "${text}" in supplier record
    Click    //tbody/tr[contains(@class, "ant-table-row-level-0")]/td[contains(text(), "${text}")]    left    2

check "${name}" in input and "${text}" in table is displayed on the first row
    # [Arguments]    ${value}
    ${columns}=    Get Elements    xpath=//*[contains(@scope, "col")]
    ${index}=    Set Variable    0
    FOR    ${column}    IN    @{columns}
        ${column_text}=    Get Text    ${column}
        ${index}=    Evaluate    ${index} + 1
        IF    "${column_text}" == "${text}"    BREAK
    END
    Log To Console    Vị trí của cột : ${index}
    ${element}=    Get Text    //tbody/tr[contains(@class, "ant-table-row-level-0")][1]/td[${index}]
    Log To Console    element: ${element}
    Log To Console    value: ${STATE["${name}"]}
    Should Be Equal    ${STATE["${name}"]}    ${element}
###    Login & Store    ###

Click element input "${name}"
    ${element}=    Get Element Form Item By Name    ${name}    //input[contains(@class, "ant-input")]
    Click    ${element}

Check Url "${url}" Page
    ${url_current}=    Get Url
    Should Be Equal    ${url_current}    ${URL_DEFAULT}${url}

Check displayed under "${name}" field
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-form-item-explain-error")]
    Element Should Not Be Visible    ${element}

Click "${name}" Eye icon
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //input[contains(@class, "ant-input")]//following-sibling::*
    Click    ${element}
    Should Be Equal    first    second

Click on the "${text}" button in the "${name}" table line
    Wait Until Element Spin
    ${element}=    Get Element Form Item By Name    ${STATE["${name}"]}    //input[contains(@class, "ant-input")]
    Click    ${element}
    Click Confirm To Action

Check empty in "${name}"
    ${element}=    Get Element Form Item By Name    ${name}    //input[contains(@class, "ant-input")]
    Should Be Empty    ${element}

Clear select "${name}"
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-select-show-arrow")]
    Hover    ${element}
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //*[contains(@class, "ant-select-clear")]
    Click    ${element}

Search input "${text}"
    Clear Text    xpath=//input[contains(@placeholder, "Tìm kiếm")]
    Fill Text    xpath=//input[contains(@placeholder, "Tìm kiếm")]    ${text}
    Sleep    3
    Wait Until Element Spin

Search no data
    Element Text Should Be
    ...    xpath=//*[contains(@class, "ant-table-placeholder")]/td[contains(@class, "ant-table-cell")]/div
    ...    Trống

Search have data
    Element Should Not Be Visible
    ...    xpath=//*tbody/tr*[contains(@class, "ant-table-placeholder")]/td[contains(@class, "ant-table-cell")]/div

Check "${name}" in edit and "${text}" in table is displayed on the first row
    # [Arguments]    ${value}
    ${columns}=    Get Elements    xpath=//*[contains(@scope, "col")]
    ${index}=    Set Variable    0
    FOR    ${column}    IN    @{columns}
        ${column_text}=    Get Text    ${column}
        ${index}=    Evaluate    ${index} + 1
        IF    "${column_text}" == "${text}"    BREAK
    END
    ${element}=    Get Text    //tbody/tr[contains(@class, "ant-table-row-level-0")][1]/td[${index}]
    Should Be Equal    ${STATE["${name}"]}    ${element}

Double click "${text}"
    Click    //tbody/tr[contains(@class, "ant-table-row-level-0")]/td[contains(text(), "${text}")]    left    2

Click pagination dropdown "${number}"
    Click    //*[contains(@class, "pagination")]//div[contains(@class, "ant-select-selector")]
    Click    xpath=//div[contains(@class,"ant-select-item-option-content") and text() = "${number}"]
    Wait Until Element Spin
    ${elements}=    Set Variable    xpath=//tbody/tr[contains(@class, "ant-table-row ant-table-row-level-0")]
    ${row_count}=    Get Element Count    ${elements}
    Should Be Equal    "${number}"    "${row_count}"

Get Element Pagination
    [Arguments]    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "flex sm:flex-wrap justify-center duration-300 transition-all")]/${xpath}

Click and check "${button}" in pagination to "${page}"
    ${element}=    Get Element Pagination    button[@aria-label="${button}"]
    Click    ${element}
    ${element1}=    Get Element Pagination    button[contains(@class, "bg-teal-900")]
    Element Text Should Be    ${element1}    ${page}

Check address in the input equal or not address of "${text}" table
    ${Province}=    Get Text
    ...    xpath= //*[contains(@class, "ant-form-item-label")]/label[text()="Tỉnh/Thành phố"]/../../*[contains(@class, "ant-form-item")]//span[contains(@class, "ant-select-selection-item")]
    ${District}=    Get Text
    ...    xpath= //*[contains(@class, "ant-form-item-label")]/label[text()="Quận/Huyện"]/../../*[contains(@class, "ant-form-item")]//span[contains(@class, "ant-select-selection-item")]
    ${Ward}=    Get Text
    ...    xpath= //*[contains(@class, "ant-form-item-label")]/label[text()="Phường/Xã"]/../../*[contains(@class, "ant-form-item")]//span[contains(@class, "ant-select-selection-item")]
    ${Street}=    Get Text
    ...    xpath= //*[contains(@class, "ant-form-item-label")]/label[text()="Địa chỉ cụ thể"]/../../*[contains(@class, "ant-form-item")]//input[contains(@class, "ant-input")]
    ${dia_chi}=    Set Variable    ${Street}, ${Ward}, ${District}, ${Province}
    Click "Lưu" button
    User look message "Chỉnh sửa nhà cung cấp thành công." popup
    ${columns}=    Get Elements    xpath=//*[contains(@scope, "col")]
    ${index}=    Set Variable    0
    FOR    ${column}    IN    @{columns}
        ${column_text}=    Get Text    ${column}
        ${index}=    Evaluate    ${index} + 1
        IF    "${column_text}" == "Địa chỉ"    BREAK
    END
    ${element1}=    Get Element Count
    ...    xpath=//tbody/tr[contains(@class, "ant-table-row-level-0")][1]/td[${index}]/div/*[contains(@class, "w-4 h-4 mt-1 ml-1 text-black") and @id="Layer_1"]
    IF    ${element1} > 0
        Hover
        ...    //tbody/tr[contains(@class, "ant-table-row-level-0")][1]/td[3]/div/*[contains(@class, 'w-4 h-4 mt-1 ml-1 text-black') and @id='Layer_1']
        ${element}=    Get Text    //div[contains(@class, "ant-tooltip-inner")]
    ELSE
        ${element}=    Get Text    //tbody/tr[contains(@class, "ant-table-row-level-0")][1]/td[${index}]
    END
    Should Be Equal    ${element}    ${dia_chi}

Click "${text}" menu1
    Click    //li[contains(@class, "my-3") and descendant::span[contains(text(), "${text}")]]

    ${columns}=    Get Elements    xpath=//*[contains(@scope, "col")]
    ${i}=    Set Variable    0
    FOR    ${column}    IN    @{columns}
        ${column_text}=    Get Text    ${column}
        ${i}=    Evaluate    ${i} + 1
        IF    "${column_text}" == "${text}"    BREAK
    END

    ${columns}=    Get Elements    xpath=//tr[contains(@class, "ant-table-row ant-table-row-level-0")]/td[${i}]
    ${index}=    Set Variable    0
    FOR    ${column}    IN    @{columns}
        ${column_text}=    Get Text    ${column}
        IF    "${text_input}" in "${column_text}"
            Log To Console    ${column_text}
        ELSE
            ${index}=    Evaluate    ${index}+1
            BREAK
        END
    END
    Should Be Equal    ${index}    0
###    ###    ###
