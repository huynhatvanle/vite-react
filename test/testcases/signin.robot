*** Settings ***
Resource                ../keywords/common.robot
Test Setup              Setup
Test Teardown           Tear Down

*** Test Cases ***
# LG-04 Verify if a Supper admin will be able to login with correct Email and password.
#   When Enter "email" in "Tên đăng nhập" with "admin@admin.com"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Click "Đăng nhập" button
#   Then User look message "Thành công" popup

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

LG-13 Verify if a user cannot login with a incorrect/non-exist email and an correct password.
  When Enter "email" in "Tên đăng nhập" with "admin12121@admin.com"
  When Enter "text" in "Mật khẩu" with "Password1!"
  When Click "Đăng nhập" button
  Then User look message "Thành công" popup

