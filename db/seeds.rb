# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create do |u|
  u.password = u.password_confirmation = 'goalshub8'
  u.email = 'vladimir.legkunets@gmail.com'
  u.name = 'Vladimir'
end