class CheckListItemsController < ApplicationController
  before_action :set_check_list_item, only: [:update, :destroy]
  before_action :set_check_list, only: [:index, :create]

  # GET /check_list_items
  def index
    render json: @check_list.check_list_items
  end

  # POST /check_list_items
  def create
    @check_list_item = @check_list.check_list_items.build(check_list_item_params)

    if @check_list_item.save
      render json: @check_list_item, status: :created
    else
      render json: @check_list_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /check_list_items/:id
  def update
    if @check_list_item.update(check_list_item_params)
      render json: @check_list_item
    else
      render json: @check_list_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /check_list_items/:id
  def destroy
    @check_list_item.destroy
  end

  private

    def set_check_list
      @check_list = CheckList.last
    end

    def set_check_list_item
      @check_list_item = CheckListItem.find(params[:id])
    end

    def check_list_item_params
      params.require(:check_list_item).permit(:text, :completed)
    end
end