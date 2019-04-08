class CodeDownloadsController < ApplicationController
  before_action :set_code_download, only: [:show, :edit, :update, :destroy]

  # GET /code_downloads
  # GET /code_downloads.json
  def index
    @code_downloads = CodeDownload.all
    respond_to do |format|
     format.html {render :index}
     format.json {render :index, status: :ok}
     format.xml {render xml: @code_downloads.as_json}
    end
  end

  # GET /code_downloads/1
  # GET /code_downloads/1.json
  def show
  end

  # GET /code_downloads/new
  def new
    @code_download = CodeDownload.new
  end

  # GET /code_downloads/1/edit
  def edit
  end

  # POST /code_downloads
  # POST /code_downloads.json
  def create
    @code_download = CodeDownload.new(code_download_params)

    respond_to do |format|
      if @code_download.save
        format.html { redirect_to @code_download, notice: 'Code download was successfully created.' }
        format.json { render :show, status: :created, location: @code_download }
      else
        format.html { render :new }
        format.json { render json: @code_download.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /code_downloads/1
  # PATCH/PUT /code_downloads/1.json
  def update
    respond_to do |format|
      if @code_download.update(code_download_params)
        format.html { redirect_to @code_download, notice: 'Code download was successfully updated.' }
        format.json { render :show, status: :ok, location: @code_download }
      else
        format.html { render :edit }
        format.json { render json: @code_download.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /code_downloads/1
  # DELETE /code_downloads/1.json
  def destroy
    @code_download.destroy
    respond_to do |format|
      format.html { redirect_to code_downloads_url, notice: 'Code download was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_code_download
      @code_download = CodeDownload.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def code_download_params
      params.require(:code_download).permit(:versions, :description, :file)
    end
end
