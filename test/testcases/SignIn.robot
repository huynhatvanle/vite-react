*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
LG-04 Verify if a Supper admin will be able to login with correct Email and password.
    When Enter "email" in "Tên đăng nhập" with "admin@admin.com"
    When Enter "text" in "Mật khẩu" with "Password1!"
    When Click "Đăng nhập" button
    Then User look message "Thành công" popup
    When Check Displayed "Danh sách nghỉ phép" ds
    When Check displayed "Người dùng" menu
    When Check displayed "Nghỉ phép" menu
    When Check displayed "Thiết lập" menu
    # When Check language " Tiếng Việt"
    When Check displayed "Duy Thành Đặng" title
    When Check displayed "admin@admin.com" title
    When Check Displayed "/assets/images/avatar.jpeg"

LG-06 Verify if a Staff will be able to login with correct Email and password.
    When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Click "Đăng nhập" button
    Then User look message "Thành công" popup
    When Check Displayed "Danh sách nghỉ phép" ds
    When Check displayed "Người dùng" menu
    When Check displayed "Nghỉ phép" menu
    When Check displayed "Thiết lập" menu
    # When Check language " Tiếng Việt"
    When Check displayed "Hoàng Diệu" title
    When Check displayed "hoangdieu181021@gmail.com" title
    When Check Displayed "/assets/images/avatar.jpeg"

LG-07 Verify if your keyboard's 'Enter' key navigates to the next button
    [Tags]    @smoketest    @regression
    When Enter to login

LG-12 Check forgot the password
    When Enter "email" in "Tên đăng nhập" with "nhungnhung123k@gmail.com"
    When Click "Quên mật khẩu?" btn
    Sleep    3 seconds

LG-13 Verify that the logout link is redirected to login/home page
    [Tags]    @smoketest    @regression
    When Click to login
    When Hover account icon "/assets/images/avatar.jpeg"
    When Click span "Đăng xuất"
    Sleep    3 seconds

LG-14 Verify if a user cannot login with a incorrect/non-exist email and an correct password.
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "admin12121@admin.com"
    When Enter "text" in "Mật khẩu" with "Password1!"
    When Click "Đăng nhập" button
    When User look message "Người dùng admin12121@admin.com không tồn tại!" popup

LG-15 Verify if a user cannot login with a incorrect/non-exist email and an correct password.
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "admin@admin.com"
    When Enter "text" in "Mật khẩu" with "HD123@"
    When Click "Đăng nhập" button
    When User look message "Thông tin đăng nhập không hợp lệ cho người dùng admin@admin.com" popup

LG-16 Verify that login when caps lock fisrt letter in entry Email
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "Hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Password1!"
    When Click "Đăng nhập" button
    When User look message "Người dùng Hoangdieu181021@gmail.com không tồn tại!" popup

LG-18 Verify if a user can't sign in with an empty Gmail
    When Enter "text" in "Mật khẩu" with "Password1!"
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field

LG-19 Verify if a user can't sign in with an empty password
    When Enter "email" in "Tên đăng nhập" with "admin12121@admin.com"
    When Click "Đăng nhập" button
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

LG-20 Verify if a user can't sign in with an empty Email and password
    When Enter "email" in "Tên đăng nhập" with ""
    When Enter "text" in "Mật khẩu" with ""
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập tên đăng nhập" field
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field

LG-21 Verify when Email has a special characters
    When Enter "email" in "Tên đăng nhập" with "ad@min@gmail.com"
    When Click "Đăng nhập" button
    Then Required message "Tên đăng nhập" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field

LG-22 Verify that the password is displayed when clicking on the "Eye" icon
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "Hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "ABC@123456"
    When Click "Mật khẩu" Eye icon
    Sleep    2 seconds

LG-23 Verify that clicking on the browser back button after successful login should not take the User to log out mode
    [Tags]    @smoketest    @regression
    When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Click "Đăng nhập" button
    When User look message "Thành công" popup
    Go Back
    Sleep    2 seconds
    When Check Displayed "Danh sách nghỉ phép" ds
    When Check Displayed "/assets/images/avatar.jpeg"

LG-28 Verify if a user cannot login with a incorrect/non-exist Username and an correct password.
    [Tags]    @smoketest    @regression
    When Click change language "Tiếng Anh"
    When Enter "email" in "Username" with "admin12121@admin.com"
    When Enter "text" in "Password" with "Password1!"
    When Click "Log In" button
    Then User look message "User admin12121@admin.com not found!" popup

LG-29 Verify if a user cannot login with correct Username and an incorrect/non-exist password.
    [Tags]    @smoketest    @regression
    When Click change language "Tiếng Anh"
    When Enter "email" in "Username" with "admin@admin.com"
    When Enter "text" in "Password" with "HD123@"
    When Click "Log In" button
    Then User look message "Invalid credentials for user admin@admin.com" popup

LG-30 Verify if a user can't sign in with an empty Username
    [Tags]    @smoketest    @regression
    When Click change language "Tiếng Anh"
    When Enter "text" in "Password" with "HD123@"
    When Click "Log In" button
    Then Required message "Username" displayed under "Please enter username" field

LG-31 Verify if a user can't sign in with an empty password
    [Tags]    @smoketest    @regression

    When Click change language "Tiếng Anh"
    When Enter "email" in "Username" with "admin12121@admin.com"
    When Click "Log In" button
    Then Required message "Password" displayed under "Please enter password" field

LG-32 Verify if a user can't sign in with an empty User and password
    [Tags]    @smoketest    @regression
    When Click change language "Tiếng Anh"
    When Click "Log In" button
    Then Required message "Username" displayed under "Please enter username" field
    Then Required message "Password" displayed under "Please enter password" field


*** Keywords ***
Click to login
    When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Click "Đăng nhập" button
    When User look message "Thành công" popup

Enter to login
    When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Enter to "Mật khẩu" Login
    When User look message "Thành công" popup
