# frozen_string_literal: true

source "https://rubygems.org"

# GitHub Pages gem includes Jekyll and plugins
gem "github-pages", group: :jekyll_plugins

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
  
# Note: gemspec removed as we're no longer using Beautiful Jekyll theme gem
# gemspec

