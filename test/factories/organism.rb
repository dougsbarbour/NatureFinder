FactoryBot.define do
  factory :organism do
    common_name Faker::Name.first_name
    genus Faker::Name.first_name
    species Faker::Name.first_name
    family_latin Faker::Name.first_name
    family_english Faker::Name.first_name
    color Faker::Color.color_name
    habitat Faker::Name.first_name
    photo_filename 'image.jpg'
    photo_date Faker::Date.forward(23)
    video_filename 'video.mpg'
    notes Faker::Name.first_name
  end
end
