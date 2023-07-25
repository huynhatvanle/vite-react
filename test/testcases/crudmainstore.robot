*** Settings ***
Resource                ../keywords/common.robot
Test Setup              Setup
Test Teardown           Tear Down

*** Test Cases ***

STR_19 Verify that admin search for the store successfully by Mã cửa hàng
   When Login to admin
  When Click "Quản lý cửa hàng" menu
  When Search input "STR11"

STR-40 Verify that admin CAN edit Tên cửa hàng successfully
  [Tags]                @smoketest               @regression
  When Login to admin
  When Click "Quản lý cửa hàng" menu
  when Click   //*[contains(@class, "ant-table-row")][1]   left    2
  when Enter "text" in "Tên cửa hàng" with "Cửa hàng bán thịt sạch"
  when Click "Lưu" button
  when User look message "Chỉnh sửa cửa hàng thành công." popup
  when text in input "Tên cửa hàng" in table "Tên cửa hàng"
STR-41 Verify that admin CAN edit Số fax successfully
  When Login to admin
  When Click "Quản lý cửa hàng" menu
    when Click   //*[contains(@class, "ant-table-row")][2]   left    2
  when Enter "text" in "Số fax" with "0987878879"
  when Click "Lưu" button
  when User look message "Chỉnh sửa cửa hàng thành công." popup
  when Verify motcuahang "Cửa hàng bán thịt sạch"
  when Verify th "Mã cửa hàng"
  when Verify th "Tên cửa hàng"
  when Verify th "Địa chỉ"
  when Verify th1 "Loại cửa hàng" with name "Cửa hàng chính"
  when Verify th "Họ tên đại diện"
  when Verify th "Số điện thoại"