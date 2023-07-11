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

# DN-02 Verify that creating accounts when add image1
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "hoangdieu181021@gmail.com"
#   When Enter "text" in "Mật khẩu" with "Password1!"
#   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Supper Admin"
#   When Click "Lưu lại" button
#   Then User look message "Email đã được sử dụng" popup 

# DN-30-1 Verify that creating a staff with the correct fields with "Lưu lại" button
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Staff"
#   When Click "Lưu lại" button
#   Then User look message "Tạo thành công" popup

# DN-30-2 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Staff"
#   When Click "Lưu và tạo mới" button
#   Then User look message "Tạo thành công" popup  

# DN-31-1 Verify that creating a manager with the correct fields with "Lưu lại" button
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Manager"
#   When Click "Lưu lại" button
#   Then User look message "Tạo thành công" popup

# DN-31-2 Verify that creating a manager with the correct fields with "Lưu và tạo mới" button
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Manager"
#   When Click "Lưu và tạo mới" button
#   Then User look message "Tạo thành công" popup  

# DN-31-1 Verify that creating a staff with the correct fields with "Lưu lại" button
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Manager"
#   When Click "Lưu lại" button
#   Then User look message "Tạo thành công" popup

# DN-32-1 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Supper Admin"
#   When Click "Lưu lại" button
#   Then User look message "Tạo thành công" popup  

# DN-32-2 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Tạo mới" sub menu to "/vn/user/add"
#   When Enter "text" in "Họ và tên" with "_RANDOM_"
#   When Enter "email" in "Email" with "_RANDOM_"
#   When Enter "text" in "Mật khẩu" with "Na115689."
#   When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
#   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
#   When Enter date in "Ngày sinh" with "_RANDOM_"
#   When Click select "Vị trí" with "Tester"
#   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
#   When Click select "Vai trò" with "Supper Admin"
#   When Click "Lưu và tạo mới" button
#   Then User look message "Tạo thành công" popup  

DN-33 Verify that account edit successfully when change name
  [Tags]                @smoketest               @regression
  When Login to admin
  When Click "Nghỉ phép" menu
  When Click "Người Dùng" menu
  Then Wait 5 seconds
  When Click "Danh sách" sub menu to "/vn/user/list"
  # When Click on the "Sửa" button in the "1" item line
  When Click "Sửa" button
  When Enter "text" in "Họ và tên" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup  
  

# DN-34 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button

# DN-35 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button

# DN-36 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button

# DN-37 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button        

# DN-38 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button       

# DN-39 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button       

# DN-40 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button  

# DN-41 Verify that account edit successfully when change name
#   [Tags]                @smoketest               @regression
#   When Login to admin
#   When Click "Người Dùng" menu
#   When Click "Danh sách" sub menu to "/vn/user/list"
#   # When Click on the "Sửa" button in the "1" item line
#   When Click "Sửa" button  


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


Wait 5 seconds
    Sleep    5s
    

