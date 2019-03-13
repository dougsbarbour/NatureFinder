class TreesController < OrganismsController
  before_action :set_tree, only: [:show, :update, :destroy]

  # GET /trees
  def index
    @organisms = process_params(Tree.with_all.all)

    render json: serializer.new(@organisms)
  end

  private

  def serializer
    TreeSerializer
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_tree
    @organism = Tree.with_all.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def permitted_params
    super() + [:tree_type, :leaf_position, :leaf_structure, :leaf_type]
  end

  def tree_params
    base_params
  end
end
