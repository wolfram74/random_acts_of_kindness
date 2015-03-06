class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :category

  def update
    user_id = self.user_id
    category_id = self.category_id
    limit = self.amount
    old_assignments = Assignment.where(user_id: user_id, category_id: category_id).last(limit)
    if old_assignments.length == 0
      self.assign_new_tasks
    end
    period_elapsed = old_assignment.last.created_at < DateTime.now #- self.period.day
    if period_elapsed
      self.assign_new_tasks
    end
  end

  def assign_new_tasks
    available_listings = self.category.listings
    sampled_listings = available_listings.sample(self.amount)
    sampled_listings.each do |listing|
      args = {user_id: self.user_id, listing_id: listing.id}
      Task.find(listing.task_id).assign(args)
    end
  end
end
