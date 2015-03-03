class HomeController < ApplicationController

  def index
    file = Rails.root.join('data/vote_item.yml').to_s
    thing = YAML.load_file(file)
    p thing.inspect

    render :nothing => true
  end

end