*** Settings ***
Resource            ../keywords/common.robot

# Library    SeleniumLibrary
Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
SPL_01 Verify UI in Danh sách nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    # Wait Until Element Spin
    # ${elements}=    Set Variable    //tbody/tr
    # ${count}=    Get Element Count    ${elements}
    # Log To Console    ${count}

SPL_02 Verify UI in Thêm nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button

SPL_03 Verify UI in Chỉnh sửa nhà cung cấp page displays correctly with design
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Click    //*[contains(@class, "ant-table-row")][1]    left    2

SPL_04 Verify that validation text appears when leaving all mandatory fields blank
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Click "Lưu" button
    Then Required message "Tên nhà cung cấp" displayed under "Xin vui lòng nhập tên nhà cung cấp" field
    Then Required message "Tỉnh/Thành phố" displayed under "Xin vui lòng chọn tỉnh/thành phố" field
    Then Required message "Quận/Huyện" displayed under "Xin vui lòng chọn quận/huyện" field
    Then Required message "Phường/Xã" displayed under "Xin vui lòng chọn phường/xã" field
    Then Required message "Địa chỉ cụ thể" displayed under "Xin vui lòng nhập địa chỉ cụ thể" field
    Then Required message "Họ tên đại diện" displayed under "Xin vui lòng chọn họ tên đại diện" field
    Then Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập số điện thoại đại diện" field
    Then Required message "Email đại diện" displayed under "Xin vui lòng nhập email đại diện" field

SPL_05 Verify that validation text of Ghi chú appears when entering greater than 500 characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis noSPLud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
    When Click "Lưu" button
    When Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 kí tự" field

SPL_06 Verify that validation text of Số điện thoại quản lý appears when input is greater than 12 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Số điện thoại đại diện" with "09786778907897"
    When Click "Lưu" button
    When Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối đa 12 ký tự số!" field

SPL_07 Verify that validation text of Số điện thoại quản lý appears when input is shorter than 8 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Số điện thoại đại diện" with "097867"
    When Click "Lưu" button
    When Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field

SPL_08 Verify that validation text of Số fax appears when input is greater than 12 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Số fax" with "0978677890789799"
    When Click "Lưu" button
    When Required message "Số fax" displayed under "Xin vui lòng nhập tối đa 12 ký tự số!" field

SPL_09 Verify that validation text of Số fax appears when input is shorter than 8 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Số fax" with "09786"
    When Click "Lưu" button
    When Required message "Số fax" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field

SPL_10 Verify that validation text of Email appears when entering email format is incorrect
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Email đại diện" with "abc"
    When Click "Lưu" button
    When Required message "Email đại diện" displayed under "Vui lòng nhập địa chỉ email hợp lệ!" field

SPL_11 Verify that validation text of Họ và tên appears when entering data other than letters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Họ tên đại diện" with "09786"
    When Click "Lưu" button
    When Required message "Họ tên đại diện" displayed under "Xin vui lòng nhập chỉ nhập chữ!" field

SPL_12 Verify that admin CAN add supplier successfully when leaving all optional fields blank
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Check Add Supplier with "01122334457"

SPL_13 Verify that admin add supplier successfully when entering valid data for all fields
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Check Add Supplier with "01122334455"

SPL_14 Verify that admin CANNOT add supplier successfully with the previously registered phone number
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Tên nhà cung cấp" with "nhà cung cấp rau sạch"
    When Enter "phone" in "Số fax" with "_RANDOM_"
    When Click select "Tỉnh/Thành phố" with "Tỉnh Tuyên Quang"
    When Click select "Quận/Huyện" with "Huyện Lâm Bình"
    When Click select "Phường/Xã" with "Xã Bình An"
    When Enter "Text" in "Địa chỉ cụ thể" with "1 Đống Đa"
    When Enter "Text" in "Họ tên đại diện" with "Nguyễn Hoàng"
    When Enter "email" in "Email đại diện" with "_RANDOM_"
    When Enter "phone" in "Số điện thoại đại diện" with "0345058432"
    When Click "Lưu" button
    Then User look message "Số điện thoại đã được đăng ký trước đó." popup

SPL_15 Verify that admin CANNOT add supplier successfully with the previously registered email
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Tên nhà cung cấp" with "nhà cung cấp rau sạch"
    When Enter "phone" in "Số fax" with "_RANDOM_"
    When Click select "Tỉnh/Thành phố" with "Tỉnh Tuyên Quang"
    When Click select "Quận/Huyện" with "Huyện Lâm Bình"
    When Click select "Phường/Xã" with "Xã Bình An"
    When Enter "Text" in "Địa chỉ cụ thể" with "1 Đống Đa"
    When Enter "Text" in "Họ tên đại diện" with "Nguyễn Hoàng"
    When Enter "email" in "Email đại diện" with "aborde@example.net"
    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
    When Click "Lưu" button
    Then User look message "Email đã được đăng ký trước đó." popup

SPL_16 Verify that admin CANNOT add supplier successfully with the previously registered fax number
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click "Thêm nhà cung cấp" button
    When Enter "Text" in "Tên nhà cung cấp" with "nhà cung cấp rau sạch"
    When Enter "phone" in "Số fax" with "371841204404"
    When Click select "Tỉnh/Thành phố" with "Tỉnh Tuyên Quang"
    When Click select "Quận/Huyện" with "Huyện Lâm Bình"
    When Click select "Phường/Xã" with "Xã Bình An"
    When Enter "Text" in "Địa chỉ cụ thể" with "1 Đống Đa"
    When Enter "Text" in "Họ tên đại diện" with "Nguyễn Hoàng"
    When Enter "email" in "Email đại diện" with "_RANDOM_"
    When Enter "phone" in "Số điện thoại đại diện" with "_RANDOM_"
    When Click "Lưu" button
    Then User look message "Số Fax đã được đăng kí trước đó." popup

SPL_17 Verify there is no supplier display in the supplier list when entering special characters in search textbox
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Enter Search with "???"

SPL_18 Verify there is no supplier display in the supplier list when entering invalid data in search textbox
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Enter Search with "asdw"

SPL_19 Verify that admin search for the supplier successfully by Mã nhà cung cấp
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Check Enter Search "Mã nhà cung cấp" with "SPL1144"

SPL_20 Verify that admin search for the supplier successfully by 'Tên nhà cung cấp'
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Check Enter Search "Tên nhà cung cấp" with "nhà cung cấp rau"

# SPL_21 Verify that admin search for the supplier successfully by 'Address'
#    [Tags]    @smoketest    @regression
#    Then Login to admin
#    When Click "Quản lý nhà cung cấp" menu
#    Check Enter Search "Người đại diện" with "Hoàng Duy"

SPL_22 Verify that admin search for the supplier successfully by 'Người đại diện'
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Check Enter Search "Người đại diện" with "Hoàng Duy"

SPL_23 Verify that admin search the supplier successfully by 'Số điện thoại'
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Check Enter Search "Số điện thoại" with "01122334454"

SPL_24 Verify that admin search the supplier successfully by a word in keyword
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Check Enter Search "Số điện thoại" with "01122334454"

SPL_25 Verify that validation text of Tên nhà cung cấp appears when leaving Tên nhà cung cấp field blanks
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter field blanks in "Tên nhà cung cấp"
    When Click "Lưu" button
    Then Required message "Tên nhà cung cấp" displayed under "Xin vui lòng nhập tên nhà cung cấp" field

SPL_26 Verify that validation text of Địa chỉ cụ thể appears when leaving Địa chỉ cụ thể field blanks
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter field blanks in "Địa chỉ cụ thể"
    When Click "Lưu" button
    Then Required message "Địa chỉ cụ thể" displayed under "Xin vui lòng nhập địa chỉ cụ thể" field

SPL_27 Verify that validation text of Tỉnh/Thành phố appears when not selecting the province/city in the dropdown
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Click field blanks Address with "Tỉnh/Thành phố"
    Sleep    5
    When Click "Lưu" button
    Then Required message "Tỉnh/Thành phố" displayed under "Xin vui lòng chọn tỉnh/thành phố" field

SPL_28 Verify that validation text of Quận/Huyện appears when not selecting the diSPLict in the dropdown
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Click field blanks Address with "Quận/Huyện"
    When Click "Lưu" button
    Then Required message "Quận/Huyện" displayed under "Xin vui lòng chọn quận/huyện" field

SPL_29 Verify that validation text of Phường/Xã appears when not selecting the ward in the dropdown
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Click field blanks Address with "Phường/Xã"
    When Click "Lưu" button
    Then Required message "Phường/Xã" displayed under "Xin vui lòng chọn phường/xã" field

SPL_30 Verify that validation text of Ghi chú appears when entering greater than 500 characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in textarea "Ghi chú" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis noSPLud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. anim id est laborum anim id est laborum anim id est lab"
    When Click "Lưu" button
    When Required message "Ghi chú" displayed under "Chỉ được nhập tối đa 500 kí tự" field

SPL_31 Verify that validation text of Số điện thoại appears when input is greater than 12 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Số điện thoại đại diện" with "09786778907897"
    When Click "Lưu" button
    When Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối đa 12 kí tự số" field

SPL_32 Verify that validation text of Số điện thoại appears when input is shorter than 8 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Số điện thoại đại diện" with "0978677"
    When Click "Lưu" button
    When Required message "Số điện thoại đại diện" displayed under "Xin vui lòng nhập tối thiểu 8 kí tự số" field

SPL_33 Verify that validation text of Số fax appears when input is greater than 12 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Số fax" with "098778785674"
    When Click "Lưu" button
    When Required message "Số fax" displayed under "Xin vui lòng nhập tối đa 12 kí tự số" field

SPL_34 Verify that validation text of Số fax appears when input is shorter than 8 numeric characters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Số fax" with "0987787"
    When Click "Lưu" button
    When Required message "Số fax" displayed under "Xin vui lòng nhập tối thiểu 8 kí tự số" field

SPL_35 Verify that validation text of Email appears when entering email format is incorrect
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Email đại diện" with "abc"
    When Click "Lưu" button
    When Required message "Email đại diện" displayed under "Vui lòng nhập địa chỉ email hợp lệ" field

SPL_36 Verify that validation text of Họ và tên appears when entering data other than letters
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Họ tên đại diện" with "1234"
    When Click "Lưu" button
    When Required message "Họ tên đại diện" displayed under "Vui lòng chỉ nhập chữ" field

SPL_37 Verify that admin CAN not change the supplier information successfully with the previously registered phone number
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Số điện thoại đại diện" with "0345058432"
    When Click "Lưu" button
    Then User look message "Số điện thoại đã được đăng ký trước đó." popup

SPL_38 Verify that admin CAN not change the supplier information successfully with the previously registered email.
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Email đại diện" with "qcari2704@gmail.com"
    When Click "Lưu" button

SPL_39 Verify that admin CAN not change the supplier information successfully with the previously registered fax.
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click    //*[contains(@class, "ant-table-row")][1]    left    2
    When Enter "Text" in "Số fax" with "09423454321"
    When Click "Lưu" button
    Then User look message "Số fax đã được đăng kí trước đó." popup

# Thanh

SPL_40 Verify that admin CAN edit Tên nhà cung cấp successfully
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Double click "01122334454" in supplier record
    When Enter "text" in "Tên nhà cung cấp" with "_RANDOM_"
    When Click "Lưu" button
    Then User look message "Chỉnh sửa nhà cung cấp thành công." popup
    When check "Tên nhà cung cấp" in input and "Tên nhà cung cấp" in table is displayed on the first row

SPL_42 Verify that supplier CAN edit 'Họ và tên' successfully
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Wait Until Element Spin
    When Double click "01122334454" in supplier record
    When Enter "text" in "Họ tên đại diện" with "Duy Dương"
    When Click "Lưu" button
    Then User look message "Chỉnh sửa nhà cung cấp thành công." popup
    When check "Họ tên đại diện" in input and "Người đại diện" in table is displayed on the first row

SPL_43 Verify that supplier CAN edit 'Số điện thoại' successfully
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    Wait Until Element Spin
    When Double click "01122334454" in supplier record
    When Enter "text" in "Họ tên đại diện" with "09867456788"
    When Click "Lưu" button
    Then User look message "Chỉnh sửa nhà cung cấp thành công." popup
    When check "Họ tên đại diện" in input and "Số điện thoại" in table is displayed on the first row

SPL_46 Verify CAN navigate to the "Danh sách nhà cung cấp" page when clicking on "Trở về" button
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Double click "TRUNG SUPPLIER 2" in supplier record
    When Click "Trở về" button
    When Check list table

SPL_47 Verify that the admin CAN view supplier listing information when selecting value on the pagination dropdown
    [Tags]    @smoketest    @regression
    Then Login to admin
    # Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Check list table
    When Click Pagination dropdown with number page "20"

SPL_48 Verify the admin CAN view supplier listing information when select 'navigate pagination'
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click change "next" the page and pagination to "2"
    When Check list table
    When Click change "prev" the page and pagination to "1"
    When Check list table

SPL_49 Verify that the admin CAN view supplier listing information when selecting value on the pagination dropdown && navigate pagination
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý nhà cung cấp" menu
    When Click Pagination dropdown with number page "20"
    When Click change "next" the page and pagination to "2"
    When Check list table
    When Click Pagination dropdown with number page "40"
    When Click change "prev" the page and pagination to "1"
    When Check list table


*** Keywords ***
Check list table
    When Check "Mã NCC" in the supplier list table
    When Check "Tên nhà cung cấp" in the supplier list table
    When Check "Địa chỉ" in the supplier list table
    When Check "Người đại diện" in the supplier list table
    When Check "Số điện thoại" in the supplier list table
    When Check "Trạng thái" in the supplier list table
