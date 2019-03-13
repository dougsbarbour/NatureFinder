class MammalsController < OrganismsController
  before_action :set_mammal, only: [:show, :update, :destroy]

  # GET /mammals
  def index
    @organisms = process_params(Mammal.with_all.all)

    render json: serializer.new(@organisms)
  end

  private

  def serializer
    MammalSerializer
  end
  # Use callbacks to share common setup or constraints between actions.
  def set_mammal
    @organism = Mammal.with_all.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def mammal_params
    base_params
  end
end
