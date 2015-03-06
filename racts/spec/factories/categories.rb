FactoryGirl.define do
  factory :category do
    sequence(:name) {|n| "test_category%d" % n}
    description "a nice thing"
    cost_estimate 0
    score 0
    public false    
  end

end
