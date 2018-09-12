FactoryBot.define do
  factory :reptile, parent: :organism, class: Reptile do
    sound_description 'thump, thump, thump'
  end
end