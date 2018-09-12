class FlowersController < OrganismsController
  before_action :set_flower, only: [:show, :update, :destroy]

  # GET /flowers
  def index
    @flowers = process_params(Flower.all)

    render json: @flowers
  end

  # GET /flowers/1
  def show
    render json: @flower
  end

  # POST /flowers
  def create
    @flower = Flower.new(flower_params)

    if @flower.save
      render json: @flower, status: :created, location: @flower
    else
      render json: @flower.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /flowers/1
  def update
    p = flower_params
    p[:map_locations] = p[:map_locations].map {|each| [each[:x], each[:y]]} if p[:map_locations]
    if @flower.update(p)
      render json: @flower
    else
      render json: @flower.errors, status: :unprocessable_entity
    end
  end

  # DELETE /flowers/1
  def destroy
    @flower.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_flower
    @flower = Flower.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:blooming_period, :id, {:map_locations => [:x, :y]}, :flower => [:id, {:map_locations => [:x, :y]}]]
  end

  def flower_params
    base_params
  end

  def like_keys
    super() + ['blooming_period']
  end
end
