require_relative 'boot'

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Untitled
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    # config.api_only = true
    config.middleware.use OliveBranch::Middleware,
                          inflection: 'camel',
                          content_type_check: -> (content_type) {true}

    unless Rails.env.development? || Rails.env.test?
      config.middleware.insert_before 0, Rack::Cors do
        allow do
          origins '*'

          resource '*',
                   headers: :any,
                   expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
                   methods: [:get, :post, :put, :patch, :delete, :options, :head]
        end
      end
    end
  end

end
