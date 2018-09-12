class TreesController < OrganismsController
  before_action :set_tree, only: [:show, :update, :destroy]

  # GET /trees
  def index
    @trees = process_params(Tree.all)

    render json: @trees
  end

  # GET /trees/1
  def show
    render json: @tree
  end

  # POST /trees
  def create
    @tree = Tree.new(tree_params)

    if @tree.save
      render json: @tree, status: :created, location: @tree
    else
      render json: @tree.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trees/1
  def update
    if @tree.update(tree_params)
      render json: @tree
    else
      render json: @tree.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trees/1
  def destroy
    @tree.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tree
    @tree = Tree.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:tree_type, :leaf_position, :leaf_structure, :leaf_type]
  end

  def tree_params
    base_params
  end
end