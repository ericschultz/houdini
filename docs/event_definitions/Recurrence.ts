// License: LGPL-3.0-or-later
import type { Amount, HoudiniEvent, HoudiniObject, IdType, UuidType } from "./common";
import type Nonprofit from './Nonprofit';
import { RecurrenceRule } from "./common";
import type Supporter from "./Nonprofit/Supporter";


export interface Recurrence extends HoudiniObject {
  amount: Amount;
	nonprofit: IdType | Nonprofit;
  object: 'recurrence';
  recurrences: RecurrenceRule[];
  supporter: IdType | Supporter;
  template: InvoiceTemplate;
}
