require 'test_helper'

class FilterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @filter = Filter.create(name: "Test Function", function_name: "testFunction", description: "This is a test function, and here we describe how the functions work", num_parameters: "2",  example: "parameter-example")
  end

  test "filter must me valid" do
    assert @filter.valid?
  end

  test "name must be present" do
    @filter.name = ""
    assert_not @filter.valid?
   end

   test "name must not be too short" do
    @filter.name = "aa"
    assert_not @filter.valid?
   end

   test "name must not be too long" do
    @filter.name = "a" * 100
    assert_not @filter.valid?
   end

  test "function_name must be present" do
    @filter.function_name = ""
    assert_not @filter.valid?
  end

  test "function_name must not be too short" do
    @filter.function_name = "aa"
    assert_not @filter.valid?
   end

   test "function_name must not be too long" do
    @filter.function_name = "a" * 100
    assert_not @filter.valid?
   end

   test "num_parameters must be postive" do
    @filter.num_parameters = -1
    assert_not @filter.valid?
   end
end
