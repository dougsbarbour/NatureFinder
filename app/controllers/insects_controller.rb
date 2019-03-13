class InsectsController < OrganismsController
  before_action :set_insect, only: [:show, :update, :destroy]

  # GET /insects
  def index
    @organisms = process_params(Insect.with_all.all)

    render json: serializer.new(@organisms)
  end

  private

  def serializer
    InsectSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_insect
    @organism = Insect.with_all.find(params[:id])
  end

  def permitted_params
    super() + [:sound_description, :sound_clip_filename]
  end

  # Only allow a trusted parameter "white list" through.
  def insect_params
    base_params
  end
end
