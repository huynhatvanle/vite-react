*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down

*** Test Cases ***
# DN-01 Verify that the validation text of "Họ và tên" field displays when creating a user with "Họ và tên" field empty & "Lưu lại" button
#   [Tags]                @smoketest               @regression
#   Then CRU-User-05

# DN-02 Verify that the validation text of "Họ và tên" field displays when creating a user with "Họ và tên" field empty & "Lưu và tạo mới" button
#   [Tags]                @smoketest               @regression
#   Then CRU-User-06

# DN-03 Verify that the validation text of "Email" field displays when creating a user with "Email" field empty & "Lưu lại" button
#   [Tags]                @smoketest               @regression
#   Then CRU-User-07

# DN-04 Verify that the validation text of "Email" field displays when creating a user with "Email" field empty & "Lưu và tạo mới" button
#   [Tags]                @smoketest               @regression
#   Then CRU-User-08





# DN-01 Verify that creating accounts when add image
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Select file in "Tải ảnh lên" with "image.jpg"

DN-02 Verify that creating accounts when add image1
  [Tags]                @smoketest               @regression
  When Login to admin
  When Click "Người Dùng" menu
  When Click "Tạo mới" sub menu to "/vn/user/add"
  When Enter "text" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "hoangdieu181021@gmail.com"
  When Enter "text" in "Mật khẩu" with "Password1!"
  When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Enter date in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
  When Click select "Vai trò" with "Supper Admin"
  When Click "Lưu lại" button
  Then User look message "Email đã được sử dụng" popup

*** Keywords ***
Go to page create data
  When Login to admin
  When Click "Người Dùng" menu
  When Click "Tạo mới" sub menu to "/vn/user/add"


Background Happy paths
  When Go to page create data
  When Enter "text" in "Họ và tên" with "_RANDOM_"
  When Enter "email" in "Email" with "_RANDOM_"
  When Enter "text" in "Mật khẩu" with "Password1!"
  When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
  When Enter "phone" in "Số điện thoại" with "_RANDOM_"
  When Enter date in "Ngày sinh" with "_RANDOM_"
  When Click select "Vị trí" with "Tester"
  When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
  When Click select "Vai trò" with "Supper Admin"
  When Enter "words" in textarea "Mô tả" with "_RANDOM_"
  When Select file in "Tải ảnh lên" with "image.jpg"
  When Click "Lưu lại" button
  Then User look message "Tạo thành công" popup
  When Click "Huỷ bỏ" button

# CRU-User-05
#   When Go to page create data
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Supper Admin"
#   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
#   When Select file in "Tải ảnh lên" with "image.jpg"
#   When Click "Lưu lại" button
#   Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
#   When Click "Huỷ bỏ" button

# CRU-User-06
#   When Go to page create data
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Supper Admin"
#   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
#   When Select file in "Tải ảnh lên" with "image.jpg"
#   When Click "Lưu và tạo mới" button
#   Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
#   When Click "Huỷ bỏ" button  

# CRU-User-07
#   When Go to page create data
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Supper Admin"
#   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
#   When Select file in "Tải ảnh lên" with "image.jpg"
#   When Click "Lưu lại" button
#   Then Required message "Email" displayed under "Xin vui lòng nhập email" field
#   When Click "Huỷ bỏ" button


# CRU-User-08
#   When Go to page create data
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Supper Admin"
#   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
#   When Select file in "Tải ảnh lên" with "image.jpg"
#   When Click "Lưu và tạo mới" button
#   Then Required message "Email" displayed under "Xin vui lòng nhập email" field
#   When Click "Huỷ bỏ" button  

