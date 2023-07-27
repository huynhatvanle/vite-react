*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
DA-01 Verify that Add New successfully with enter the data
    [Tags]    @smoketest    @regression
    Then MCD-01


*** Keywords ***
Go to page create data merchandise
    When Login to admin
    When Click "Quản lý hàng hoá" menu
    When Click "Sản phẩm" sub menu to "/vn/merchandise-management/product"

Background Happy paths
    When Go to page create data merchandise
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

MCD-01
    When Go to page create data merchandise
    Sleep    5
    When Click select "supplierName" merchandise "Nhà cung ứng Chị Lê"
