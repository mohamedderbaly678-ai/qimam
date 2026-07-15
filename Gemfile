source "https://rubygems.org"

# GitHub Pages compatible build (uses the same versions GH Pages servers use)
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-relative-links"
end

# Windows/JRuby friendliness (safe to keep even on Linux/Mac)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw]
