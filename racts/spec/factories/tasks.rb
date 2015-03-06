FactoryGirl.define do
  factory :task do
    sequence(:name) {|n| "test_task%d" % n}
    description "a nice thing"
    cost_estimate 0
    score 0
    public false
  end

end
