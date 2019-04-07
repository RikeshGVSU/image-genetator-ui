require "application_system_test_case"

class FiltersTest < ApplicationSystemTestCase
  setup do
    @filter = filters(:one)
  end

  test "visiting the index" do
    visit filters_url
    assert_selector "h1", text: "Filters"
  end

  test "creating a Filter" do
    visit filters_url
    click_on "New Filter"

    fill_in "Description", with: @filter.description
    fill_in "Example", with: @filter.example
    fill_in "Function name", with: @filter.function_name
    fill_in "Name", with: @filter.name
    fill_in "Num parameters", with: @filter.num_parameters
    click_on "Create Filter"

    assert_text "Filter was successfully created"
    click_on "Back"
  end

  test "updating a Filter" do
    visit filters_url
    click_on "Edit", match: :first

    fill_in "Description", with: @filter.description
    fill_in "Example", with: @filter.example
    fill_in "Function name", with: @filter.function_name
    fill_in "Name", with: @filter.name
    fill_in "Num parameters", with: @filter.num_parameters
    click_on "Update Filter"

    assert_text "Filter was successfully updated"
    click_on "Back"
  end

  test "destroying a Filter" do
    visit filters_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Filter was successfully destroyed"
  end
end
