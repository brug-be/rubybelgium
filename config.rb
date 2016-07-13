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

  def image_tag_2x(source, options = {})
    source_2x = source.dup.insert(source.rindex('.'), '@2x')
    options[:srcset] = "#{image_path(source_2x)} 2x"
    image_tag source, options
  end

  def ruby_shops
    csv_data = open('https://raw.githubusercontent.com/brug-be/rubyshops/master/bnlrubyshops.csv').read
    hash = CSV.new(csv_data, headers: true, header_converters: :symbol)
    hash.to_a(&:to_hash).sort_by { |hsh| hsh[:city] }
  end
end

# Sitemap implementation
set :url_root, 'rubybelgium.be'

activate :search_engine_sitemap
activate :directory_indexes

activate :sprockets do |c|
  c.expose_middleman_helpers = true
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
  activate :asset_hash

  require_relative "./lib/build_cleaner"
  activate :build_cleaner
end

configure :development do
  activate :livereload
end

# middleman-deploy
# activate :deploy do |deploy|
#   deploy.method = :git
# end
