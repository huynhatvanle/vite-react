*** Settings ***
Resource                ../keywords/common.robot
Test Setup              Setup
Test Teardown           Tear Down

*** Test Cases ***
LG-04 Verify if a Supper admin will be able to login with correct Email and password.
  When Enter "email" in "Tên đăng nhập" with "admin@admin.com"
  When Enter "text" in "Mật khẩu" with "Password1!"
  When Click "Đăng nhập" button
  Then User look message "Thành công" popup
  When Check Displayed "Danh sách nghỉ phép" ds
  When Check Displayed "/assets/images/avatar.jpeg"
#   When Click "Danh sách nghỉ phép" ds
#   When Click select "Tiếng Việt" with "Tiếng Việt"
#   When Click account icon "/assets/images/avatar.jpeg"


# LG-05 Verify if a Manager will be able to login with a correct Email and password.
#   When Enter "email" in "Tên đăng nhập" with "nhungnhung123k@gmail.com"
#   When Enter "text" in "Mật khẩu" with "Halan3112."
#   When Click "Đăng nhập" button
#   Then User look message "Thành công" popup

# LG-06 Verify if a Staff will be able to login with correct Email and password.
#   When Enter "email" in "Tên đăng nhập" with "hoangdieu181021@gmail.com"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Click "Đăng nhập" button
#   Then User look message "Thành công" popup

# LG-07   Verify if your keyboard's 'Enter' key navigates to the next button
#   When Enter "email" in "Tên đăng nhập" with "admin@admin.com"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Enter to "Mật khẩu" Login
#   Then User look message "Thành công" popup

# LG-11 Verify when add spaces before and after password
#   When Enter "email" in "Tên đăng nhập" with "admin12121@admin.com"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Click "Đăng nhập" button
#   Then User look message "Thành công" popup

# LG-12 Check forgot the password
#   When Click "Quên mật khẩu?" btn
#   Sleep    3 seconds

# LG-18 Verify if a user can't sign in with an empty Gmail
#   When Click "Tên đăng nhập" dn
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Enter to "Mật khẩu" Login
#   Then User look message "Xin vui lòng nhập tên đăng nhập" popup


# LG-19 Verify if a user can't sign in with an empty password
#   When Enter "email" in "Tên đăng nhập" with "admin12121@admin.com"
#   When Click "Mật khẩu" mk
#   When Click "Đăng nhập" button
#   Then User look message "Xin vui lòng nhập mật khẩu" popup

# LG-20 Verify if a user can't sign in with an empty Email and password
#   When Enter "email" in "Tên đăng nhập" with ""
#   When Enter "text" in "Mật khẩu" with ""
#   When Click "Đăng nhập" button
#   Then User look message "Xin vui lòng nhập tên đăng nhập" & "Xin vui lòng nhập mật khẩu" popup
# LG-21 Verify when Email has a special characters
#   When Enter "email" in "Tên đăng nhập" with "ad@min@gmail.com"
#   When Click "Mật khẩu" mk
#   When Click "Đăng nhập" button
#   Then User look message "Xin vui lòng nhập địa chỉ email hợp lệ!" popup