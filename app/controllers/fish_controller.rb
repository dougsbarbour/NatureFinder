class FishController < OrganismsController
  before_action :set_fish, only: [:show, :update, :destroy]

  # GET /fish
  def index
    @fish = process_params(Fish.all)

    render json: @fish
  end

  # GET /fish/1
  def show
    render json: @fish
  end

  # POST /fish
  def create
    @fish = Fish.new(fish_params)

    if @fish.save
      render json: @fish, status: :created, location: @fish
    else
      render json: @fish.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /fish/1
  def update
    if @fish.update(fish_params)
      render json: @fish
    else
      render json: @fish.errors, status: :unprocessable_entity
    end
  end

  # DELETE /fish/1
  def destroy
    @fish.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_fish
    @fish = Fish.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:size]
  end

  def fish_params
    base_params
  end
end
