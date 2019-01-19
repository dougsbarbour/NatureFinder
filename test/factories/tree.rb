FactoryBot.define do
  factory :tree, parent: :organism, class: Tree do
    tree_type { 'd' }
    leaf_position { 'o' }
    leaf_structure { 's' }
    leaf_type { 'b' }
  end
end