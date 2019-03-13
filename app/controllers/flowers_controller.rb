class FlowersController < OrganismsController
  before_action :set_flower, only: [:show, :update, :destroy]

  # GET /flowers
  def index
    @organisms = process_params(Flower.with_all.all)

    render json: serializer.new(@organisms)
  end

  private

  def serializer
    FlowerSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_flower
    @organism = Flower.with_all.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:id, {:map_locations => [:x_percentage, :y_percentage]}, :flower => [:id, {:map_locations => [:x_percentage, :y_percentage]}]]
  end

  def flower_params
    base_params
  end

end
