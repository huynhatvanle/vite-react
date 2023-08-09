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

# ST-05 Verify that validation text of Ghi chú appears when entering greater than 500 characters
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field

# ST-06 Verify that validation text of Số điện thoại quản lý appears when input is greater than 12 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "number" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối đa 12 kí tự số" field

# ST-07 Verify that validation text of Số điện thoại quản lý appears when input is shorter than 8 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "number" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối thiểu 8 kí tự số" field

# ST-08 Verify that validation text of Số fax appears when input is greater than 12 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "number" in "Số fax" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Số fax" displayed under "Xin vui lòng nhập tối đa 12 kí tự số" field

# ST-09 Verify that validation text of Số fax appears when input is shorter than 8 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "number" in "Số fax" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Số fax" displayed under "Xin vui lòng nhập tối thiểu 8 kí tự số" field

# ST-10 Verify that validation text of Email appears when entering email format is incorrect
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Email đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Email đại diện" displayed under "Vui lòng nhập địa chỉ email hợp lệ" field

# ST-11 Verify that validation text of Họ và tên appears when entering data other than letters
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "number" in "Họ tên đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Họ tên đại diện" displayed under "Vui lòng chỉ nhập chữ" field

# ST-12 Verify that admin CAN add main store successfully when leaving all optional fields blank
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "number" in "Số fax" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Click "Lưu" button
#    Then User look message "Tạo cửa hàng thành công." popup
#    When Check Url "/vn/store-managerment" Page

# ST-13 Verify that admin add main store successfully when entering valid data for all fields
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "number" in "Số fax" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Tạo cửa hàng thành công." popup
#    When Check Url "/vn/store-managerment" Page

# ST-14 Verify that admin CANNOT add main store successfully with the previously registered phone number
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "number" in "Số fax" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại đại diện" with "0147852368"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Số điện thoại đã được đăng ký trước đó." popup

# ST-15 Verify that admin CANNOT add main store successfully with the previously registered email
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "number" in "Số fax" with "_RANDOM_"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "maianh82@gmail.com"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Email đã được đăng ký trước đó." popup

# ST-16 Verify that admin CANNOT add main store successfully with the previously registered fax number
#    [Tags]    @smoketest    @regression
#    When Go to page create data
#    When Enter "text" in "Tên cửa hàng" with "_RANDOM_"
#    When Enter "number" in "Số fax" with "345236236"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Enter "email" in "Email đại diện" with "_RANDOM_"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Số fax đã được đăng kí trước đó." popup

# ST-17 Verify there is no store display in the store list when entering special characters in search textbox
#    When Go to page data
#    When Search input "???"
#    When Search no data

# ST-18 Verify there is no store display in the store list when entering invalid data in search textbox
#    When Go to page data
#    When Search input "asdw"
#    When Search no data

# ST-19 Verify that admin search for the store successfully by Mã cửa hàng
#    When Go to page data
#    When Search input "STR1177"
#    When Check data table in "Mã cửa hàng" with search input

# ST-20 Verify that admin search for the store successfully by 'Tên cửa hàng'
#    When Go to page data
#    When Search input "KhoaTest"
#    When Check data table in "Tên cửa hàng" with search input

# ST-21 Verify that admin search for the store successfully by 'Loại cửa hàng'
#    When Go to page data
#    When Search input "Cửa hàng chính"
#    When Check data table in "Loại cửa hàng" with search input

# ST-22 Verify that admin search for the store successfully by 'Người đại diện'
#    When Go to page data
#    When Search input "TestStoreTest"
#    When Check data table in "Họ tên đại diện" with search input

# ST-23 Verify that admin search the store successfully by 'Số điện thoại'
#    When Go to page data
#    When Search input "0345058486"
#    When Check data table in "Số điện thoại" with search input

# ST-25 Verify that validation text of Tên cửa hàng appears when leaving Tên cửa hàng field blanks
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "text" in "Tên cửa hàng" with ""
#    When Click "Lưu" button
#    Then Required message "Tên cửa hàng" displayed under "Xin vui lòng nhập tên cửa hàng" field

# ST-26 Verify that validation text of Địa chỉ cụ thể appears when leaving Địa chỉ cụ thể field blanks
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "address" in "Địa chỉ cụ thể" with ""
#    When Click "Lưu" button
#    Then Required message "Địa chỉ cụ thể" displayed under "Xin vui lòng nhập địa chỉ cụ thể" field

# ST-27 Verify that validation text of Tỉnh/Thành phố appears when not selecting the province/city in the dropdown
#    When Go to page data
#    When Double click "STR1135"
#    When Clear select "Tỉnh/Thành phố"
#    When Click "Lưu" button
#    Then Required message "Tỉnh/Thành phố" displayed under "Xin vui lòng chọn tỉnh/thành phố" field

# ST-28 Verify that validation text of Quận/Huyện appears when not selecting the district in the dropdown
#    When Go to page data
#    When Double click "STR1135"
#    When Clear select "Quận/Huyện"
#    When Click "Lưu" button
#    Then Required message "Quận/Huyện" displayed under "Xin vui lòng chọn quận/huyện" field

# ST-29 Verify that validation text of Phường/Xã appears when not selecting the ward in the dropdown
#    When Go to page data
#    When Double click "STR1135"
#    When Clear select "Phường/Xã"
#    When Click "Lưu" button
#    Then Required message "Phường/Xã" displayed under "Xin vui lòng chọn phường/xã" field

# ST-30 Verify that validation text of Ghi chú appears when entering greater than 500 characters
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 ký tự" field

# ST-31 Verify that validation text of Số điện thoại appears when input is greater than 12 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "number" in "Số điện thoại đại diện" with "123456987896325"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối đa 12 kí tự số!" field

# ST-32 Verify that validation text of Số điện thoại appears when input is shorter than 8 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "number" in "Số điện thoại đại diện" with "123"
#    When Click "Lưu" button
#    Then Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối thiểu 8 kí tự số!" field

# ST-33 Verify that validation text of Số fax appears when input is greater than 12 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "number" in "Số fax" with "123456987896325"
#    When Click "Lưu" button
#    Then Required message "Số fax" displayed under "Xin vui lòng nhập tối đa 12 kí tự số!" field

# ST-34 Verify that validation text of Số fax appears when input is shorter than 8 numeric characters
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "number" in "Số fax" with "123"
#    When Click "Lưu" button
#    Then Required message "Số fax" displayed under "Xin vui lòng nhập tối thiểu 8 kí tự số!" field

# ST-35 Verify that validation text of Email appears when entering email format is incorrect
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "text" in "Email đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Email đại diện" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field

# ST-36 Verify that validation text of Họ và tên appears when entering data other than letters
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "number" in "Họ tên đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Họ tên đại diện" displayed under "Xin vui lòng chỉ nhập chữ!" field

# ST-37 Verify that admin CAN not change the main store information successfully with the previously registered phone number
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "phone" in "Số điện thoại đại diện" with "0917092002"
#    When Click "Lưu" button
#    Then User look message "Số Fax hoặc email hoặc số điện thoại đã được đăng kí trước đó." popup

# ST-38 Verify that admin CAN not change the main store information successfully with the previously registered email
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "email" in "Email đại diện" with "ReTestStore@gmail.com"
#    When Click "Lưu" button
#    Then User look message "Số Fax hoặc email hoặc số điện thoại đã được đăng kí trước đó." popup

# ST-39 Verify that admin CAN not change the main store information successfully with the previously registered fax
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "number" in "Số fax" with "0935294059"
#    When Click "Lưu" button
#    Then User look message "Số Fax hoặc email hoặc số điện thoại đã được đăng kí trước đó." popup

# ST-40 Verify that admin CAN edit Tên cửa hàng successfully
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "test name" in "Tên cửa hàng" with "_RANDOM_"
#    When Click "Lưu" button
#    When Check "Tên cửa hàng" in input and "Tên cửa hàng" in table is displayed on the first row

# ST-41 Verify that admin CAN edit Số fax successfully
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "number" in "Số fax" with "_RANDOM_"
#    When Click "Lưu" button
#    When Check "Tên cửa hàng" in input and "Tên cửa hàng" in table is displayed on the first row

# ST-42 Verify that supplier CAN edit 'Họ và tên' successfully
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "text" in "Họ tên đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    When Check "Họ tên đại diện" in input and "Người đại diện" in table is displayed on the first row

# ST-43 Verify that supplier CAN edit 'Số điện thoại' successfully
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
#    When Click "Lưu" button
#    When Check "Số điện thoại đại diện" in input and "Số điện thoại" in table is displayed on the first row

# ST-44 Verify that admin CAN edit the entire supplier's address successfully
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Click select "Tỉnh/Thành phố" with "Thành phố Hà Nội"
#    When Click select "Quận/Huyện" with "Quận Ba Đình"
#    When Click select "Phường/Xã" with "Phường Phúc Xá"
#    When Check address in the input equal or not address of "Địa chỉ" table

# ST-45 Verify that admin CAN change the specific address successfully
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Enter "test name" in "Địa chỉ cụ thể" with "_RANDOM_"
#    When Check address in the input equal or not address of "Địa chỉ" table

# ST-46 Verify CAN navigate to the "Danh sách cửa hàng" page when clicking on "Trở về" button
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Double click "STR1135"
#    When Click "Trở về" button
#    When Check Url "/vn/store-managerment" Page

# ST-47 Verify that the admin CAN view store listing information when selecting value on the pagination dropdown && navigate pagination
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Click pagination dropdown "20"

# ST-48 Verify the admin CAN view store listing information when select 'navigate pagination'
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Click "next" pagination to "2"
#    When Click "prev" pagination to "1"

# ST-49 Verify that the admin CAN view store listing information when selecting value on the pagination dropdown && navigate pagination
#    [Tags]    @smoketest    @regression
#    When Go to page data
#    When Click pagination dropdown "20"
#    When Click "next" pagination to "2"
#    When Click pagination dropdown "20"
#    When Click "prev" pagination to "1"

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
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
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
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
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
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Địa chỉ cụ thể" displayed under "Xin vui lòng nhập địa chỉ cụ thể" field

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
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
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
#    When Enter "paragraph" in textarea "Ghi chú" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Tạo cửa hàng thành công." popup
#    When Check Url "/vn/store-managerment" Page

# ST-17 Verify that admin search for the store successfully by Store ID
#    When Go to page data
#    When Search input "STR1061"
#    When Check data table with search input "STR1061" in "Mã cửa hàng"

# ST-18 Verify that admin search for the store successfully by Store name
#    When Go to page data
#    When Search input "Delectus id placeat autem neque qui ipsum."
#    When Check data table with search input "Delectus id placeat autem neque qui ipsum." in "Tên cửa hàng"


*** Keywords ***
Go to page create data
    When Login to admin
    When Click "Quản lý cửa hàng" menu
    When Click "Thêm cửa hàng" button

Go to page data
    When Login to admin
    When Click "Quản lý cửa hàng" menu
