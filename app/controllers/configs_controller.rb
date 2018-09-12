class ConfigsController < ApplicationController
  before_action :set_config, only: [:show, :update, :destroy]

  # GET /config
  def show
    render json: @config
  end

  # POST /config
  def create
    @config = Config.new(config_params)

    if @config.save
      render json: @config, status: :created, location: @config
    else
      render json: @config.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /config
  def update
    if @config.update(config_params)
      render json: @config
    else
      render json: @config.errors, status: :unprocessable_entity
    end
  end

  # DELETE /configs/1
  def destroy
    @config.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_config
      @config = Config.instance
    end

    # Only allow a trusted parameter "white list" through.
    def config_params
      params.require(:config).permit(:all_colors, :all_habitats, :all_sizes)
    end
end
