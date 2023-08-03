*** Settings ***
Resource                ../keywords/common.robot
Test Setup              Setup
Test Teardown           Tear Down

** Variables **
${class_rejected}    w-5 h-5 fill-red-500
${class_approved}    w-5 h-5 fill-green-500

*** Test Cases ***

## ============================NAVIGAVE TO CREATE LEAVE DATE===========================================
STA-01 Verify that it is possible to navigate to the page for create leave date
    Login to Staff
    When Click "Tạo mới" button
    Then User look title "Tạo mới ngày nghỉ"

## ============================VERIFY VALIDATION TEXT===========================================
STA-02 Verify that Create Leave Management unsuccessfully because no select "Loại phép" 
    Go to create leave date page
    And Click select "Thời gian" with "Cả ngày"
    And Enter leave date in "Ngày bắt đầu" with "11-07-2023"
    And Enter leave date in "Ngày kết thúc" with "14-07-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu lại" button
    Then Required message "Loại phép" displayed under "Xin vui lòng chọn loại phép" field

STA-03 Verify that Create Leave Management unsuccessfully because no select "Thời gian" 
    Go to create leave date page
    And Click select "Thời gian" with "Cả ngày"
    And Delele select "Thời gian" field
    Then Required message "Thời gian" displayed under "Xin vui lòng chọn thời gian" field

STA-04 Verify that Create Leave Management unsuccessfully because no select "Ngày nghỉ"  
    Go to create leave date page
    And Click select "Loại phép" with "Nghỉ phép có lương"
    And Click select "Thời gian" with "Cả ngày"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu lại" button
    Then Required message "Ngày nghỉ" displayed under "Xin vui lòng chọn ngày nghỉ" field

STA-05 Verify that Create Leave Management unsuccessfully because no enter "Lý do" 
    Go to create leave date page
    And Click select "Loại phép" with "Nghỉ phép có lương"
    And Click select "Thời gian" with "Cả ngày"
    And Enter leave date in "Ngày bắt đầu" with "11-07-2023"
    And Enter leave date in "Ngày kết thúc" with "14-07-2023"
    And Enter "text" in textarea "Lý do" with "${EMPTY}"
    And Click "Lưu lại" button
    Then Required message "Lý do" displayed under "Xin vui lòng nhập lý do" field

STA-06 Verify that Create Leave Management unsuccessfully because empty all field
    Go to create leave date page
    And Click "Lưu lại" button
    Then Required message "Loại phép" displayed under "Xin vui lòng chọn loại phép" field
    And Required message "Thời gian" displayed under "Xin vui lòng chọn thời gian" field
    And Required message "Ngày nghỉ" displayed under "Xin vui lòng chọn ngày nghỉ" field
    And Required message "Lý do" displayed under "Xin vui lòng nhập lý do" field

## ============================CREATE LEAVE MANAGEMENT SUCCESSFULL===========================================
STA-07 Verify that Create leave management successfully with "Làm remote" & "Lưu lại" button
    Go to create leave date page
    And Click select "Loại phép" with "Làm remote"
    And Click select "Thời gian" with "Cả ngày"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "01-08-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách nghỉ phép"
    And Click on the "Xóa" button in the "Họ và tên" table line

STA-08 Verify that Create leave management successfully with "Làm remote" & "Lưu và tạo mới" button
    Go to create leave date page
    ${leave_date_before}    Get_Leave_date with "Ngày phép còn lại"
    And Click select "Loại phép" with "Làm remote"
    And Click select "Thời gian" with "Cả ngày"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "01-08-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới ngày nghỉ"
    ${leave_date_after}    Get_Leave_date with "Ngày phép còn lại"
    # Kiểm tra xem số lượng ngày nghỉ có thay đổi hay không
    # ----------------------------------------------------------
    Should Be Equal    ${leave_date_before}    ${leave_date_after}
    # ----------------------------------------------------------
    When Click "Huỷ bỏ" button
    And Click on the "Xóa" button in the "Họ và tên" table line

STA-09 Verify that Create leave management successfully with "Nghỉ phép không lương" & "Lưu lại" button
    Go to create leave date page
    And Click select "Loại phép" with "Nghỉ phép không lương"
    And Click select "Thời gian" with "Chiều"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "31-07-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách nghỉ phép"
    And Click on the "Xóa" button in the "Họ và tên" table line

STA-10 Verify that Create leave management successfully with "Nghỉ phép không lương" & "Lưu và tạo mới" button
    Go to create leave date page
    ${leave_date_before}    Get_Leave_date with "Ngày phép còn lại"
    And Click select "Loại phép" with "Nghỉ phép không lương"
    And Click select "Thời gian" with "Chiều"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "31-07-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới ngày nghỉ"
    ${leave_date_after}    Get_Leave_date with "Ngày phép còn lại"
    # Kiểm tra xem số lượng ngày nghỉ có thay đổi hay không
    # ----------------------------------------------------------
    Should Be Equal    ${leave_date_before}    ${leave_date_after}
    # ---------------------------------------------------------- 
    When Click "Huỷ bỏ" button
    And Click on the "Xóa" button in the "Họ và tên" table line

STA-11 Verify that Create leave management successfully with "Nghỉ phép có lương" & "Lưu lại" button
    Go to create leave date page
    And Click select "Loại phép" with "Nghỉ phép có lương"
    And Click select "Thời gian" with "Sáng"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "31-07-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    And User look title "Danh sách nghỉ phép"
    And Click on the "Xóa" button in the "Họ và tên" table line

STA-12 Verify that Create leave management successfully with "Nghỉ phép có lương" & "Lưu và tạo mới" button
    Go to create leave date page
    ${leave_date_before}    Get_Leave_date with "Ngày phép còn lại"
    And Click select "Loại phép" with "Nghỉ phép có lương"
    And Click select "Thời gian" with "Sáng"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "31-07-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    And User look title "Tạo mới ngày nghỉ"
    ${leave_date_after}    Get_Leave_date with "Ngày phép còn lại"
    # Kiểm tra xem số lượng ngày nghỉ có thay đổi hay không
    # ----------------------------------------------------------
    Should Not Be Equal    ${leave_date_before}    ${leave_date_after}
    # ----------------------------------------------------------
    
# ============================ERROR MESSAGE===========================================
STA-13 Verify that error message display when create new leave management with the leave date has been registered & "Lưu lại" button
    Go to create leave date page
    And Click select "Loại phép" with "Nghỉ phép có lương"
    And Click select "Thời gian" with "Sáng"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "31-07-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Ngày nghỉ đã được đăng ký" popup

STA-14 Verify that error message display when create new leave management with the leave date has been registered & "Lưu và tạo mới" button
    Go to create leave date page
    And Click select "Loại phép" with "Nghỉ phép có lương"
    And Click select "Thời gian" with "Sáng"
    And Enter leave date in "Ngày bắt đầu" with "31-07-2023"
    And Enter leave date in "Ngày kết thúc" with "31-07-2023"
    And Enter "text" in textarea "Lý do" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Ngày nghỉ đã được đăng ký" popup
    When Click "Huỷ bỏ" button
    And Click on the "Xóa" button in the "Họ và tên" table line

## ============================VIEW LIST STAFF LEAVE MANAGEMENT==========================================
STA-15 Verify that staff can view the list of created leave date successfully
    Login to Staff
    Then Show list of "created" leave date

STA-16 Verify that staff can view the list of pending leave date successfully
    Login to Staff
    When Filter the list of holidays with the status of "Pending"
    Then Show list of "pending" leave date

STA-17 Verify that staff can view the list of approved leave date successfully
    Login to Staff
    When Filter the list of holidays with the status of "Approved"
    Then Show list of "approved" leave date

STA-18 Verify that staff can view the list of rejected leave date successfully
    Login to Staff
    When Filter the list of holidays with the status of "Rejected"
    Then Show list of "rejected" leave date

STA_19 Verify can double click on a leave request pending approval to display the leave details when managing that staff
    Login to Staff
    When Select the leave date status as Pending
    Then User look title "Chi tiết ngày nghỉ"
    And User can view the details of the holiday Pending

STA_20 Check the ability to double-click on an approved leave list to display the details
    Login to Staff
    When Select the leave date status as Approved
    Then User look title "Chi tiết ngày nghỉ"
    And User can view the details of the holiday Approved

STA_21 Check the ability to double-click on a rejected leave list to display the details
    Login to Staff
    When Select the leave date status as Rejected
    Then User look title "Chi tiết ngày nghỉ"
    And User can view the details of the holiday Rejected

*** Keywords ***

Login to Staff
  Enter "email" in "Tên đăng nhập" with "staff@gmail.com"
  Enter "text" in "Mật khẩu" with "Tester@123"
  Click "Đăng nhập" button
  User look message "Thành công" popup

Go to create leave date page
    Login to Staff
    When Click "Tạo mới" button
    Wait Until Element Spin
    Sleep    ${SHOULD_TIMEOUT}

Select the leave date status as ${status}
    Filter the list of holidays with the status of "${status}"
    ${elements}=        Get Elements         //span[text()='Hoàng Diệu']
    IF     '${status}'=='Pending'
      Click   ${elements}[0]    left    2
    ELSE IF     '${status}'=='Approved'
      Click   ${elements}[0]    left    2
    ELSE IF     '${status}'=='Rejected'
      Click   ${elements}[0]    left    2
    END
    Wait Until Element Spin

Select the leave date status as ${status} when not managing that staff
    Filter the list of holidays with the status of "${status}"
    ${elements}=        Get Elements         //span[text()='Nguyễn Ngọc Đức']
    Click   ${elements}[0]    left    2
    Wait Until Element Spin

Filter the list of holidays with the status of "${status}"
    Click    //thead/tr[1]/th[7]/div[1]/span[2]/*[1]
    Click    //span[contains(text(),'${status}')]
    Click "Tìm kiếm" button

User can view the details of the holiday ${name}
    Log To Console    Chi tiết ngày nghỉ
    
    ${code}    Get Text    //tbody/tr[1]/td[1]
    Log To Console    Mã: ${code}
    Log To Console    ==================================

    ${fullname}    Get Text    //tbody/tr[2]/td[1]//div[1]/span[1]
    Log To Console    Họ và tên: ${fullname}
    Log To Console    ==================================

    ${manager}    Get Text    //tbody/tr[3]/td[1]//div[1]/span[1]
    Log To Console    Quản lý: ${manager}
    Log To Console    ==================================

    ${type}    Get Text    //tbody/tr[4]/td[1]
    Log To Console    Loại phép: ${type}
    Log To Console    ==================================

    ${time}    Get Text    //tbody/tr[5]/td[1]
    Log To Console    Thời gian: ${time}
    Log To Console    ==================================

    ${leave_date}    Get Text    //tbody/tr[6]/td[1]
    Log To Console    Ngày nghỉ: ${leave_date}
    Log To Console    ==================================

    ${reason}    Get Text    //tbody/tr[7]/td[1]
    Log To Console    Lý do: ${reason}
    Log To Console    ==================================
    
    IF  '${name}' == 'Pending'
        Log To Console    ==========================================
    ELSE IF  '${name}' == 'Approved'
        Verify status
    ELSE IF  '${name}' == 'Rejected'
        Verify status
        ${reason_rejected}    Get Text    //tbody/tr[11]/td[1]
        Log To Console    Lý do từ chối: ${reason_rejected}
    END

Verify status
    ${class_attribute}    Get Attribute    //tbody/tr[8]/td[1]/*[1]    class
    IF  '${class_attribute}' == '${class_approved}'
        ${status}=    Set Variable    Đã phê duyệt
    ELSE IF  '${class_attribute}' == '${class_rejected}'
            ${status}=    Set Variable    Từ chối phê duyệt
    END
    Log To Console    Trạng thái: ${status}
    Log To Console    ==================================
        
    ${approvated_at}    Get Text    //tbody/tr[9]/td[1]
    Log To Console    Ngày phê duyệt: ${approvated_at}
    Log To Console    ==================================

    ${approvated_by}    Get Text    //tbody/tr[10]/td[1]//div[1]/span[1]
    Log To Console    Phê duyệt bởi: ${approvated_by}
    Log To Console    ==================================

Fillter the leave list by leave date with start date: ${start_date} and end date: ${end_date}
    ${element}    Get Element    //thead/tr[1]/th[6]/div[1]/span[2]/*[1]
    Click    ${element}
    And Enter leave date in "Ngày bắt đầu" with "${start_date}"
    And Enter leave date in "Ngày kết thúc" with "${end_date}"
    Press Keys    xpath=//input[@placeholder="Ngày kết thúc"]    Enter
    And Click "Tìm kiếm" button
    Wait Until Element Spin
    Wait Until Element Spin

Fillter the leave list by approvated date with start date: ${start_date} and end date: ${end_date}
    ${element}    Get Element    //thead/tr[1]/th[8]/div[1]/span[2]/*[1]
    Click    ${element}
    And Enter leave date in "Ngày bắt đầu" with "${start_date}"
    And Enter leave date in "Ngày kết thúc" with "${end_date}"
    Press Keys    xpath=//input[@placeholder="Ngày kết thúc"]    Enter
    And Click "Tìm kiếm" button
    Wait Until Element Spin
    Wait Until Element Spin

# Hiển thị danh sách ngày nghỉ đã tạo
Show list of "${name}" leave date
    Wait Until Element Spin
    ${elements}=          Get Elements        xpath=//*[contains(@class, "ant-table-row")]
    ${user_count}=        Set Variable        2
    ${stt}=    Set Variable    1
    FOR    ${item}    IN    @{elements}
      ${username}=              Get Text        //tbody/tr[${user_count}]/td[2]/div[1]/span[1]
      
      ${element_manager}=       Get Elements    //tbody/tr[${user_count}]/td[3]/div[1]/span[1]
      ${manager}                Get Text        ${element_manager}[0]     
      
      ${element_type}=          Get Elements    //tbody/tr[${user_count}]/td[4]
      ${type}=                  Get Text        ${element_type}[0]

      ${element_time}=          Get Elements    //tbody/tr[${user_count}]/td[5]
      ${time}=                  Get Text        ${element_time}[0]

      ${element_leave_date}=    Get Elements    //tbody/tr[${user_count}]/td[6]
      ${leave_date}=            Get Text        ${element_leave_date}[0]
      
      ${approvated_date}=       Get Text        //tbody/tr[${user_count}]/td[8]
      ${approvated_by}=         Get Text        //tbody/tr[${user_count}]/td[9]
    
      IF  '${approvated_date}' == ''
        ${status}=    Set Variable    Đang chờ phê duyệt
      END
      
      IF     '${name}'=='approved'
        ${status}=    Set Variable    Đã phê duyệt
      ELSE IF    '${name}'=='rejected'
        ${status}=    Set Variable    Từ chối phê duyệt
      ELSE IF    '${name}'=='pending'
        ${status}=    Set Variable    Đang chờ phê duyệt
      ELSE IF    '${name}'=='created'
        ${status}=    Set Variable    ${EMPTY}
      END

      Log To Console        ${stt}. Họ và tên: ${username} | Quản lý: ${manager} | Loại phép: ${type} | Thời gian: ${time} | Ngày nghỉ: ${leave_date} | Trạng thái: ${status} | Ngày phê duyệt: ${approvated_date} | Người phê duyệt: ${approvated_by}
      Log To Console        ================================================================================================================================================================================================================================================================
      ${user_count}=    Evaluate    ${user_count} + 1
      ${stt}=    Evaluate    ${stt} + 1
    END
    ${total}=    Evaluate    ${user_count} - 2
    IF     '${name}'=='created'
      Log To Console    Total number of holidays ${name}: ${total}
    ELSE IF    '${name}'=='approved'
      Log To Console    Total number of ${name} holidays: ${total}
    ELSE IF    '${name}'=='rejected'
      Log To Console    Total number of days off ${name} approval: ${total}
    ELSE IF    '${name}'=='pending'
      Log To Console    Total number of days off ${name} approval: ${total}
    END
  
User look button "${button}"
    ${element}    Set Variable    xpath=//button[@title = "${button}"]
    ${text}       Get Text        ${element}
    Element Text Should Be    ${element}    ${text}    

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

Delele select "${name}" field
    ${elements}=               Get Elements        //span[@class='ant-select-clear'] 
    Click    ${elements}[0]

# Nhập ngày bắt đầu nghỉ hoặc ngày kết thúc nghỉ
Enter leave date in "${field}" with "${text}"            # NHẬP NGÀY NGHỈ BẮT ĐẦU VÀ KẾT THÚC
  ${text}=                  Get Random Text                   date                          ${text}
  ${element}               Set Variable            xpath=//input[@placeholder="${field}"]
  Click                     ${element}
  Clear Text                ${element}
  Fill Text                 ${element}                        ${text}

# Lấy chuỗi text "Ngày phép còn lại"
Get_Leave_date with "${date}"
    ${element}=        Set Variable     //div[contains(text(), '${date}')]
    Wait Until Element Is Visible    ${element}
    ${text}    Get Text    ${element}
    [Return]    ${text}

User look "${name}" field should be empty
    ${element}        Set Variable       xpath=//span[text()='${name}']
    Wait Until Element Is Visible                    ${element}
    Element Text Should Be        ${element}        ${name}

User look leave date empty with "${field}"        #CREATE STAFF LEAVE MANAGEMENT
    ${element}               Set Variable            xpath=//input[@placeholder="${field}"]
    Wait Until Element Is Visible            ${element}
    Element Text Should Be                   ${element}            ${EMPTY}

User look all field should be empty
    And User look "Chọn loại phép" field should be empty
    And User look "Chọn thời gian" field should be empty
    And User look leave date empty with "Ngày bắt đầu"
    And User look leave date empty with "Ngày kết thúc"
    And User look textarea "Lý do" field empty