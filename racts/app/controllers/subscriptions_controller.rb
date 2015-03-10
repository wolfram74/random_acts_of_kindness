class SubscriptionsController < ApplicationController
  def index
    @subscriptions = User.find(params[:user_id]).subscribed_categories({json: true})
    render json: {list: @subscriptions}
  end

  def show
    @subscription = Subscription.find(params[:id])
    @category = Category.find(@subscription.category_id)
    @tasks = @category.tasks
    object = @tasks
    render json: object
  end

  def destroy
    Subscription.delete(params[:id])
    render json: {success: true}
  end
end
