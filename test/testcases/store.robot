*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
# ST-04 Verify that validation text appears when leaving all mandatory fields blank
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Click "Lưu" button
#    Then Required message "Tên cửa hàng" displayed under "Xin vui lòng nhập tên cửa hàng" field
#    Then Required message "Email đại diện" displayed under "Xin vui lòng nhập email đại diện" field
#    Then Required message "Họ tên đại diện" displayed under "Xin vui lòng nhập họ tên đại diện" field
#    Then Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập số điện thoại đại diện" field
#    Then Required message "Tỉnh/Thành phố" displayed under "Xin vui lòng chọn tỉnh/thành phố" field
#    Then Required message "Quận/Huyện" displayed under "Xin vui lòng chọn quận/huyện" field
#    Then Required message "Phường/Xã" displayed under "Xin vui lòng chọn phường/xã" field
#    Then Required message "Địa chỉ cụ thể" displayed under "Xin vui lòng nhập địa chỉ cụ thể" field

# ST-05 Verify that validation text of Tên cửa hàng appears when leaving Tên cửa hàng field blanks
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "number" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hải Phòng"
#    When Click select "Quận/Huyện" with "Quận Hồng Bàng"
#    When Click select "Phường/Xã" with "Phường Hùng Vương"
#    When Enter "text" in "Địa chỉ cụ thể" with "_RANDOM_"
#    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Tên cửa hàng" displayed under "Xin vui lòng nhập tên cửa hàng" field

# ST-06 Verify that validation text of Email quản lý appears when leaving Email quản lý field blanks
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "number" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hải Phòng"
#    When Click select "Quận/Huyện" with "Quận Hồng Bàng"
#    When Click select "Phường/Xã" with "Phường Hùng Vương"
#    When Enter "text" in "Địa chỉ cụ thể" with "_RANDOM_"
#    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Tên cửa hàng" displayed under "Xin vui lòng nhập email đại diện" field

# ST-07 Verify that validation text of Địa chỉ cụ thể appears when leaving Địa chỉ cụ thể field blanks
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "number" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hải Phòng"
#    When Click select "Quận/Huyện" with "Quận Hồng Bàng"
#    When Click select "Phường/Xã" with "Phường Hùng Vương"
#    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Địa chỉ cụ thể" displayed under "Xin vui lòng nhập địa chỉ cụ thể" field

# ST-08 Verify that validation text of Ghi chú appears when entering greater than 500 characters
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "number" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hải Phòng"
#    When Click select "Quận/Huyện" with "Quận Hồng Bàng"
#    When Click select "Phường/Xã" with "Phường Hùng Vương"
#    When Enter "text" in "Địa chỉ cụ thể" with "_RANDOM_"
#    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field

# ST-09 Verify that validation text of Tỉnh/Thành phố appears when not selecting the province/city in the dropdown
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Clear select "Tỉnh/Thành phố"
#    Then Required message "Tỉnh/Thành phố" displayed under "Xin vui lòng chọn tỉnh/thành phố" field

# ST-10 Verify that validation text of Quận/Huyện appears when not selecting the district in the dropdown
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Clear select "Quận/Huyện"
#    Then Required message "Quận/Huyện" displayed under "Xin vui lòng chọn quận/huyện" field

# ST-11 Verify that validation text of Phường/Xã appears when not selecting the ward in the dropdown
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Clear select "Phường/Xã"
#    Then Required message "Phường/Xã" displayed under "Xin vui lòng chọn phường/xã" field

# ST-12 Verify CAN navigate to the "Cửa hàng" page when clicking on "Trở về" button
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Click "Trở về" button
#    When Check Url "/vn/store-managerment" Page

# ST-13 Verify that the data will not be saved when the admin click on "Trở về" button
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "number" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Trở về" button
#    When Check Url "/vn/store-managerment" Page

# ST-14 Verify that admin CAN add store successfully
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Enter "text" in "Địa chỉ cụ thể" with "_RANDOM_"
#    When Enter "text" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Tạo cửa hàng thành công." popup
#    When Check Url "/vn/store-managerment" Page

# ST-15 Verify there is no store display in the store list when entering special characters in search textbox
#    When Go to page data
#    When Search input "???"
#    When Search no data

# ST-16 Verify there is no store display in the store list when entering invalid data in search textbox
#    When Go to page data
#    When Search input "asdw"
#    When Search no data

ST-17 Verify that admin search for the store successfully by Store ID
    When Go to page data
    When Search input "STR1061"
    When Search no data


*** Keywords ***
Go to page create data
    When Login to admin
    When Click "Quản lý cửa hàng" menu
    When Click "Thêm cửa hàng" button

Go to page data
    When Login to admin
    When Click "Quản lý cửa hàng" menu

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
