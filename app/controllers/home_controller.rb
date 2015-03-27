class HomeController < ApplicationController
  before_filter :pre_load

  def pre_load
    @type = 'book'
    @prepare_fields = 'count'
    @number = 2

    @type = params['type'] if params['type']
    @prepare_fields = params['prepare_fields'].strip if params['prepare_fields']
    @number = params[:number] if params[:number]
    @compare_field = params['compare_field'].strip if params['compare_field']

    # p params['compare']
    # p @compare
    # p '===='

    # @type = 'weibo'
    # @compare_count = ['weibo_count', 'fans_count']

    # file = Rails.root.join('data/vote_item.yml').to_s
    file = Rails.root.join("data/#{@type}.yml").to_s
    @things = YAML.load_file(file)
  end

  def index
    @compare_list = shuffle_list
    @compare_field = @prepare_fields.split(',').shuffle[0].strip

    # render :nothing => true
  end


  def show_game
    @compare_list = shuffle_list
    @compare_field = @prepare_fields.split(',').shuffle[0].strip

    render :file => 'home/_ajax_list', :layout => false
  end



  def receive
    check_item_ids = params['check_items']
    select_item_id = params['select_item']

    check_items = check_item_ids.map { |id| get_item(@things, id) }
    select_item = get_item(@things, select_item_id)

    # p check_items
    # p select_item

    render :json => {
      :check_items => check_items.compact, 
      :select_item => select_item
    }
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
        if thing['id'].to_s == id.to_s
          return {:id => id, :count => thing[@compare_field]}
        end
      end
      return nil
    end

end