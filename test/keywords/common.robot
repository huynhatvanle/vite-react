*** Settings ***
Library     Browser
Library     FakerLibrary    locale=en_IN
Library     String


*** Variables ***
${BROWSER}              chromium
${HEADLESS}             ${True}
${BROWSER_TIMEOUT}      60 seconds
${SHOULD_TIMEOUT}       0.1 seconds

${URL_DEFAULT}          http://localhost:5173
${STATE}                Evaluate    json.loads('''{}''')    json


*** Keywords ***
Login to admin
    Enter "email" in "Tên đăng nhập" with "admin@admin.com"
    Enter "text" in "Mật khẩu" with "Password1!"
    Click "Đăng nhập" button
    User look message "Thành công" popup

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
    ${symbol}=    Set Variable    RANDOM
    ${new_text}=    Set Variable
    ${containsS}=    Get Regexp Matches    ${text}    @(.+)@    1
    ${cntS}=    Get length    ${containsS}
    ${contains}=    Get Regexp Matches    ${text}    ${symbol}
    ${cnt}=    Get length    ${contains}
    IF    ${cntS} > 0
        ${new_text}=    Set Variable    ${STATE["${containsS[0]}"]}
        ${symbol}=    Set Variable    @${containsS[0]}@
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

Required message under "${text}" field empty
    Element Text Should Be    //*[contains(@class,"ant-empty-description")]    ${text}

Required message under "${text}" field user
    Element Should Be Visible    //div[contains(@class,"ant-select-item-option-content")]    ${text}

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

Enter "${name}" add in "${text}" with "${id}"
    Fill Text    xpath=//*[contains(@class, "ant-select-selection-search")]/input[@id="${id}"]    ${text}

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

Click "${text}" pagination
    Click
    ...    xpath=//div[contains(@class,"left")]//div[contains(@class,"ant-select-selector")]
    Click    xpath=//div[contains(@class,"ant-select-item-option-content") and text() = "${text}"]

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

Click "${text}" button by "${name}"
    # Wait Until Element Spin
    ${element}=    Get Element Table Item By Name    ${name}    //button[@title = "${text}"]
    Click    ${element}
    Click Confirm To Action
    Scroll By    ${None}

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
    Click    xpath=//li[contains(@class, "menu") and descendant::span[contains(text(), "${text}")]]

Click "${text}" sub menu to "${url}"
    Wait Until Element Spin
    Click    xpath=//a[contains(@class, "sub-menu") and descendant::span[contains(text(), "${text}")]]
    ${curent_url}=    Get Url
    Should Contain    ${curent_url}    ${URL_DEFAULT}${url}

User look message "${message}" popup
    ${contains}=    Get Regexp Matches    ${message}    @(.+)@    1
    ${cnt}=    Get length    ${contains}
    IF    ${cnt} > 0
        ${message}=    Replace String    ${message}    @${contains[0]}@    ${STATE["${contains[0]}"]}
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

Click on "${text}" Role
    Click    xpath=//div[contains(@class, "truncate") and contains(text(), "${text}")]

Table on "${name}" User
    Click    //*[contains(@class, "ant-table-row")]//*[contains(text(), "${name}")]/ancestor::tr
    # /ancestor::tr

Enter "${name}" placeholder with "${text}"
    ${element}=    Set Variable    xpath=//div[contains(@class,"relative")]/input[contains(@placeholder, "${name}")]
    Fill Text    ${element}    ${text}

Click on "${text}" pagination
    Click
    ...    xpath=//div[contains(@class,"right flex")]//button[contains(@aria-label,"${text}") and not (contains(@aria-label,"_"))]

Click on "${text}" doublepagination
    Click    xpath=//div[contains(@class,"right flex")]//button[contains(@aria-label,"${text}")]

Required message "${name}" displayed under "${text}" field1
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //*[contains(@class, "ant-form-item-explain-error") and text()="${text}"]
    Element Text Should Be    ${element}    ${text}

Click "${text}" menuUser
    Click    xpath=//li[contains(@class,"flex")]/span[contains(text(),"${text}")]

Click "${text}" list
    Click    xpath=//*[contains(@class,"ant-empty-description")and contains(text(),"${text}")]

Enter "${name}" add with "${text}"
    # ${element}=    Set Variable
    # ...    xpath=//div[contains(@class,"ant-select-selector")]//input[contains(@value,"${name}")]
    Fill Text    xpath=//*[contains(@class, "ant-select-selection-search")]/input[@id="positionCode"]    ${text}

#### Team ####

Click "${text}" button action table
    Click    xpath=//*tr[1]/td[4]/div[1]//button[@title = "${text}"]
    Click Confirm To Action
    Scroll By    ${None}

Click action "${text}" with "${name}" in table
    Click
    ...    xpath=//*[contains(@class, "ant-table-cell") and text()="${name}"]/../*[contains(@class, "ant-table-cell")]/div[1]//button[@title = "${text}"]
    Click Confirm To Action
    Scroll By    ${None}

Enter select "${name}" with "${text}"
    ${text}=    Get Random Text    Text    ${text}
    ${element}=    Get Element Form Item By Name    ${name}    //*[contains(@class, "ant-select-show-arrow")]
    Click    ${element}
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //*[contains(@class, "ant-select-selection-search-input")]
    Fill Text    ${element}    ${text}
    Press Keys    ${element}    Enter
    ${cnt}=    Get Length    ${text}
    IF    ${cnt} > 0    Set Global Variable    ${STATE["${name}"]}    ${text}

Get Element Table Form Item By Name
    [Arguments]    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "ant-table-thead")]/tr/${xpath}

Get Element Pagination
    [Arguments]    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "flex sm:flex-wrap justify-center duration-300 transition-all")]/${xpath}

Find "${name}" table
    ${element}=    Get Element Table Form Item By Name    th[contains(text(), "${name}")]
    Element Text Should Be    ${element}    ${name}

Find "${name}" table1
    ${element}=    Get Element Table Form Item By Name    th/div/span[contains(text(), "${name}")]
    Element Text Should Be    ${element}    ${name}

Find search "${text}"
    Click    xpath=//*[@placeholder="Tìm kiếm"]
    Fill Text    xpath=//*[@placeholder="Tìm kiếm"]    ${text}

Search no data
    Element Text Should Be
    ...    xpath=//tbody/tr[contains(@class, "ant-table-placeholder")]/td[contains(@class, "ant-table-cell")]/div
    ...    Trống

Search have data
    Element Should Not Be Visible
    ...    xpath=//tbody/tr[contains(@class, "ant-table-placeholder")]/td[contains(@class, "ant-table-cell")]/div

Click "${text}" pagination to "${page}"
    ${element}=    Get Element Pagination    button[@aria-label="${text}"]
    Click    ${element}
    ${element1}=    Get Element Pagination    button[contains(@class, "bg-blue-600")]
    Element Text Should Be    ${element1}    ${page}

Check title "${text}" page
    Element Text Should Be    xpath=//*[contains(@class, "text-xl font-bold hidden sm:block")]    ${text}

Card count <tr> "${text}"
    Click
    ...    xpath=//div[contains(@class,"left")]//div[contains(@class,"ant-select-selector")]
    Click    xpath=//div[contains(@class,"ant-select-item-option-content") and text() = "${text}"]
    ${elements}=    Set Variable    xpath=//tbody/tr
    ${row_count}=    Get Element Count    ${elements}
    Should Be Equal    ${text}    ${row_count}
    ###

Enter dayoff in "${name}" dateFrom "${dateFrom}" with "${text}" dateTo "${dateTo}" with "${text1}"
    ${text}=    Get Random Text    date    ${text}
    ${text1}=    Get Random Text    date    ${text1}
    ${element}=    Get Element Form Item By Name
    ...    ${name}
    ...    //*[contains(@class, "ant-picker-input")]/input[@placeholder="${dateFrom}"]
    Click    ${element}
    Clear Text    ${element}
    Fill Text    ${element}    ${text}
    ${element2}=    Get Element Form Item By Name
    ...    ${name}
    ...    //*[contains(@class, "ant-picker-input")]/input[@placeholder="${dateTo}"]
    Click    ${element2}
    Clear Text    ${element2}
    Fill Text    ${element2}    ${text1}
    Press Keys    ${element2}    Tab
    Press Keys    ${element2}    Tab

Get Title
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//div/div/h1[text()="${name}"]${xpath}

Check title "${text}" in page
    ${element}=    Get Title    ${text}
    Element Text Should Be    ${element}    ${text}

Get dayoff
    RETURN    xpath=//div[contains(@class, 'max-w-2xl')]/div[contains(@class, 'text-xl')]

Check remaining leave days in dayoff with "${type}"
    ${day}=    Get dayoff
    ${text}=    Get Text    ${day}
    When Click select "Loại phép" with "${type}"
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-03-2023" dateTo "Ngày kết thúc" with "30-03-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    Sleep    5
    Then Check title "Chi tiết ngày nghỉ" in page
    When Click "Tạo mới" sub menu to "/vn/dayoff/add"
    ${day1}=    Get dayoff
    ${text1}=    Get Text    ${day1}
    IF    '${type}' == 'Nghỉ phép có lương'
        Should Not Be Equal    ${text}    ${text1}
    END

    IF    '${type}' == 'Nghỉ phép không lương' or '${type}' == 'Làm remote'
        Should Be Equal    ${text}    ${text1}
    END

Get Delete Dayoff
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//*[contains(@class, "ant-table-row")]/td[text()="${name}"]/../${xpath}

Click delete dayoff "${name}"
    ${element}=    Get Delete Dayoff    ${name}    /button[contains(@title,"Xóa")]
    Click    ${element}
    Click    //button[contains(@type, "button")]/span[contains(text(),"Đồng ý")]

Get Title Table Dayoff
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//th[contains(@aria-label, "${name}")]${xpath}

Check title table "${text}" in dayoff
    ${element}=    Get Title Table Dayoff    ${text}
    Element Text Should Be    ${element}    ${text}

Get Title Table Dayoff Child
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//th[contains(text(), "${name}")]${xpath}

Check title table child "${text}" in dayoff
    ${element}=    Get Title Table Dayoff Child    ${text}
    Element Text Should Be    ${element}    ${text}

Get Pagination
    [Arguments]    ${name}    ${xpath}=${EMPTY}
    RETURN    xpath=//div[contains(@class, "ant-select-selector")]/span[contains(text(), "${name}")]

Click Pagination "${name}" change "${text}"
    ${element}=    Get Pagination    ${name}
    Click    ${element}
    Click    //div[contains(@class,"ant-select-item ant-select-item-option")]/div[contains(text(),"${text}")]
    Sleep    5

Click Previous Page
    Click    //button[contains(@aria-label,"prev") and not(contains(@aria-label, "_"))]

Click First Page
    Click    //button[contains(@aria-label,"prev_10")]

Click Next Page
    Click    //button[contains(@aria-label,"next") and not(contains(@aria-label, "_"))]

Click Last Page
    Click    //button[contains(@aria-label,"next_10")]
