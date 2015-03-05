class HomeController < ApplicationController
  before_filter :pre_load

  def pre_load
    file = Rails.root.join('data/vote_item.yml').to_s
    @things = YAML.load_file(file)

    @number = 3
    @number = params[:number] if params[:number]
  end

  def index
    @show_things = shuffle_list

    # p @show_things

    # render :nothing => true
  end


  def show_game
    @show_things = shuffle_list

    render :file => 'home/ajax_list', :layout => false
  end



  def receive
    check_item_ids = params['check_items']
    select_item_id = params['select_item']

    check_items = check_item_ids.map { |id| get_item(@things, id) }
    select_item = get_item(@things, select_item_id)

    # p check_items
    # p select_item

    render :json => {:check_items => check_items.compact, :select_item => select_item}
    # render :nothing => true
  end

  private
    def shuffle_list
      things = @things.shuffle

      list = []
      @number.to_i.times do |index|
        list << things[index]
      end
      list
    end

    def get_item(things, id)
      things.each do |thing|
        return {:id => id, :count => thing['count']} if thing['id'].to_i == id.to_i
      end
      return nil
    end

end