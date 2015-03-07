class SubscriptionsController < ApplicationController
  def index
    @subscriptions = User.find(params[:user_id]).subscriptions
    @categories = @subscriptions.map{|subscription| Category.find(subscription.category_id)}
    object = {}
    object[:list] = @categories
    render json: object
    # render json: {list: "a thing"}
  end

  def show
    @subscription = Subscription.find(params[:id])
    @category = Category.find(@subscription.category_id)
    @tasks = @category.tasks
    object = {@category.to_json => @tasks.to_json}
    render json: object
  end
end
