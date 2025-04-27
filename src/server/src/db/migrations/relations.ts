import { relations } from "drizzle-orm/relations";
import { admin, adminPasswordHist, lifeStyleCollectionItem, lifeStyleCollectionItemPage, lifeStyleCollectionPage, member, personalTraits, adminTrail, reservationHost, reservationSpace, reservation, reservationHist, reservationTimeSlot, reservationContent, coupon, couponPool, terms, vehicleRegistration, termsAgreement, couponPoolHist, termsAgreementHist } from "./schema";

export const adminPasswordHistRelations = relations(adminPasswordHist, ({one}) => ({
	admin: one(admin, {
		fields: [adminPasswordHist.adminId],
		references: [admin.id]
	}),
}));

export const adminRelations = relations(admin, ({many}) => ({
	adminPasswordHists: many(adminPasswordHist),
	adminTrails: many(adminTrail),
}));

export const lifeStyleCollectionItemPageRelations = relations(lifeStyleCollectionItemPage, ({one}) => ({
	lifeStyleCollectionItem: one(lifeStyleCollectionItem, {
		fields: [lifeStyleCollectionItemPage.itemId],
		references: [lifeStyleCollectionItem.id]
	}),
	lifeStyleCollectionPage: one(lifeStyleCollectionPage, {
		fields: [lifeStyleCollectionItemPage.pageId],
		references: [lifeStyleCollectionPage.id]
	}),
}));

export const lifeStyleCollectionItemRelations = relations(lifeStyleCollectionItem, ({many}) => ({
	lifeStyleCollectionItemPages: many(lifeStyleCollectionItemPage),
}));

export const lifeStyleCollectionPageRelations = relations(lifeStyleCollectionPage, ({many}) => ({
	lifeStyleCollectionItemPages: many(lifeStyleCollectionItemPage),
}));

export const personalTraitsRelations = relations(personalTraits, ({one}) => ({
	member: one(member, {
		fields: [personalTraits.memberId],
		references: [member.id]
	}),
}));

export const memberRelations = relations(member, ({many}) => ({
	personalTraits: many(personalTraits),
	reservations: many(reservation),
	couponPools: many(couponPool),
	vehicleRegistrations: many(vehicleRegistration),
	termsAgreements: many(termsAgreement),
}));

export const adminTrailRelations = relations(adminTrail, ({one}) => ({
	admin: one(admin, {
		fields: [adminTrail.adminId],
		references: [admin.id]
	}),
}));

export const reservationSpaceRelations = relations(reservationSpace, ({one, many}) => ({
	reservationHost: one(reservationHost, {
		fields: [reservationSpace.hostId],
		references: [reservationHost.id]
	}),
	reservationContents: many(reservationContent),
}));

export const reservationHostRelations = relations(reservationHost, ({many}) => ({
	reservationSpaces: many(reservationSpace),
	reservationContents: many(reservationContent),
}));

export const reservationHistRelations = relations(reservationHist, ({one}) => ({
	reservation: one(reservation, {
		fields: [reservationHist.reservationId],
		references: [reservation.id]
	}),
}));

export const reservationRelations = relations(reservation, ({one, many}) => ({
	reservationHists: many(reservationHist),
	member: one(member, {
		fields: [reservation.memberId],
		references: [member.id]
	}),
	reservationTimeSlot: one(reservationTimeSlot, {
		fields: [reservation.timeSlotId],
		references: [reservationTimeSlot.id]
	}),
}));

export const reservationTimeSlotRelations = relations(reservationTimeSlot, ({one, many}) => ({
	reservations: many(reservation),
	reservationContent: one(reservationContent, {
		fields: [reservationTimeSlot.contentId],
		references: [reservationContent.id]
	}),
}));

export const reservationContentRelations = relations(reservationContent, ({one, many}) => ({
	reservationSpace: one(reservationSpace, {
		fields: [reservationContent.spaceId],
		references: [reservationSpace.id]
	}),
	reservationHost: one(reservationHost, {
		fields: [reservationContent.hostId],
		references: [reservationHost.id]
	}),
	reservationTimeSlots: many(reservationTimeSlot),
	terms: many(terms),
}));

export const couponPoolRelations = relations(couponPool, ({one, many}) => ({
	coupon: one(coupon, {
		fields: [couponPool.couponId],
		references: [coupon.id]
	}),
	member: one(member, {
		fields: [couponPool.memberId],
		references: [member.id]
	}),
	couponPoolHists: many(couponPoolHist),
}));

export const couponRelations = relations(coupon, ({many}) => ({
	couponPools: many(couponPool),
}));

export const termsRelations = relations(terms, ({one, many}) => ({
	reservationContent: one(reservationContent, {
		fields: [terms.reservationContentId],
		references: [reservationContent.id]
	}),
	termsAgreements: many(termsAgreement),
}));

export const vehicleRegistrationRelations = relations(vehicleRegistration, ({one}) => ({
	member: one(member, {
		fields: [vehicleRegistration.memberId],
		references: [member.id]
	}),
}));

export const termsAgreementRelations = relations(termsAgreement, ({one, many}) => ({
	term: one(terms, {
		fields: [termsAgreement.termsId],
		references: [terms.id]
	}),
	member: one(member, {
		fields: [termsAgreement.memberId],
		references: [member.id]
	}),
	termsAgreementHists: many(termsAgreementHist),
}));

export const couponPoolHistRelations = relations(couponPoolHist, ({one}) => ({
	couponPool: one(couponPool, {
		fields: [couponPoolHist.couponPoolId],
		references: [couponPool.id]
	}),
}));

export const termsAgreementHistRelations = relations(termsAgreementHist, ({one}) => ({
	termsAgreement: one(termsAgreement, {
		fields: [termsAgreementHist.termsAgreementId],
		references: [termsAgreement.id]
	}),
}));