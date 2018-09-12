class AmphibiansController < OrganismsController
  before_action :set_amphibian, only: [:show, :update, :destroy]

  # GET /amphibians
  def index
    @amphibians = process_params(Amphibian.all)

    render json: @amphibians
  end

  # GET /amphibians/1
  def show
    render json: @amphibian
  end

  # POST /amphibians
  def create
    @amphibian = Amphibian.new(amphibian_params)

    if @amphibian.save
      render json: @amphibian, status: :created, location: @amphibian
    else
      render json: @amphibian.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /amphibians/1
  def update
    if @amphibian.update(amphibian_params)
      render json: @amphibian
    else
      render json: @amphibian.errors, status: :unprocessable_entity
    end
  end

  # DELETE /amphibians/1
  def destroy
    @amphibian.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_amphibian
    @amphibian = Amphibian.find(params[:id])
  end

  def permitted_params
    super() + [:sound_description, :sound_clip_filename]
  end

  # Only allow a trusted parameter "white list" through.
  def amphibian_params
    base_params
  end
end
