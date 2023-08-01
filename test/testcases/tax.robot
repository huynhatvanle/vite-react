*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
# Tax-01 Verify UI in Quản lý thuế page displays correctly with design
#    When Go to page data

# Tax-02 Verify that validation text of Thuếsuất' appears when leaving 'Thuế suất' field blanks
#    When Go to page data
#    When Click "Thêm thuế" button
#    When Enter "test name" in "Loại thuế" with "_RANDOM_"
#    When Click "Lưu" button
#    Then Required message "Thuế suất (%)" displayed under "Đây là trường bắt buộc!" field

# Tax-03 Verify that validation text of 'Loại thuế' appears when leaving 'Loại thuế' field blanks
#    When Go to page data
#    When Click "Thêm thuế" button
#    When Enter "number" in "Thuế suất (%)" with "1"
#    When Click "Lưu" button
#    Then Required message "Loại thuế" displayed under "Đây là trường bắt buộc!" field

# Tax-04 Verify that validation text of Mô tả appears when entering greater than 500 characters
#    When Go to page data
#    When Click "Thêm thuế" button
#    When Enter "test name" in "Loại thuế" with "_RANDOM_"
#    When Enter "number" in "Thuế suất (%)" with "1"
#    When Enter "paragraph" in textarea "Mô tả" with "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
#    When Click "Lưu" button
#    Then Required message "Mô tả" displayed under "Xin vui lòng nhập tối đa 500 ký tự" field

# Tax-07 Verify that Admin CAN add the 'Thuế' with correct data for all fields
#    When Go to page data
#    When Click "Thêm thuế" button
#    When Enter "test name" in "Loại thuế" with "_RANDOM_"
#    When Enter "number" in "Thuế suất (%)" with "1"
#    When Enter "paragraph" in textarea "Mô tả" with "_RANDOM_"
#    When Click "Lưu" button
#    Then User look message "Lưu thuế thành công." popup
#    When Click on the "Xóa" button in the "Loại thuế" table line
#    Then User look message "Xóa thành công." popup

# Tax-08 Verify that Admin CAN add the 'Thuế' when leaving 'Mô tả' field blank
#    When Go to page data
#    When Click "Thêm thuế" button
#    When Enter "test name" in "Loại thuế" with "_RANDOM_"
#    When Enter "number" in "Thuế suất (%)" with "1"
#    When Click "Lưu" button
#    Then User look message "Lưu thuế thành công." popup
#    When Click on the "Xóa" button in the "Loại thuế" table line
#    Then User look message "Xóa thành công." popup

# Tax-09 Verify that validation text of Thuế suất appears when leaving the Thuế suất field blanks
#    When Go to page data
#    When Click "Thêm thuế" button
#    When Enter "test name" in "Loại thuế" with "_RANDOM_"
#    When Enter "number" in "Thuế suất (%)" with "1"
#    When Click "Lưu" button
#    Then User look message "Lưu thuế thành công." popup
#    When Click on the "Sửa" button in the "Loại thuế" table line
#    When Enter "number" in "Thuế suất (%)" with ""
#    When Click "Lưu" button
#    Then Required message "Thuế suất (%)" displayed under "Đây là trường bắt buộc!" field
#    When Click "Hủy" button
#    When Click on the "Xóa" button in the "Loại thuế" table line

# Tax-10 Verify that validation text of Thuế suất appears when leaving the Thuế suất field blanks
#    When Go to page data
#    When Click "Thêm thuế" button
#    When Enter "test name" in "Loại thuế" with "_RANDOM_"
#    When Enter "number" in "Thuế suất (%)" with "1"
#    When Click "Lưu" button
#    Then User look message "Lưu thuế thành công." popup
#    When Click on the "Sửa" button in the "Loại thuế" table line
#    When Enter "paragraph" in textarea "Mô tả" with "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
#    When Click "Lưu" button
#    Then Required message "Mô tả" displayed under "Xin vui lòng nhập tối đa 500 ký tự" field
#    When Click "Hủy" button
#    When Click on the "Xóa" button in the "Loại thuế" table line

# Tax-19 Verify that admin CAN search by 'Loại thuế' (accented letters)
#    When Go to page data
#    When Search input "Thue nông sản"
#    When Check data table in "Loại thuế" with search input

# Tax-23 Verify that supplier CANNOT search the tax with invalid value
#    When Go to page data
#    When Search input "???"
#    When Search no data


*** Keywords ***
Go to page data
    When Login to admin
    When Click "Quản lý hàng hóa" menu
    When Click "Thuế" sub menu to "/vn/merchandise-managerment/tax"
