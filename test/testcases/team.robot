*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
DA-01 Verify that create team successful when leave "Mô tả" field with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Go to page create data
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-02 Verify that create team successful when leave "Mô tả" field with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-03 Verify that creating a team successfully with the same manager with "Lưu lại" button
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-04 Verify that creating a team successfully with the same manager with "Lưu và tạo mới" button
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-05 Verify that creating a team successfully with the another manager with "Lưu lại" button
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click select "Quản lý" with "Nguyễn Văn Bê"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-06 Verify that creating a team successfully with the another manager with "Lưu và tạo mới" button
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click select "Quản lý" with "Nguyễn Văn Bê"
    When Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-07 Verify that the validation text of "Tên nhóm" field displays when creating a team with "Tên nhóm" field empty
    When Go to page create data
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu lại" button
    Then Required message "Tên Nhóm" displayed under "Xin vui lòng nhập tên nhóm" field

DA-08 Verify that the validation text of "Quản lý" field displays when creating a team with "Quản lý" field empty
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click "Lưu lại" button
    Then Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

DA-09 Verify that creating team when entering the correct manager field
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu lại" button

DA-10 Verify that creating team when entering the incorrect/non-exist manager field
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click select "Quản lý" with "123"
    When Click "Lưu lại" button
    Then Required message "Quản lý" displayed under "Xin vui lòng chọn quản lý" field

DA-11 Verify that error message displays when creating a user with existing name
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "TesterAri"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup

DA-13 Verify that user can edit team's name successfully
    When Go to page edit data
    When Enter "text" in "Tên Nhóm" with "_RANDOM_"
    When Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-14 Verify that Team edit successfully when change manager has team
    When Go to page edit data
    When Click select "Quản lý" with "Nguyễn Thị Cẩm Vân"
    When Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-15 Verify that Team edit successfully when change manager has no team
    When Go to page edit data
    When Enter select "Quản lý" with "Bảo Trâm"
    When Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    When Check title "Nhóm" page
    When Click on the "Xóa" button in the "Tên Nhóm" table line

DA-16 Verify that error message displays when edit a user with existing name
    When Go to page create data
    When Enter "text" in "Tên Nhóm" with "TesterAri"
    When Click select "Quản lý" with "Nguyễn Văn A"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup

DA-17 Verify that user can delete team successfully when the team had members
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    When Click action "Xóa" with "Intern" in table
    Then User look message "Xóa thành công" popup
    When Check title "Nhóm" page

DA-18 Verify that user can delete team successfully when the team does not have members
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    When Click action "Xóa" with "_RANDOM_" in table
    Then User look message "Xóa thành công" popup
    When Check title "Nhóm" page

DA-19 Verify that user can view the list of team successfully
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    When Find "Tên Nhóm" table1
    When Find "Quản lý" table
    When Find "Mô tả" table
    When Find "Hoạt động" table

DA-20 Verify that user can search an existing team when entering correct keyword to search box
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    When Find search "Tester"
    Sleep    3
    When Search have data

DA-21 Verify that user can search an existing team when entering incorrect keyword to search box
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    When Find search "Tester123456"
    Sleep    3
    When Search no data

DA-22 Verify that user can view the next/previous/first/last page when click on corresponding button in pagination navigate

When Login to admin

When Click "Thiết lập" menu

When Click "Nhóm" sub menu to "/vn/team"

When Click "next" pagination to "2"

When Click "prev" pagination to "1"

When Click "next_10" pagination to "10"

When Click "prev_10" pagination to "1"

DA-23 Verify that painations is shortened when changing rows per page
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    Sleep    2
    When Card count <tr> "20"


*** Keywords ***
Go to page create data
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    When Click "Tạo mới" button
    Sleep    2

Go to page edit data
    When Login to admin
    When Click "Thiết lập" menu
    When Click "Nhóm" sub menu to "/vn/team"
    When Click "Sửa" button action table
    Sleep    2
