*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down

*** Test Cases ***
SLM-01 Verify that the validation text of "Loại nghỉ phép" field displays when creating a vacation with "Loại nghỉ phép" field empty & '"Lưu và tạo mới" button
  [Tags]                @smoketest               @regression
  Then Login to staff
   When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep    2
#   When Click select "Loại phép" with "Nghỉ phép có lương"
  When Click select "Thời gian" with "Cả ngày"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu và tạo mới" button
  when Required message "Loại phép" displayed under "Xin vui lòng chọn loại phép" field
  Sleep    1
 SLM-02 Verify that the validation text of "Loại nghỉ phép" field displays when creating a leave request with "Loại nghỉ phép" field empty & "Lưu lại" button
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep    2
  When Click select "Thời gian" with "Cả ngày"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu lại" button
  when Required message "Loại phép" displayed under "Xin vui lòng chọn loại phép" field
  
SLM-03 Verify that the validation text of "Thời gian" field displays when creating a leave request with "Thời gian" field empty "Lưu và tạo mới" button
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep   2
  When Click select "Loại phép" with "Nghỉ phép có lương"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "28-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu và tạo mới" button
  when Required message "Thời gian" displayed under "Xin vui lòng chọn thời gian" field
SLM-04 Verify that the validation text of "Thời gian" field displays when creating a leave request with "Thời gian" field empty "Lưu lại" button
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep    2
  When Click select "Loại phép" with "Nghỉ phép có lương"
   When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "28-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu lại" button
  when Required message "Thời gian" displayed under "Xin vui lòng chọn thời gian" field
   Sleep    1
SLM-05 Verify that the validation text of "Ngày nghỉ" field displays when creating a leave requestwith "Ngày nghỉ" field empty "Lưu và tạo mới" button
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep    2
  When Click select "Loại phép" with "Nghỉ phép có lương"
  When Click select "Thời gian" with "Cả ngày"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu và tạo mới" button
  when Required message "Ngày nghỉ" displayed under "Xin vui lòng chọn ngày nghỉ" field
SLM-06 Verify that the validation text of "Ngày nghỉ" field displays when creating a leave request with "Ngày nghỉ" field empty "Lưu lại" button
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep    2
  When Click select "Loại phép" with "Nghỉ phép có lương"
  When Click select "Thời gian" with "Cả ngày"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu lại" button
  when Required message "Ngày nghỉ" displayed under "Xin vui lòng chọn ngày nghỉ" field
SLM-07 Verify that the validation text of "Lí do" field displays when creating a leave request with "Lí do" field empty "Lưu và tạo mới" button
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep    2
  When Click select "Loại phép" with "Nghỉ phép có lương"
  When Click select "Thời gian" with "Cả ngày"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Click "Lưu lại" button
  when Required message "Lý do" displayed under "Xin vui lòng nhập lý do" field
SLM-08 when create a leave request has the same date with existing leave request
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep    2
  When Click select "Loại phép" with "Nghỉ phép không lương"
  When Click select "Thời gian" with "Cả ngày"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu và tạo mới" button
  Sleep    5
  When Click "Huỷ bỏ" button
  When Click "Xóa" button Xoa
  Sleep    5
SLM-10 Verify that create a leave request successful when stafff with no management 
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  sleep  2
  When Click select "Loại phép" with "Nghỉ phép không lương"
  When Click select "Thời gian" with "Cả ngày"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "_RANDOM_"
  when Click "Lưu lại" button
  When User look message "Tạo thành công" popup
  Sleep    5
  Then User look title should be "Chi tiết ngày nghỉ"
  when Click "Quay lại" button
  when Click "Xóa" button Xoa
SLM-11 Verify that create a leave request successful when stafff has management
  Then Login to staff
    When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep  2
  When Click select "Loại phép" with "Nghỉ phép không lương"
  When Click select "Thời gian" with "Chiều"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu lại" button
  When User look message "Tạo thành công" popup
  Sleep    5
  Then User look title should be "Chi tiết ngày nghỉ"
  when Click "Quay lại" button
  when Click "Xóa" button Xoa
SLM-12 Verify that create a leave request successful when choosing "Nghỉ phép không lương"
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add" 
  Sleep  2
  When Click select "Loại phép" with "Nghỉ phép không lương"
  When Click select "Thời gian" with "Cả ngày"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu lại" button
  When User look message "Tạo thành công" popup
  Sleep    5
  Then User look title should be "Chi tiết ngày nghỉ"
    when Click "Quay lại" button
    Sleep    2
  when Click "Xóa" button Xoa
  Sleep    5
SLM-13 Verify that create a vacation successful when choosing "Làm remote"
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep  2
  When Click select "Loại phép" with "Nghỉ phép không lương"
  When Click select "Thời gian" with "Cả ngày"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu lại" button
  When User look message "Tạo thành công" popup
  Sleep    5
  Then User look title should be "Chi tiết ngày nghỉ"
  when Click "Quay lại" button
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  when Click "Xóa" button
SLM-14 Verify that create a vacation successful when choosing "Nghỉ phép có lương"
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  Sleep  2
  ${before}=        Get Text    //div[contains(@class, 'text-xl')]
  When Click select "Loại phép" with "Nghỉ phép có lương"
  When Click select "Thời gian" with "Chiều"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "28-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu và tạo mới" button
  Sleep    8
  ${after}=        Get Text    //div[contains(@class, 'text-xl')]
  
    IF    '${before}' == '${after}'
    Log To Console    Hai chuỗi giống nhau
    ELSE
    Log To Console   Hai chuỗi khác nhau
    END
SLM-15 Verify that create a vacation successful when the holidays are over
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"
  sleep  2
   ${before}=        Get Text             //div[contains(@class, 'text-xl')]
  When Click select "Loại phép" with "Làm remote"
  When Click select "Thời gian" with "Chiều"
  When Enter dayoff in "Ngày nghỉ" datefrom "Ngày bắt đầu" with "26-06-2023" dateto "Ngày kết thúc" with "28-06-2023"
  when Enter "text" in textarea "Lý do" with "ốm"
  when Click "Lưu và tạo mới" button
  When User look message "Tạo thành công" popup
  Sleep    8
  ${after}=        Get Text             //div[contains(@class, 'text-xl')]
  
    IF    '${before}'=='${after}'
    Log To Console    Hai chuỗi giống nhau
    ELSE
    Log To Console   Hai chuỗi khác nhau
    END

SLM-16 Verify that Staff can delete leave request successfully when not approve
  Then Login to staff
  when Click "Xóa" button Xoa
  Sleep    2
# SLM-17 Verify that unable to create leave request when where is no connection
  Then Login to staff
  When Click "Tạo mới" sub menu to "/vn/dayoff/add"

 
SLM-18 Verify that user can view the list of leave request successfully
  Then Login to staff
  When User look "Họ và tên" column span
  When User look "Quản lý" column th
  When User look "Loại phép" column span
  When User look "Thời gian" column span
  When User look "Ngày nghỉ" column span
  When User look "Trạng thái" column span
  When User look "Ngày phê duyệt" column span
  When User look "Phê duyệt bởi" column th
  When User look "Hoạt động" column th
      
  
