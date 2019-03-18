# RubyBelgium.be

Home page for the Ruby Belgium association.

https://rubybelgium.be (or https://brug-be.github.io/rubybelgium)

## Installation

The site is based on [Middleman](https://middlemanapp.com) and the [Agency](http://startbootstrap.com/template-overviews/agency/) Bootstrap template.

1. Clone this repository (`git clone git@github.com:brug-be/rubybelgium.git`)
2. Install the gems (`cd rubybelgium ; bundle install`)
3. Serve the site locally (`middleman server`, or `bundle exec middleman server` if you get an error)

## Deployment

To deploy the master branch on Github pages:

Make sure you have the `mgd` gem installed [docs](https://github.com/hovancik/middleman-github-deploy) and pushed all changes to github.

```shell
git checkout master
mgd
```

It will build the static site, create a commit on the _gh-pages_ branch, and push it online. Github pages automatically takes care of the rest.

## Contributing

Discuss features:

1. Create an issue ( https://github.com/brug-be/rubybelgium/issues )
2. Type a nice and polite comment

Propose a change:

1. Fork it ( https://github.com/brug-be/rubybelgium/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
