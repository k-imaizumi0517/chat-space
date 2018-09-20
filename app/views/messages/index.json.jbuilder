json.messages @messages do |message|
  json.name message.user.name
  json.created_at format_posted_time(message.created_at)
  json.content message.content
  json.image message.image
  json.id message.id
end
