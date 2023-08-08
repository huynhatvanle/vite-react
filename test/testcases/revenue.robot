*** Settings ***
Resource            ../keywords/common.robot

# Library    SeleniumLibrary
Test Setup          Setup
Test Teardown       Tear Down


*** Test Cases ***
SPL_01 Verify the data in the table when first entering the page
    [Tags]    @smoketest    @regression
    Then Login to admin
    When Click "Quản lý doanh thu" menu1
    Sleep    4
    When Click "Doanh thu CH" menu
    When Check value table "Trống"
