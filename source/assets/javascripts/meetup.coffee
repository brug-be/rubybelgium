ready = ->
  get_meetup_events()

get_meetup_events = ->
  GROUP      = 'ruby_belgium'
  BASE_URL   = 'https://api.meetup.com'
  EVENTS_URL = "#{BASE_URL}/#{GROUP}/events"
  PARAMS     = {fields: 'group_photo'}

  $.ajax EVENTS_URL, dataType: 'jsonp', data: PARAMS, success: (response) ->
    display_meetup_events response.data

display_meetup_events = (events) ->
  return if events.length == 0

  template = $.templates("#event-template")

  $('#events-list li.more').remove()

  $(events).each (index, event) ->
    html = template.render
      class:       ('timeline-inverted' if (index % 2 != 0))
      link:        filter_attribute(event.link)
      image:       event_icon(event.name) || filter_attribute(event.group.photo.photo_link)
      date:        new Intl.DateTimeFormat().format(new Date(parseInt(event.time)))
      title:       event.name
      description: event.venue.name

    $('#events-list').append html

event_icon = (event_name) ->
  if event_name.match /BRUG/i
    image_path 'brug-icon.png'
  else if event_name.match /burger/i
    image_path 'rubyburgers-icon.png'
  else
    undefined

filter_attribute = (attribute) ->
  attribute.replace /[\t\n\f >"']/g, ''

$(document).ready ready
