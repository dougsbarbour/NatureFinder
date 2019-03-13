class ReptilesController < OrganismsController
  before_action :set_reptile, only: [:show, :update, :destroy]

  # GET /reptiles
  def index
    @organisms = process_params(Reptile.with_all.all)

    render json: serializer.new(@organisms)
  end

  private

  def serializer
    ReptileSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_reptile
    @organism = Reptile.with_all.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:sound_description]
  end

  def reptile_params
    base_params
  end
end
