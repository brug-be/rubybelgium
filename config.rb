require 'open-uri'

helpers do
  def link_to_if(condition, name, options = {}, html_options = {}, &block)
    if condition
      link_to(name, options, html_options)
    else
      if block_given?
        block.arity <= 1 ? capture(name, &block) : capture(name, options, html_options, &block)
      else
        ERB::Util.html_escape(name)
      end
    end
  end

  def csv_data
    csv_data = open("https://raw.githubusercontent.com/brug-be/rubyshops/master/bnlrubyshops.csv").read
    hash = CSV.new(csv_data, headers: true, header_converters: :symbol)
    return hash.to_a.map { |row| row.to_hash }
  end
end

set :relative_links, true

set :css_dir,    'assets/stylesheets'
set :images_dir, 'assets/images'
set :js_dir,     'assets/javascripts'

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :minify_html
  activate :gzip
  activate :imageoptim
  activate :asset_hash
  activate :relative_assets
end

# middleman-deploy
activate :deploy do |deploy|
  deploy.method = :git
end

configure :production do
  activate :google_analytics do |ga|
    ga.tracking_id = 'UA-77145892-1'
  end
end
