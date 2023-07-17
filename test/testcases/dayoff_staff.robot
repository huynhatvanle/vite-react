*** Settings ***
Resource            ../keywords/common.robot
Library             Collections

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
SLM-04 Verify that the validation text of "Loại nghỉ phép" field displays when creating a vacation with "Loại nghỉ phép" field empty "Lưu và tạo mới" button
    When Go to page create data
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-06-2023" dateTo "Ngày kết thúc" with "28-06-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu và tạo mới" button
    Then Required message "Loại phép" displayed under "Xin vui lòng chọn loại phép" field

SLM-04 Verify that the validation text of "Loại nghỉ phép" field displays when creating a leave request with "Loại nghỉ phép" field empty "Lưu lại" button
    When Go to page create data
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-06-2023" dateTo "Ngày kết thúc" with "28-06-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then Required message "Loại phép" displayed under "Xin vui lòng chọn loại phép" field

SLM-05 Verify that the validation text of "Thời gian" field displays when creating a leave request with "Thời gian" field empty "Lưu và tạo mới" button
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-06-2023" dateTo "Ngày kết thúc" with "27-06-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu và tạo mới" button
    Then Required message "Thời gian" displayed under "Xin vui lòng chọn thời gian" field

SLM-05 Verify that the validation text of "Thời gian" field displays when creating a leave request with "Thời gian" field empty "Lưu lại" button
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-06-2023" dateTo "Ngày kết thúc" with "27-06-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then Required message "Thời gian" displayed under "Xin vui lòng chọn thời gian" field

SLM-06 Verify that the validation text of "Ngày nghỉ" field displays when creating a leave requestwith "Ngày nghỉ" field empty "Lưu và tạo mới" button
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Click select "Thời gian" with "Cả ngày"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu và tạo mới" button
    Then Required message "Ngày nghỉ" displayed under "Xin vui lòng chọn ngày nghỉ" field

SLM-06 Verify that the validation text of "Ngày nghỉ" field displays when creating a leave requestwith "Ngày nghỉ" field empty "Lưu lại" button
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Click select "Thời gian" with "Cả ngày"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then Required message "Ngày nghỉ" displayed under "Xin vui lòng chọn ngày nghỉ" field

SLM-07 Verify that the validation text of "Lí do" field displays when creating a leave request with "Lí do" field empty "Lưu và tạo mới" button
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-06-2023" dateTo "Ngày kết thúc" with "28-06-2023"
    When Click "Lưu và tạo mới" button
    Then Required message "Lý do" displayed under "Xin vui lòng nhập lý do" field

SLM-07 Verify that the validation text of "Lí do" field displays when creating a leave request with "Lí do" field empty "Lưu lại" button
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-06-2023" dateTo "Ngày kết thúc" with "28-06-2023"
    When Click "Lưu lại" button
    Then Required message "Lý do" displayed under "Xin vui lòng nhập lý do" field

SLM-08 when create a leave request has the same date with existing leave request
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-06-2023" dateTo "Ngày kết thúc" with "28-06-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then User look message "common.DayOff.The leave date has been registered" popup

SLM-10 Verify that create a leave request successful when stafff with no management
    When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Click "Đăng nhập" button
    When Click "Tạo mới" sub menu to "/vn/dayoff/add"
    When Click select "Loại phép" with "Nghỉ phép có lương"
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "26-02-2023" dateTo "Ngày kết thúc" with "27-02-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    Sleep    5
    Then Check title "Chi tiết ngày nghỉ" in page
    When Click "Quay lại" button
    When Click on the "Xóa" button in the "Thời gian" table line

SLM-11 Verify that create a leave request successful when stafff has management
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép không lương"
    When Click select "Thời gian" with "Cả ngày"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "29-03-2023" dateTo "Ngày kết thúc" with "30-03-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    Sleep    5
    Then Check title "Chi tiết ngày nghỉ" in page
    When Click "Quay lại" button
    When Click on the "Xóa" button in the "Thời gian" table line

SLM-12 Verify that create a leave request successful when choosing "Nghỉ phép không lương"
    When Go to page create data
    When Check remaining leave days in dayoff with "Nghỉ phép không lương"
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Thời gian" table line

SLM-13 Verify that create a vacation successful when choosing "Làm remote"
    When Go to page create data
    When Check remaining leave days in dayoff with "Làm remote"
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Thời gian" table line

SLM-14 Verify that create a vacation successful when choosing "Nghỉ phép có lương"
    When Go to page create data
    When Check remaining leave days in dayoff with "Nghỉ phép có lương"
    When Click "Huỷ bỏ" button
    When Click on the "Xóa" button in the "Loại phép" table line

SLM-15 Verify that create a vacation successful when the holidays are over
    When Go to page create data
    When Click select "Loại phép" with "Nghỉ phép không lương"
    When Click select "Thời gian" with "Chiều"
    When Enter dayoff in "Ngày nghỉ" dateFrom "Ngày bắt đầu" with "27-02-2023" dateTo "Ngày kết thúc" with "27-02-2023"
    When Enter "text" in textarea "Lý do" with "Ốm"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    Sleep    5
    Then Check title "Chi tiết ngày nghỉ" in page
    When Click "Quay lại" button
    When Click on the "Xóa" button in the "Thời gian" table line

SLM-19 Verify that Staff can delete leave request successfully when not approved
    When Go to page list data
    When Click delete dayoff "Chiều"
    Then User look message "Xóa thành công" popup

SLM-18 Verify that user can view the list of leave request successfully
    When Go to page list data
    When Check title table "Họ và tên" in dayoff
    When Check title table child "Quản lý" in dayoff
    When Check title table "Loại phép" in dayoff
    When Check title table "Thời gian" in dayoff
    When Check title table "Ngày nghỉ" in dayoff
    When Check title table "Trạng thái" in dayoff
    When Check title table "Ngày phê duyệt" in dayoff
    When Check title table child "Phê duyệt bởi" in dayoff
    When Check title table child "Hoạt động" in dayoff

SLM-21 Verify that painations is shortened when changing rows per page
    When Go to page list data
    When Click Pagination "11" change "22"
    Sleep    5

SLM-22 Verify that user can view the next/previous/first/last page when click on corresponding button in pagination navigate
    When Go to page list data
    When Click Next Page
    Sleep    5
    When Click Previous Page
    Sleep    5
    # When Click Last Page
    # Sleep    5
    # When Click First Page
    # Sleep    5


*** Keywords ***
Go to page create data
    When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Click "Đăng nhập" button
    When Click "Tạo mới" sub menu to "/vn/dayoff/add"
    Sleep    0.5

Go to page list data
    When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Click "Đăng nhập" button
    When Click "Danh sách" sub menu to "/vn/dayoff/list"
    Sleep    1
