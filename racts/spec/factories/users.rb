FactoryGirl.define do
  factory :user do
    sequence(:email) {|n| "test_person%d@place.com" % n}
    password "farts"
    username "stuffs"
  end

end
