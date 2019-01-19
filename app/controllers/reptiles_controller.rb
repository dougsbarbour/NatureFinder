class ReptilesController < OrganismsController
  before_action :set_reptile, only: [:show, :update, :destroy]

  # GET /reptiles
  def index
    @organisms = process_params(Reptile.all)

    render json: serializer.new(@organisms)
  end

  private

  def serializer
    ReptileSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_reptile
    @organism = Reptile.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:sound_description]
  end

  def reptile_params
    base_params
  end
end
