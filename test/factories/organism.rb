FactoryBot.define do
  factory :organism do
    common_name { Faker::Name.first_name }
    scientific_name { Faker::Name.first_name }
    habitat_description { Faker::Name.first_name }
    quick_facts { Faker::Name.first_name }
    color { Faker::Color.color_name }
    habitat { Faker::Name.first_name }
    season { Faker::Name.first_name }
    notes { Faker::Name.first_name }
    factory :organism_with_media do
      transient do
        media_count { 3 }
      end
      after(:create) do |organism, evaluator|
        create_list(:medium, evaluator.media_count, organism: organism)
      end
    end
    factory :organism_with_map_locations do
      transient do
        map_locations_count { 3 }
      end
      after(:create) do |organism, evaluator|
        create_list(:map_location, evaluator.map_locations_count, organism: organism)
      end
    end
  end
end
