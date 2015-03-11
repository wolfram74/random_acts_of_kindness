class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token
  
  def index
  end

  def login
    object = {success: false,user: nil, username:}
    candidate = User.find_by(email: params[:credentials][:email])
    if candidate
      if candidate.password == params[:credentials][:password]
        object[:success] = true
        object[:user] = candidate.id
        object[:username] = candidate.username
        render json: object
      else 
        render json: object
      end
    else 
      render json: object
    end
  end
end
