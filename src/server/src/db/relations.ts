import { relations } from "drizzle-orm/relations";
import {
  admin,
  adminPasswordHist,
  coupon,
  couponPool,
  member,
  vehicleRegistration,
  terms,
  termsAgreement,
  couponPoolHist,
  termsAgreementHist,
  pushSendLog,
  pushSendErrorLog,
} from "./schema";

export const adminPasswordHistRelations = relations(
  adminPasswordHist,
  ({ one }) => ({
    admin: one(admin, {
      fields: [adminPasswordHist.adminId],
      references: [admin.id],
    }),
  })
);

export const adminRelations = relations(admin, ({ many }) => ({
  adminPasswordHists: many(adminPasswordHist),
}));

export const couponPoolRelations = relations(couponPool, ({ one, many }) => ({
  coupon: one(coupon, {
    fields: [couponPool.couponId],
    references: [coupon.id],
  }),
  member: one(member, {
    fields: [couponPool.memberId],
    references: [member.id],
  }),
  couponPoolHists: many(couponPoolHist),
}));

export const couponRelations = relations(coupon, ({ many }) => ({
  couponPools: many(couponPool),
}));

export const memberRelations = relations(member, ({ many }) => ({
  couponPools: many(couponPool),
  vehicleRegistrations: many(vehicleRegistration),
  termsAgreements: many(termsAgreement),
}));

export const vehicleRegistrationRelations = relations(
  vehicleRegistration,
  ({ one }) => ({
    member: one(member, {
      fields: [vehicleRegistration.memberId],
      references: [member.id],
    }),
  })
);

export const termsAgreementRelations = relations(
  termsAgreement,
  ({ one, many }) => ({
    term: one(terms, {
      fields: [termsAgreement.termsId],
      references: [terms.id],
    }),
    member: one(member, {
      fields: [termsAgreement.memberId],
      references: [member.id],
    }),
    termsAgreementHists: many(termsAgreementHist),
  })
);

export const termsRelations = relations(terms, ({ many }) => ({
  termsAgreements: many(termsAgreement),
}));

export const couponPoolHistRelations = relations(couponPoolHist, ({ one }) => ({
  couponPool: one(couponPool, {
    fields: [couponPoolHist.couponPoolId],
    references: [couponPool.id],
  }),
}));

export const termsAgreementHistRelations = relations(
  termsAgreementHist,
  ({ one }) => ({
    termsAgreement: one(termsAgreement, {
      fields: [termsAgreementHist.termsAgreementId],
      references: [termsAgreement.id],
    }),
  })
);

export const pushSendLogRelations = relations(pushSendLog, ({ many }) => ({
  pushSendErrorLogs: many(pushSendErrorLog),
}));

export const pushSendErrorLogRelations = relations(
  pushSendErrorLog,
  ({ one }) => ({
    pushSendLog: one(pushSendLog, {
      fields: [pushSendErrorLog.pushSendLogId],
      references: [pushSendLog.id],
    }),
  })
);
