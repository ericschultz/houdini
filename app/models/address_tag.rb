# License: AGPL-3.0-or-later WITH Web-Template-Output-Additional-Permission-3.0-or-later
class AddressTag < ActiveRecord::Base
  belongs_to :crm_address
  belongs_to :supporter

  attr_accessible :name, :supporter, :crm_address
end
