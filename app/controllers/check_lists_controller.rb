class CheckListsController < ApplicationController
  before_action :set_check_list, only: [:show, :update, :destroy]

  def index
    @check_lists = CheckList.all
    render json: @check_lists, include: :check_list_items
  end

  def show
    render json: @check_list, include: :check_list_items
  end

  def create
    @check_list = CheckList.new(check_list_params)
    if @check_list.save
      render json: @check_list, status: :created, location: @check_list
    else
      render json: @check_list.errors, status: :unprocessable_entity
    end
  end

  def update
    if @check_list.update(check_list_params)
      render json: @check_list
    else
      render json: @check_list.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @check_list.destroy
  end

  private

  def set_check_list
    @check_list = CheckList.find(params[:id])
  end

  def check_list_params
    params.require(:check_list).permit(:title, :description)
  end
end
