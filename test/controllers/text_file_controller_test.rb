require 'test_helper'

class TextFileControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get text_file_index_url
    assert_response :success
  end

end
