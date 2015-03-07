require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
   it do
    should route(:get, '/').
    to(action: :index)
   end
end
