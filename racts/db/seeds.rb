admin = {email: "phaugen@gmail.com", password: "placeholder", username:"admin"}
jordan = {email: "jordan@gmail.com", password: "swordfish", username:""}

category1 = {name: "office kindness", description:"ways to help around the office", public: true}
category2 = {name: "family kindness", description:"show the people you live with some courtesy", public: true}
category3 = {name: "significant other", description:"surprise your SO with some nice actions", public: false}
category4 = {name: "Big Ol' list of kindess", description:"lots of things to do to help others.", public: true}

task1 = {name: "clean kitchen", description:"spend 5 minutes tidying the kitchen a bit", cost_estimate: 0 ,public: true}
task2 = {name: "clean living room", description:"spend 5 minutes cleaning up living room, cables and whatnot", cost_estimate: 0 ,public: true}
task3 = {name: "buy some snacks", description:"go to the store and get some snacks for your coworkers", cost_estimate: 4 ,public: true}
task4 = {name: "throw a pizza party", description:"surprise everybody with a pizza party", cost_estimate: 45 ,public: true}
task5 = {name: "special dinner", description:"treat your special person to a special dinner", cost_estimate: 25 ,public: false}

extra_tasks = []
extra_tasks << {name: "book hunting", description:"Go to a used book store and find a book that you've liked and give it to someone", cost_estimate: 5 ,public: true}
extra_tasks << {name: "Casting compliments", description:"tell someone they're looking good today", cost_estimate: 0 ,public: true}
extra_tasks << {name: "Appreciate their efforts", description:"Find someone you depend on and tell them you appreciate their efforts", cost_estimate: 0 ,public: true}
extra_tasks << {name: "tiny poems", description:"write a haiku and leave it for someone to find.", cost_estimate: 0 ,public: true}
extra_tasks << {name: "little cleanings", description:"on your commute or walk, pick up a piece of litter and throw it away.", cost_estimate: 0 ,public: true}
extra_tasks << {name: "listening", description:"ask someone how they're doing and actually listen", cost_estimate: 0 ,public: true}
extra_tasks << {name: "helping hands", description:"ask someone you interact with if they need help.", cost_estimate: 0 ,public: true}
extra_tasks << {name: "Stack helper", description:"Go to a section of stack exchange where you are knowledgeable, spend 5 or 10 minutes trying to find a question you can answer", cost_estimate: 0 ,public: true}
extra_tasks << {name: "Upvote party", description:"go to a social media site you visit and upvote content you like for 5 minutes", cost_estimate: 0 ,public: true}
extra_tasks << {name: "Calm yourself", description:"Spend 5 minutes looking at the night sky, the sunset or just sitting calmly", cost_estimate: 0 ,public: true}
extra_tasks << {name: "Help a stranger", description:"give 5 dollars to a homeless person", cost_estimate: 5 ,public: true}
extra_tasks << {name: "Helpful Documentation", description:"Go to a repo on github and spend 10 minutes trying to help it's documentation", cost_estimate: 0 ,public: true}
extra_tasks << {name: "Helpful tests", description:"Go to a repo written in a language you're familiar with and spend 15 minutes trying to write some tests for it", cost_estimate: 0 ,public: true}
extra_tasks << {name: "Efreedom forever", description:"donate 10 dollars to the EFF", cost_estimate: 10 ,public: true}
extra_tasks << {name: "Contributor to the arts", description:"If there is an artist of some type that typically shares their work more than sell it, go donate to them.", cost_estimate: 10 ,public: true}
extra_tasks << {name: "Mini Investor", description:"Go start an account at KIVA.org or some other micro-loan platform and put 10 dollars in your balance.", cost_estimate: 10 ,public: true}
extra_tasks << {name: "Charitable programs", description:"find some charitable organization such as the red cross or water.org and contribute", cost_estimate: 10 ,public: true}
extra_tasks << {name: "Public surreality", description:"On public transit, make the loudest fart noise you can.", cost_estimate: 0 ,public: true}

user1 = User.create(admin)
user2 = User.create(jordan)





user1.categories << Category.create(category1) #family [0]
user1.categories << Category.create(category2) #office [1]
user1.categories << Category.create(category3) #significant other [2]
big_ol_list = Category.create(category4)
extra_tasks.each do |task|
  big_ol_list.tasks << Task.create(task)
end
user1.categories[0].tasks << Task.create(task1)
user1.categories[0].tasks << Task.create(task2)
user1.categories[0].tasks << Task.create(task4)
user1.categories[1].tasks << Task.create(task1)
user1.categories[1].tasks << Task.create(task3)
user1.categories[1].tasks << Task.create(task4)
user1.categories[2].tasks << Task.create(task1)
user1.categories[2].tasks << Task.create(task5)
big_ol_list.tasks << Task.first(4)

user1.subscribe({category_id: 1, amount: 2, period: 1})
user1.subscribe({category_id: big_ol_list.id, amount: 5, period: 1})
