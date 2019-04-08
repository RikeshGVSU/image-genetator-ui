require "application_system_test_case"

class CodeDownloadsTest < ApplicationSystemTestCase
  setup do
    @code_download = code_downloads(:one)
  end

  test "visiting the index" do
    visit code_downloads_url
    assert_selector "h1", text: "Code Downloads"
  end

  test "creating a Code download" do
    visit code_downloads_url
    click_on "New Code Download"

    fill_in "Description", with: @code_download.description
    fill_in "Versions", with: @code_download.versions
    click_on "Create Code download"

    assert_text "Code download was successfully created"
    click_on "Back"
  end

  test "updating a Code download" do
    visit code_downloads_url
    click_on "Edit", match: :first

    fill_in "Description", with: @code_download.description
    fill_in "Versions", with: @code_download.versions
    click_on "Update Code download"

    assert_text "Code download was successfully updated"
    click_on "Back"
  end

  test "destroying a Code download" do
    visit code_downloads_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Code download was successfully destroyed"
  end
end
