class FishController < OrganismsController
  before_action :set_fish, only: [:show, :update, :destroy]

  # GET /fish
  def index
    @organism = process_params(Fish.all)
    render json: serializer.new(@organism, is_collection: true)
  end

  private

  def serializer
    FishSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_fish
    @organism = Fish.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:size]
  end

  def fish_params
    base_params
  end
end
