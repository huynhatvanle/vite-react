*** Settings ***
Resource                ../keywords/common.robot
Test Setup              Setup
Test Teardown           Tear Down

*** Test Cases ***
STR-40 Verify that admin CAN edit Tên cửa hàng successfully
  [Tags]                @smoketest               @regression
  When Login to admin
  When Click "Quản lý cửa hàng" menu
  
  when Click   //*[contains(@class, "ant-table-row")][1]   left    2
  when Enter "text" in "Tên cửa hàng" with "Cửa hàng bán thịt sạch"
  when Click "Lưu" button
  when User look message "Chỉnh sửa cửa hàng thành công." popup
  Sleep    5
  Then Verify motcuahang "Cửa hàng bán thịt sạch"
  then Verify tr "Tên cửa hàng"
  