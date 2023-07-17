*** Settings ***
Resource            ../keywords/common.robot

Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
CRU-05-1 Verify that the validation text of "Họ và tên" field displays when creating a user with "Họ và tên" field empty & "Lưu lại" button
   When Go to page create data
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
   Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
   When Click "Huỷ bỏ" button

CRU-05-2 Verify that the validation text of "Họ và tên" field displays when creating a user with "Họ và tên" field empty & "Lưu và tạo mới" button
   When Go to page create data
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
   When Click "Lưu và tạo mới" button
   Then Required message "Họ và tên" displayed under "Xin vui lòng nhập họ và tên" field
   When Click "Huỷ bỏ" button

CRU-06-1 Verify that the validation text of "Email" field displays when creating a user with "Email" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
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
   Then Required message "Email" displayed under "Xin vui lòng nhập email" field
   When Click "Huỷ bỏ" button

CRU-06-2 Verify that the validation text of "Email" field displays when creating a user with "Email" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Email" displayed under "Xin vui lòng nhập email" field
   When Click "Huỷ bỏ" button

CRU-07-1 Verify that the validation text of "Nhập mật khẩu" field displays when creating a user with "Nhập mật khẩu" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu lại" button
   Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
   When Click "Huỷ bỏ" button

CRU-07-2 Verify that the validation text of "Nhập mật khẩu" field displays when creating a user with "Nhập mật khẩu" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập mật khẩu" field
   When Click "Huỷ bỏ" button

CRU-08-1 Verify that the validation text of "Nhập lại mật khẩu" field displays when creating a user with "Nhập lại mật khẩu" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu lại" button
   Then Required message "Nhập lại mật khẩu" displayed under "Xin vui lòng nhập nhập lại mật khẩu" field
   When Click "Huỷ bỏ" button

CRU-08-2 Verify that the validation text of "Nhập lại mật khẩu" field displays when creating a user with "Nhập lại mật khẩu" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Nhập lại mật khẩu" displayed under "Xin vui lòng nhập nhập lại mật khẩu" field
   When Click "Huỷ bỏ" button

CRU-09-1 Verify that the validation text of "Số điện thoại" field displays when creating a user with "Số điện thoại" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu lại" button
   Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
   When Click "Huỷ bỏ" button

CRU-09-2 Verify that the validation text of "Số điện thoại" field displays when creating a user with "Số điện thoại" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập số điện thoại" field
   When Click "Huỷ bỏ" button

CRU-10-1 Verify that the validation text of "Ngày sinh" field displays when creating a user with "Ngày sinhi" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu lại" button
   Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field
   When Click "Huỷ bỏ" button

CRU-10-2 Verify that the validation text of "Ngày sinh" field displays when creating a user with "Ngày sinh" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Ngày sinh" displayed under "Xin vui lòng chọn ngày sinh" field
   When Click "Huỷ bỏ" button

CRU-11-1 Verify that the validation text of "Vị trí" field displays when creating a user with "Vị trí" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu lại" button
   Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field
   When Click "Huỷ bỏ" button

CRU-11-2 Verify that the validation text of "Vị trí" field displays when creating a user with "Vị trí" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Vị trí" displayed under "Xin vui lòng chọn vị trí" field
   When Click "Huỷ bỏ" button

CRU-12-1 Verify that the validation text of "Ngày đầu đi làm" field displays when creating a user with "Ngày đầu đi làm" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu lại" button
   Then Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field
   When Click "Huỷ bỏ" button

CRU-12-2 Verify that the validation text of "Ngày đầu đi làm" field displays when creating a user with "Ngày đầu đi làm" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Click select "Vai trò" with "Supper Admin"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Ngày đầu đi làm" displayed under "Xin vui lòng chọn ngày đầu đi làm" field
   When Click "Huỷ bỏ" button

CRU-13-1 Verify that the validation text of "Vai trò" field displays when creating a user with "Vai trò" field empty & "Lưu lại" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu lại" button
   Then Required message "Vai trò" displayed under "Xin vui lòng chọn vai trò" field
   When Click "Huỷ bỏ" button

CRU-13-2 Verify that the validation text of "Vai trò" field displays when creating a user with "Vai trò" field empty & "Lưu và tạo mới" button
   When Go to page create data
   When Enter "text" in "Họ và tên" with "_RANDOM_"
   When Enter "email" in "Email" with "_RANDOM_"
   When Enter "text" in "Mật khẩu" with "Password1!"
   When Enter "text" in "Nhập lại mật khẩu" with "Password1!"
   When Enter "phone" in "Số điện thoại" with "_RANDOM_"
   When Enter date in "Ngày sinh" with "_RANDOM_"
   When Click select "Vị trí" with "Tester"
   When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
   When Enter "words" in textarea "Mô tả" with "_RANDOM_"
   When Select file in "Tải ảnh lên" with "image.jpg"
   When Click "Lưu và tạo mới" button
   Then Required message "Vai trò" displayed under "Xin vui lòng chọn vai trò" field
   When Click "Huỷ bỏ" button

CRU-15-1 Verify that creating accounts when emails have special characters with "HD12gmail"
   When Go to page create data
   When Enter "email" in "Email" with "HD12gmail"
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-15-2 Verify that creating accounts when emails have special characters with "@gmail.com"
   When Go to page create data
   When Enter "email" in "Email" with "@gmail.com"
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-15-3 Verify that creating accounts when emails have special characters with "?>.<.com"
   When Go to page create data
   When Enter "email" in "Email" with "?>.<.com"
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-15-4 Verify that creating accounts when emails have special characters with "testing123@mailcom"
   When Go to page create data
   When Enter "email" in "Email" with "testing123@mailcom"
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-15-6 Verify that creating accounts when emails have special characters with "Testing.@gmail.com"
   When Go to page create data
   When Enter "email" in "Email" with "Testing.@gmail.com "
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-15-7 Verify that creating accounts when emails have special characters with "HaAnh,123@gmail.com"
   When Go to page create data
   When Enter "email" in "Email" with "HaAnh,123@gmail.com"
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-15-8 Verify that creating accounts when emails have special characters with " Tester@gmail@.com"
   When Go to page create data
   When Enter "email" in "Email" with " Tester@gmail@.com"
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-15-9 Verify that creating accounts when emails have special characters with " Tester @gmail.com"
   When Go to page create data
   When Enter "email" in "Email" with " Tester @gmail.com"
   When Enter "text" in "Họ và tên" with " "
   Then Required message "Email" displayed under "Xin vui lòng nhập địa chỉ email hợp lệ!" field
   When Click "Huỷ bỏ" button

CRU-16 Verify that creating accounts when entering the wrong password re-entry field
    When Go to page create data
    When Enter "text" in "Mật khẩu" with "Halan3112."
    When Enter "text" in "Nhập lại mật khẩu" with "HALNA3112"
    When Enter "text" in "Họ và tên" with " "
    Then Required message "Nhập lại mật khẩu" displayed under "Hai mật khẩu bạn nhập không nhất quán!" field1
    Then Required message "Nhập lại mật khẩu" displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" field1
    When Click "Huỷ bỏ" button

CRU-17 Verify that creating accounts when entering incorrect password requirements
    When Go to page create data
    When Enter "text" in "Mật khẩu" with "1234"
    When Enter "text" in "Họ và tên" with " "
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập tối thiểu 6 ký tự!" field1
    Then Required message "Mật khẩu" displayed under "Xin vui lòng nhập tối thiểu 6 ký tự số!" field1
    When Click "Huỷ bỏ" button

CRU-18 Verify that creating accounts when entering is less than the maximum length of the phone number
    When Go to page create data
    When Enter "phone" in "Số điện thoại" with "1234"
    When Enter "text" in "Họ và tên" with " "
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối thiểu 8 ký tự số!" field
    When Click "Huỷ bỏ" button

CRU-19-1 Verify that creating accounts when entering is greater than the maximum length of the phone number
    When Go to page create data
    When Enter "text" in "Mật khẩu" with "1234123412341234"
    When Enter "text" in "Họ và tên" with " "
    Then Required message "Mật khẩu" displayed under "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" field
    When Click "Huỷ bỏ" button

CRU-19-2 Verify that creating accounts when entering is greater than the maximum length of the phone number
    When Go to page create data
    When Enter "phone" in "Số điện thoại" with "1234123412341234"
    When Enter "text" in "Họ và tên" with " "
    Then Required message "Số điện thoại" displayed under "Xin vui lòng nhập tối đa phải có 12 ký tự số!" field
    When Click "Huỷ bỏ" button

CRU-20 Verify that creating accounts when entering is special characters the maximum length of the phone number
    When Go to page create data
    When Enter "phone" in "Số điện thoại" with "392dh74"
    When Click "Lưu lại" button
    Then Required message "Số điện thoại" displayed under "Xin vui lòng chỉ nhập số" field
    When Click "Huỷ bỏ" button

CRU-21 Verify that enter the correct keyword into the role field
   When Go to page create data
   Sleep    2
   When Enter "Vai trò" add in "Manager" with "roleCode"
   Sleep    2
   When Required message under "Manager" field user 

CRU-22 Verify that enter the incorrect keyword into the role field
   When Go to page create data
   When Enter "Vai trò" add in "Guest" with "roleCode"
   Sleep    2
   When Required message under "Trống" field empty

CRU-23 Verify that enter the correct keyword into the location field
   When Go to page create data
   Sleep    2
   When Enter "Vị trí" add in "Dev" with "positionCode"
   Sleep    2
   When Required message under "Developer" field user

CRU-24 Verify that enter the incorrect keyword into the role fiel location
   When Go to page create data
   When Enter "Vị trí" add in "1234" with "positionCode"
   Sleep    2
   When Required message under "Trống" field empty

CRU-27 Verify that creating accounts when add image
    When Go to page create data
    When Select file in "Tải ảnh lên" with "image.jpg"
    Sleep    2
    When Click "Lưu lại" button
    Sleep    2

CRU-29 Verify that error message displays when creating a user with existing email address
    When Go to page create data
    When Enter "text" in "Họ và tên" with "_RANDOM_"
    When Enter "email" in "Email" with "hoangdieu181021@gmail.com"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
    When Enter date in "Ngày sinh" with "_RANDOM_"
    When Click select "Vị trí" with "Tester"
    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
    When Click select "Vai trò" with "Staff"
    When Click "Lưu lại" button
    Then User look message "Email đã được sử dụng" popup
    When Click "Huỷ bỏ" button

CRU-30-1 Verify that creating a staff with the correct fields with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Create User
    When Click select "Vai trò" with "Staff"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup

CRU-30-2 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Create User
    When Click select "Vai trò" with "Staff"
    When Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup

CRU-31-1 Verify that creating a manager with the correct fields with "Lưu lại" button
    [Tags]    @smoketest    @regression
    When Create User
    When Click select "Vai trò" with "Manager"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup

CRU-31-2 Verify that creating a manager with the correct fields with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Create User
    When Click select "Vai trò" with "Manager"
    When Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup

CRU-32-1 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Create User
    When Click select "Vai trò" with "Supper Admin"
    When Click "Lưu lại" button
    Then User look message "Tạo thành công" popup

CRU-32-2 Verify that creating a staff with the correct fields with "Lưu và tạo mới" button
    [Tags]    @smoketest    @regression
    When Create User
    When Click select "Vai trò" with "Supper Admin"
    When Click "Lưu và tạo mới" button
    Then User look message "Tạo thành công" popup

CRU-33 Verify that account edit successfully when change name
    [Tags]    @smoketest    @regression
    Edit User 1
    When Enter "text" in "Họ và tên" with "_RANDOM_"
    Edit User 2

CRU-34 Verify that account edit successfully when change Email
    [Tags]    @smoketest    @regression
    Edit User 1
    When Enter "email" in "Email" with "_RANDOM_"
    Edit User 2

CRU-35 Verify that account edit successfully when change phone number
    [Tags]    @smoketest    @regression
    Edit User 1
    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
    Edit User 2

CRU-36 Verify that account edit successfully when change date of birth
    [Tags]    @smoketest    @regression
    Edit User 1
    When Enter date in "Ngày sinh" with "_RANDOM_"
    Edit User 2

CRU-37 Verify that account edit successfully when change location
    [Tags]    @smoketest    @regression
    Edit User 1
    When Click select "Vị trí" with "Developer"
    Edit User 2

CRU-38 Verify that account edit successfully when change start date of work
    [Tags]    @smoketest    @regression
    Edit User 1
    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"
    Edit User 2

CRU-40 Verify that account edit successfully when change the role
    [Tags]    @smoketest    @regression
    Edit User 1
    When Click select "Vai trò" with "Staff"
    Edit User 2

CRU-41 Verify that account edit successfully when change the vacation
    [Tags]    @smoketest    @regression
    Edit User 1
    Edit User 2

CRU-44 Verify that account edit successfully when change name
    [Tags]    @smoketest    @regression
    Edit User 1
    When Enter "text" in "Email" with "hoangdieu181021@gmail.com"
    Edit User 2

CRU-46 Verify that delete successfully staff account
    [Tags]    @smoketest    @regression
    Delete User Staff

CRU-47 Verify that delete successfully manager account
    [Tags]    @smoketest    @regression
    Delete User Manager

CRU-48 Verify that delete successfully supper admin account
    [Tags]    @smoketest    @regression
    Delete User Supper Admin

CRU-50 Verify that error message can not delete account with no leave request approved yet
    [Tags]    @smoketest    @regression
    Delete User false

CRU-51 Verify that user can view the list of Staff successfully
    When Go to page list data
    When Click on "1" Role
    Then Table on "lê văn vũ quốc" User
    Then Table on "Staff" User
    Then Table on "Lê ngọc Minh An" User
    Then Table on "lvvq@gmail.com" User
    Then Table on "0772222222" User
    Then Table on "01-06-2023" User
    Sleep    7 seconds

CRU-52 Verify that user can view the list of Manager successfully
    When Go to page list data
    When Click on "2" Role
    Then Table on "Nguyễn Văn Bê" User
    Then Table on "Developer" User
    Then Table on "testing,Tester 3,Tester2,Nhân viên thực tập,Tester2,Automation Testing,developer" User
    Sleep    7 seconds

CRU-53 Verify that user can view the list of Supper admin successfully
    When Go to page list data
    When Click on "3" Role
    Then Table on "Hồ Đức Tâm Linh_admin" User
    Then Table on "Hồ Đức Tâm Linh" User
    Then Table on "Nhân viên thực tập,Intern" User
    Then Table on "hodutali@husc.edu.vn" User
    Then Table on "49238498641" User
    Then Table on "Developer" User
    Sleep    7 seconds

CRU-54 Verify that user can search an existing team when entering correct keyword to search box
    When Go to page list data
    Sleep    2 seconds
    When Enter "Tìm kiếm" placeholder with "Diệu"
    Sleep    4 seconds

CRU-55 Verify that user can search an existing team when entering non-existent keyword to search box
    When Go to page list data
    Sleep    2 seconds
    When Enter "Tìm kiếm" placeholder with "45687"
    Sleep    4 seconds

SLM-22-1 Verify that user can view the next page when click on corresponding button in pagination navigate
   When Go to page list data
   Sleep    2 seconds
   When Click on "next" pagination
   Sleep    4 seconds

SLM-22-2 Verify that user can view the previous page when click on corresponding button in pagination navigate
   When Go to page list data
   Sleep    2 seconds
   When Click on "next" pagination
   When Click on "prev" pagination
   Sleep    4 seconds

SLM-22-3 Verify that user can view the first page when click on corresponding button in pagination navigate
   When Go to page list data
   Sleep    2 seconds
   When Click on "next_10" doublepagination
   Sleep    4 seconds

SLM-22-4 Verify that user can view the last page when click on corresponding button in pagination navigate
   When Go to page list data
   Sleep    2 seconds
   When Click on "prev_10" doublepagination
   Sleep    4 seconds

CRU-58 Verify that painations is shortened when changing rows per page
   When Go to page list data
   When Click "24" pagination
   Sleep    6


*** Keywords ***
Go to page create data
    When Login to admin
    When Click "Người dùng" menuUser
    When Click "Tạo mới" button
    Sleep    2    seconds

Go to page list data
    When Login to admin
    When Click "Người dùng" menuUser
    Sleep    2    seconds

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

Create User
    When Go to page create data
    When Enter "text" in "Họ và tên" with "_RANDOM_"
    When Enter "email" in "Email" with "_RANDOM_"
    When Enter "text" in "Mật khẩu" with "Na115689."
    When Enter "text" in "Nhập lại mật khẩu" with "Na115689."
    When Enter "phone" in "Số điện thoại" with "_RANDOM_"
    When Enter date in "Ngày sinh" with "_RANDOM_"
    When Click select "Vị trí" with "Tester"
    When Enter date in "Ngày đầu đi làm" with "_RANDOM_"

Edit User 1
    When Go to page list data
    When Click "Sửa" button by "Ratione aut commodi eum illo."
    Sleep    2s

Edit User 2
    When Enter "text" in "Ngày nghỉ" with "5"
    When Click "Lưu lại" button
    Then User look message "Cập nhật thành công" popup

Delete User Staff
    When Go to page list data
    When Click "Xóa" button by "1Fugiat nobis sapiente provident repellat libero voluptatibus facilis."
    Then User look message "Xóa thành công" popup

Delete User Manager
    When Go to page list data
    When Click "Xóa" button by "Libero sequi enim tempore culpa atque eos."
    Then User look message "Xóa thành công" popup

Delete User Supper Admin
    When Go to page list data
    When Click "Xóa" button by "Nobis eaque excepturi impedit."
    Then User look message "Xóa thành công" popup

Delete User false
    When Go to page list data
    When Click "Xóa" button by "do nhat quang"
    Then User look message "Còn những yêu cầu nghỉ cần duyệt" popup
