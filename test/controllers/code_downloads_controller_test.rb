require 'test_helper'

class CodeDownloadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @code_download = code_downloads(:one)
  end

  # test "should get index" do
  #   get code_downloads_url
  #   assert_response :success
  # end

  test "should get new" do
    get new_code_download_url
    assert_response :success
  end

  test "should create code_download" do
    assert_difference('CodeDownload.count') do
      post code_downloads_url, params: { code_download: { description: @code_download.description, versions: @code_download.versions } }
    end

    assert_redirected_to code_download_url(CodeDownload.last)
  end

  # test "should show code_download" do
  #   get code_download_url(@code_download)
  #   assert_response :success
  # end

  test "should get edit" do
    get edit_code_download_url(@code_download)
    assert_response :success
  end

  test "should update code_download" do
    patch code_download_url(@code_download), params: { code_download: { description: @code_download.description, versions: @code_download.versions } }
    assert_redirected_to code_download_url(@code_download)
  end

  test "should destroy code_download" do
    assert_difference('CodeDownload.count', -1) do
      delete code_download_url(@code_download)
    end

    assert_redirected_to code_downloads_url
  end
end
