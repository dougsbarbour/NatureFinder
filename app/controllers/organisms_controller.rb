class OrganismsController < ApplicationController

  # GET /organisms
  def index
    @organisms = Organism.all

    render json: @organisms
  end

  # GET /organisms/1
  def show
    render json: @organism
  end

  # POST /organisms
  def create
    @organism = Organism.new(organism_params)

    if @organism.save
      render json: @organism, status: :created, location: @organism
    else
      render json: @organism.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organisms/1
  def update
    if @organism.update(organism_params)
      render json: @organism
    else
      render json: @organism.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organisms/1
  def destroy
    @organism.destroy
  end

  def import
    Organism.import(File.open('GreenwayData.csv'))
  end

  private

  def permitted_params
    [:common_name, :genus, :species, :family, :family_latin, :family_english, :color, :habitat, :photo_filename, :photo_date,
     :video_filename, :notes, :common_name_word_starting, :sort_by]
  end

  def base_params
    params.permit(permitted_params)
  end

  # Only allow a trusted parameter "white list" through.
  def organism_params
    base_params
  end

  def like_keys
    ['common_name', 'genus', 'species', 'family', 'family_latin', 'family_english', 'color', 'habitat', 'common_name_word_starting']
  end

  def process_params(models)
    base_params.to_h.each_pair do |key, value|
      if key != 'sort_by'
        if like_keys.include?(key)
          models = models.send(key + '_like', value)
        else
          models = models.where(key => value)
        end
      end
    end
    if base_params['sort_by']
      models = models.includes(:organism).order('organisms.' + base_params['sort_by'])
    end
    return models
  end

end
