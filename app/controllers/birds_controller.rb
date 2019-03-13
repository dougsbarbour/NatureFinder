class BirdsController < OrganismsController
  before_action :set_bird, only: [:show, :update, :destroy]


  # GET /birds
  def index
    @organisms = process_params(Bird.with_all.all)
    render json: serializer.new(@organisms)
  end

  private

  def serializer
    BirdSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_bird
    @organism = Bird.with_all.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:song_description, :size, :photo_text1, :photo_text2, :female_photo_type]
  end

  def bird_params
    base_params
  end
end
