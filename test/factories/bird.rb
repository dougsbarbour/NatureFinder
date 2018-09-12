FactoryBot.define do
  factory :bird, parent: :organism, class: Bird do
    song_description 'chirp, chirp, chirp'
    size 'small'
    photo_text_1 'bird'
    photo_text_2 'another bird'
    female_photo_type 'Adult'
  end
end