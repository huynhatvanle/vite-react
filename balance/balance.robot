*** Settings ***
Resource            ../keywords/common_copy.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***

# DN-01 Validation text with "Tên đăng nhập" field
#     [Tags]    @smoketest    @regression
#     When Enter "text" in "Mật khẩu" with "_RANDOM_"
#     And Click "Đăng Nhập" button
#     Then Required message "Tên đăng nhập" displayed under "This is a required field!" field

# DN-02 Validation text with "Mật khẩu" field
#     [Tags]    @smoketest    @regression
#     When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#     And Click "Đăng Nhập" button
#     Then Required message "Mật khẩu" displayed under "This is a required field!" field

# DN-03 Validation text with "Tên đăng nhập" field and "Mật khẩu" field
#     [Tags]    @smoketest    @regression
#     When Click "Đăng Nhập" button
#     Then Required message "Tên đăng nhập" displayed under "This is a required field!" field
#     And Required message "Mật khẩu" displayed under "This is a required field!" field

# DN-04 SI-04: Validation text with "Tên đăng nhập" field when enter invalid email format
#     [Tags]    @smoketest    @regression
#     When Enter "text" in "Tên đăng nhập" with "_RANDOM_"
#     When Enter "text" in "Mật khẩu" with "_RANDOM_"
#     And Click "Đăng Nhập" button
#     Then Required message "Tên đăng nhập" displayed under "Please enter a valid email address!" field

# ---------------------ERROR MESAGE------------------------------------------------------------

# DN-05 Verify that Đăng nhập unsuccessfully because enter incorrect Email
#     When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#     And Enter "text" in "Mật khẩu" with "Ari123456#"
#     And Click "Đăng Nhập" button
#     Then User look message "Tài khoản chưa được tạo hoặc chưa được kích hoạt." popup

# DN-06 Verify that Đăng nhập unsuccessfully because enter incorrect password
#     [Tags]    @smoketest    @regression
#     When Enter "email" in "Tên đăng nhập" with "admin_balan@getnada.com"
#     And Enter "text" in "Mật khẩu" with "_RANDOM_"
#     And Click "Đăng Nhập" button
#     Then User look message "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại" popup

# DN-07 Verify that Đăng nhập unsuccessfully because enter incorrect username and password
#     [Tags]    @smoketest    @regression
#     When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#     And Enter "text" in "Mật khẩu" with "_RANDOM_"
#     And Click "Đăng Nhập" button
#     Then User look message "Tài khoản chưa được tạo hoặc chưa được kích hoạt." popup

# # ----------------------------------LOGIN SUCCESSFULLY-------------------------------------------------------------

# DN-09 Verify that Đăng nhập successfully accout Admin with valid Email and Mật khẩu
#     [Tags]    @smoketest    @regression
#     When Login to admin
#     Then User look title "Tra Cứu Dữ Liệu"
#     And User look menu "Quản lý kho"
#     And User look menu "Quản lý kết nối"
#     And User look menu "Quản lý người dùng"
#     And User look menu "Quản lý hàng hóa"
#     And User look menu "Quản lý nhà cung cấp"
#     And User look menu "Quản lý cửa hàng"
#     And User look menu "Quản lý doanh thu"

# DN-10 Verify that Đăng nhập successfully account Store with valid Email and Mật khẩu
#     [Tags]    @smoketest    @regression
#     When Login to Store
#     Then User look title "Tra Cứu Dữ Liệu"
#     And User look menu "Đặt hàng"
#     And User look menu "Quản lý kho"
#     And User look menu "Báo cáo"
#     And User look menu "Quản lý kết nối"
#     And User look menu "Quản lý người dùng"
#     And User look menu "Quản lý hàng hóa"
#     And User look menu "Quản lý NCC"
#     And User look menu "Quản lý cửa hàng"
    
# DN-11 Verify that Đăng nhập successfully account Supplier with valid Email and Mật khẩu
#     [Tags]    @smoketest    @regression
#     When Login to Supplier
#     Then User look title "Tra Cứu Dữ Liệu"
#     And User look menu "Quản lý đơn hàng"
#     And User look menu "Quản lý trả hàng"
#     And User look menu "Quản lý khuyến mãi"
#     And User look menu "Quản lý kết nối"
#     And User look menu "Quản lý hàng hóa"
#     And User look menu "Quản lý nhà cung cấp"

# # ----------------------------------NAVIGATE FORGOT PASSWORD-------------------------------------------------------------

# DN-12 Verify that CAN navigate to the "Forgot Password" page from the link on the Log In page
#     [Tags]    @smoketest    @regression
#     When Click link "Quên mật khẩu?"
#     Then User look title "titles.Forgot Password"

# DN-13 Verify that validation text of "Email" field display when "Email" field empty
#     [Tags]    @smoketest    @regression
#     When Click link "Quên mật khẩu?"
#     And Click "Lấy mã OTP" button
#     Then Required message "routes.auth.reset-password.Recovery Email" displayed under "This is a required field!" field

# DN-14 Verify that validation text of "Email" field display when "Email" field invalid email format and less than 6 characters
#     [Tags]    @smoketest    @regression
#     When Click link "Quên mật khẩu"
#     And Enter "text" in "routes.auth.reset-password.Recovery Email" with "_RANDOM_"
#     And Click "Lấy mã OTP" button
#     Then Required message "routes.auth.reset-password.Recovery Email" field displayed under "Please enter a valid email address!"

# DN-15 Verify that can back to login page with "Quay trở lại Đăng nhập" link
#     [Tags]    @smoketest    @regression
#     When Click link "Quên mật khẩu?"
#     When Click link "Quay trở lại Đăng nhập"
#     Then User look title "Login"

# ----------------------------------DISPLAY PASSWORD-------------------------------------------------------------
# DN-17: Verify displays the password
#     [Tags]    @smoketest    @regression
#     When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#     And Enter "text" in "Mật khẩu" with "_RANDOM_"
#     And Click "Eye" icon to display password
#     Then User look "Mật khẩu" field with type "text"

# # # ----------------------------------RELOAD PAGE-------------------------------------------------------------
# DN-18: Verify refresh page
#     [Tags]    @smoketest    @regression
#     When Enter "email" in "Tên đăng nhập" with "_RANDOM_"
#     And Enter "text" in "Mật khẩu" with "_RANDOM_"
#     And Reload Page
#     Then User look "Tên đăng nhập" field EMPTY
#     And User look "Mật khẩu" field EMPTY