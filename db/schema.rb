# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_23_194140) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "amphibians", id: :serial, force: :cascade do |t|
  end

  create_table "birds", id: :serial, force: :cascade do |t|
    t.string "size"
  end

  create_table "configs", id: :serial, force: :cascade do |t|
    t.string "all_colors"
    t.string "all_habitats"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "all_sizes"
    t.string "all_seasons"
  end

  create_table "fish", id: :serial, force: :cascade do |t|
    t.string "size"
  end

  create_table "flowers", id: :serial, force: :cascade do |t|
  end

  create_table "insects", force: :cascade do |t|
  end

  create_table "mammals", id: :serial, force: :cascade do |t|
  end

  create_table "map_locations", force: :cascade do |t|
    t.decimal "x_percentage", precision: 64, scale: 15
    t.decimal "y_percentage", precision: 64, scale: 15
    t.integer "organism_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organism_id"], name: "index_map_locations_on_organism_id"
  end

  create_table "media", force: :cascade do |t|
    t.string "file_name"
    t.string "title"
    t.string "credits"
    t.string "caption"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tag_name"
    t.integer "organism_id"
    t.index ["organism_id"], name: "index_media_on_organism_id"
  end

  create_table "organisms", id: :serial, force: :cascade do |t|
    t.string "actable_type"
    t.integer "actable_id"
    t.string "common_name"
    t.string "color"
    t.string "habitat"
    t.string "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "habitat_description"
    t.string "scientific_name"
    t.string "quick_facts"
    t.string "season"
    t.index ["actable_type", "actable_id"], name: "index_organisms_on_actable_type_and_actable_id"
  end

  create_table "reptiles", id: :serial, force: :cascade do |t|
  end

  create_table "trees", id: :serial, force: :cascade do |t|
    t.string "tree_type"
    t.string "leaf_position"
    t.string "leaf_structure"
    t.string "leaf_type"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
