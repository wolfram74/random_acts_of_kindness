require 'rails_helper'

RSpec.describe UsersController, type: :controller do
   it do
    should route(:get, '/users/1/active').
    to(action: :active_tasks, id: 1)
   end

   it do
    should route(:get, '/users/1').
    to(action: :show, id: 1)
   end
end
