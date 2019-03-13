class AmphibiansController < OrganismsController
  before_action :set_amphibian, only: [:show, :update, :destroy]

  # GET /amphibians
  def index
    @organisms = process_params(Amphibian.with_all.all)

    render json: serializer.new(@organisms)
  end

  private

  def serializer
    AmphibianSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_amphibian
    @organism = Amphibian.with_all.find(params[:id])
  end

  def permitted_params
    super() + [:sound_description, :sound_clip_filename]
  end

  # Only allow a trusted parameter "white list" through.
  def amphibian_params
    base_params
  end
end
