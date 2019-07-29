# License: AGPL-3.0-or-later WITH Web-Template-Output-Additional-Permission-3.0-or-later
require 'rails_helper'
require 'controllers/support/shared_user_context'

describe ImageAttachmentsController, :type => :controller do
  describe 'authorization' do
    describe 'rejects unauthorized users' do
      describe 'create' do
        include_context :open_to_confirmed_users, :post, :create
      end

      describe 'remove' do
        include_context :open_to_confirmed_users, {method: :post, action: :remove}
      end
    end
  end
end