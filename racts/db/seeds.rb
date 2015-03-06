# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# templates
# user = {email: "", password: "", username:""}
# category = {name: "", description:"", public: false}
# task = {name: "", description:"", cost_estimate: 0 ,public: false}
# 
# 
admin = {email: "phaugen@gmail.com", password: "placeholder", username:"admin"}
jordan = {email: "jordan@gmail.com", password: "swordfish", username:}

category1 = {name: "office kindness", description:"ways to help around the office", public: true}
category2 = {name: "family kindness", description:"show the people you live with some courtesy", public: true}
category3 = {name: "significant other", description:"surprise your SO with some nice actions", public: false}


task1 = {name: "clean kitchen", description:"spend 5 minutes tidying the kitchen a bit", cost_estimate: 0 ,public: true}
task2 = {name: "clean living room", description:"spend 5 minutes cleaning up living room, cables and whatnot", cost_estimate: 0 ,public: true}
task3 = {name: "buy some snacks", description:"go to the store and get some snacks for your coworkers", cost_estimate: 4 ,public: true}
task4 = {name: "throw a pizza party", description:"surprise everybody with a pizza party", cost_estimate: 45 ,public: true}
task5 = {name: "special dinner", description:"treat your special person to a special dinner", cost_estimate: 25 ,public: false}

user1 = User.create(admin)
user2 = User.create(jordan)
user1.categories << Category.create(category1) #family [0]
user1.categories << Category.create(category2) #office [1]
user1.categories << Category.create(category3) #significant other [2]
user1.categories[0].tasks << Task.create(task1)
user1.categories[0].tasks << Task.create(task2)
user1.categories[0].tasks << Task.create(task4)
user1.categories[1].tasks << Task.create(task1)
user1.categories[1].tasks << Task.create(task3)
user1.categories[1].tasks << Task.create(task4)
user1.categories[2].tasks << Task.create(task1)
user1.categories[2].tasks << Task.create(task5)


