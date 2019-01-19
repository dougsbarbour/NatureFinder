class ConfigsController < ApplicationController
  before_action :set_config, only: [:show, :update, :destroy]

  # GET /config
  def show
    render json: serializer.new(@config)
  end

  private

  def serializer
    ConfigSerializer
  end

  def set_config
    @config = Config.instance
  end

  # Only allow a trusted parameter "white list" through.
  def config_params
    params.require(:config).permit(:all_colors, :all_habitats, :all_sizes)
  end
end
