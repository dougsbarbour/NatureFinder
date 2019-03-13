class OrganismsController < ApplicationController

  # GET /organisms/1
  def show
    render json: serializer.new(@organism)
  end

  # PATCH/PUT /organisms/1
  def update
    authenticate_request
    if @current_user
      p = base_params
      p[:map_locations] = p[:map_locations].map {|each| MapLocation.new(each)} if p[:map_locations]
      if @organism.update(p)
        render json: serializer.new(@organism)
      else
        render json: @organism.errors, status: :unprocessable_entity
      end
    end
  end

  def import
    Organism.import(File.open('GreenwayData.csv'))
  end

  private

  def serializer
    OrganismSerializer
  end

  def permitted_params
    [:common_name, :scientific_name, :color, :habitat, :season,
     :media, :notes, :common_name_word_starting, :sort_by, :random,
    :id, {:map_locations => [:x_percentage, :y_percentage]}]
  end

  def base_params
    params.permit(permitted_params)
  end

  # Only allow a trusted parameter "white list" through.
  def organism_params
    base_params
  end

  def like_keys
    ['common_name', 'color', 'habitat', 'season', 'common_name_word_starting']
  end

  def process_params(models)
    base_params.to_h.each_pair do |key, value|
      if key != 'sort_by' && key != 'random'
        if like_keys.include?(key)
          models = models.send(key + '_like', value)
        else
          models = models.where(key => value)
        end
      end
    end
    if base_params['sort_by']
      models = models.order('organisms.' + base_params['sort_by'])
    end
    if base_params['random']
      models = models.klass.random_records(base_params['random'].to_i)
    end
    return models.to_a
  end

end
