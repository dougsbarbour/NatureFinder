class MammalsController < OrganismsController
  before_action :set_mammal, only: [:show, :update, :destroy]

  # GET /mammals
  def index
    @mammals = process_params(Mammal.all)

    render json: @mammals
  end

  # GET /mammals/1
  def show
    render json: @mammal
  end

  # POST /mammals
  def create
    @mammal = Mammal.new(mammal_params)

    if @mammal.save
      render json: @mammal, status: :created, location: @mammal
    else
      render json: @mammal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /mammals/1
  def update
    if @mammal.update(mammal_params)
      render json: @mammal
    else
      render json: @mammal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /mammals/1
  def destroy
    @mammal.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_mammal
    @mammal = Mammal.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def mammal_params
    base_params
  end
end
