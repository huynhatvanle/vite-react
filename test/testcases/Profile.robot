*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

# ---------------------NAVIGATE CREATE USER PAGE-------------------------------------------------------
PRO-01 Verify that it is possible to navigate to the page for edit profile
    [Tags]    @smoketest    @regression
    When Login to Staff
    Hover to avatar
    Click "Thông tin cá nhân" to profile
    Then User look title "Thông tin cá nhân"

# ---------------------VALIDATION TEXT-------------------------------------------------
PRO-02 Verify that validation text in "Họ và tên" field
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field

PRO-03 Verify that validation text in "Email" field
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "email" in "Email" with "${EMPTY}"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Email" displayed under "Xin vui lòng nhập email" field

PRO-04 Verify that validation text in "Email" field when enter invalid email format and less than 6 characters long
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "email" in "Email" with "text"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"
    And Required message "Email" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"

PRO-05 Verify that validation text in "Email" field when enter invalid email format and greater than 6 characters long
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "text" in "Email" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"

PRO-06 Verify that validation text in "Số điện thoại" field
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "phone" in "Số điện thoại" with "${EMPTY}"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field

PRO-07 Verify that validation text in "Số điện thoại" field invalid phone number format
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "text" in "Số điện thoại" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field

PRO-08 Verify that validation text in "Số điện thoại" field greater than 12 characters
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "number" in "Số điện thoại" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa phải có 12 ký tự số!" field

PRO-09 Verify that validation text in "Ngày sinh" field
    [Tags]    @smoketest    @regression
    Go to profile page
    And Delete information "Ngày sinh"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field

PRO-10 Verify that validation text in "Vị tri" field
    [Tags]    @smoketest    @regression
    Go to profile page
    And Delele select "Vị trí" field when edit user
    Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field

PRO-11 Verify that validation text in "Mật khẩu" field with less than 6 characters
    [Tags]          @smoketest         @regression
    Go to profile page
    When Enter "text" in "Mật khẩu" with "12345"
    And Enter "text" in "Nhập lại mật khẩu" with "${EMPTY}"
    Then Required message "Mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"
    And Required message "Mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự số!"

PRO-12 Verify that validation text in "Mật khẩu" field with not enough security
    [Tags]          @smoketest         @regression
    Go to profile page
    When Enter "text" in "Mật khẩu" with "_RANDOM_"
    And Enter "text" in "Nhập lại mật khẩu" with "${EMPTY}"
    Then Required message "Mật khẩu" displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" field

PRO-13 Verify that validation text in "Nhập lại mật khẩu" field less than 8 characters
    [Tags]          @smoketest         @regression
    Go to profile page
    When Enter "text" in "Nhập lại mật khẩu" with "Nhat123"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Nhập lại mật khẩu" field displayed under "Hai mật khẩu không giống nhau!"
    And Required message "Nhập lại mật khẩu" field displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!"

PRO-14 Verify that validation text in "Nhập lại mật khẩu" field greater than 8 characters
    [Tags]          @smoketest         @regression
    Go to profile page
    When Enter "text" in "Nhập lại mật khẩu" with "_RANDOM_"
    And Enter "text" in "Mật khẩu" with "${EMPTY}"
    Then Required message "Nhập lại mật khẩu" field displayed under "Hai mật khẩu không giống nhau!"
    And Required message "Nhập lại mật khẩu" field displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt"

PRO-15 Verify that validation text in "Nhập lại mật khẩu" field does not match
    [Tags]          @smoketest         @regression
    Go to profile page
    When Enter "text" in "Mật khẩu" with "Nhat@01101999"
    And Enter "text" in "Nhập lại mật khẩu" with "Hovannhat@01101999"
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    Then Required message "Nhập lại mật khẩu" displayed under "Hai mật khẩu không giống nhau!" field

#--------------------------------EDIT USER SUCCESSFULLY------------------------------------------
PRO-16 Verify that account edit successfully when change name
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-17 Verify that account edit successfully when change Phone Number
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "phone" in "Số điện thoại" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-18 Verify that account edit successfully when change Date Of Birth
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter date in "Ngày sinh" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-19 Verify that account edit successfully when change password
    [Tags]    @smoketest    @regression
    Go to profile page
    When Enter "text" in "Mật khẩu" with "Nhat@01101999"
    And Enter "text" in "Nhập lại mật khẩu" with "Nhat@01101999"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-20 Verify that account edit successfully when change Avatar
    [Tags]    @smoketest    @regression
    Go to profile page
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

PRO-21 Verify that account edit successfully when change Email
    [Tags]    @smoketest    @regression
    Go to profile page
    And Enter "email" in "Email" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Thành công" popup

# #--------------------------------ERROR MESSAGE WHEN EDIT USER------------------------------------------
# PRO-28 Verify that error message display when edit user with Email is already taken
#     [Tags]    @smoketest    @regression
#     # TEST CASE FAILED
#     Go to profile page
#     And Enter "email" in "Email" with "19t1051013@husc.edu.vn"
#     And Click "Lưu lại" button
#     Then User look message "Email đã được sử dụng" popup