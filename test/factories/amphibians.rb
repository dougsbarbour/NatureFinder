FactoryBot.define do
  factory :amphibian, parent: :organism, class: Amphibian do
    sound_description ""
    sound_clip_filename "MyString"
  end
end
