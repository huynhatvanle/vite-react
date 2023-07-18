*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down

*** Test Cases ***

# ---------------------NAVIGATE CREATE USER PAGE-------------------------------------------------------
EDU-01 Verify that it is possible to navigate to the page for edit user
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    When Select the user to edit
    Then User look title "Chỉnh sửa người dùng"

# ---------------------VALIDATION TEXT-------------------------------------------------
EDU-02 Verify that validation text in "Họ và tên" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "text" in "Họ và tên" with "${EMPTY}"
    And Enter "email" in "Email" with "_RANDOM_"
    Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field

EDU-03 Verify that validation text in "Email" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "email" in "Email" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Email" displayed under "Xin vui lòng nhập email" field

EDU-04 Verify that validation text in "Email" field when enter invalid email format and less than 6 characters long
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "email" in "Email" with "text"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"
    And Required message "Email" field displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!"

EDU-05 Verify that validation text in "Email" field when enter invalid email format and greater than 6 characters long
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "text" in "Email" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Email" field displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!"

EDU-06 Verify that validation text in "Số điện thoại" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "phone" in "Số điện thoại" with "${EMPTY}"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field

EDU-07 Verify that validation text in "Số điện thoại" field invalid phone number format
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "text" in "Số điện thoại" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field

EDU-08 Verify that validation text in "Số điện thoại" field greater than 12 characters
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "number" in "Số điện thoại" with "_RANDOM_"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa phải có 12 ký tự số!" field

EDU-09 Verify that validation text in "Ngày sinh" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Delete information "Ngày sinh"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field

EDU-10 Verify that validation text in "Vị tri" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Delele select "Vị trí" field when edit user
    Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field

EDU-11 Verify that validation text in "Ngày đầu đi làm" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Delete information "Ngày đầu đi làm"
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    Then Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field

EDU-12 Verify that validation text in "Vai trò" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Delele select "Vai trò" field when edit user
    Then Required message "Vai trò" displayed under "Xin vui lòng chọn vai trò" field

EDU-13 Verify that validation text in "Ngày nghỉ" field
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Click "Lưu lại" button
    Then Required message "Ngày nghỉ" displayed under "Xin vui lòng nhập ngày nghỉ" field

#--------------------------------EDIT USER SUCCESSFULLY------------------------------------------
EDU-14 Verify that account edit successfully when change name
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Người dùng"

EDU-15 Verify that account edit successfully when change Email
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "email" in "Email" with "_RANDOM_"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Người dùng"

EDU-16 Verify that account edit successfully when change Phone Number
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "phone" in "Số điện thoại" with "_RANDOM_"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Người dùng"

EDU-16 Verify that account edit successfully when change Date Of Birth
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter date in "Ngày sinh" with "_RANDOM_"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Người dùng"

EDU-17 Verify that account edit successfully when change Position
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Click select "Vị trí" with "Developer"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Người dùng"

EDU-18 Verify that account edit successfully when change Start Date
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter date in "Ngày đầu đi làm" with "_RANDOM"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Người dùng"

EDU-19 Verify that account edit successfully when change Role
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Click select "Vai trò" with "Manager"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Danh sách Người dùng"

EDU-20 Verify that account edit successfully & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "text" in "Họ và tên" with "_RANDOM_"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu và tạo mới" button
    Then User look message "Cập nhật thành công" popup
    And User look title "Tạo mới người dùng"

#--------------------------------ERROR MESSAGE WHEN EDIT USER------------------------------------------
EDU-21 Verify that error message display when edit user with Email is already taken & "Lưu lại" button
    [Tags]    @smoketest    @regression
    # TEST CASE FAILED
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "email" in "Email" with "19t1051013@husc.edu.vn"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Email đã được sử dụng" popup

EDU-22 Verify that error message display when edit user with Email is already taken & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    # TEST CASE FAILED
    Go to "Danh sách Người dùng" page
    And Select the user to edit
    And Enter "email" in "Email" with "19t1051013@husc.edu.vn"
    And Enter "words" in textarea "Mô tả" with "_RANDOM_"
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Click "Lưu và tạo mới" button
    Then User look message "Email đã được sử dụng" popup

EDU-23 Verify that error message display when edit user with team has been deleted & "Lưu lại" button
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user whose team has been deleted to edit
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu lại" button
    Then User look message "Internal server error" popup

EDU-24 Verify that error message display when edit user with team has been deleted & "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    Go to "Danh sách Người dùng" page
    And Select the user whose team has been deleted to edit
    And Enter "leave date" in "Ngày nghỉ" with "_RANDOM_"
    And Select file in "Tải ảnh lên" with "image.jpg"
    And Click "Lưu và tạo mới" button
    Then User look message "Internal server error" popup

