import { pgTable, varchar, timestamp, text, integer, check, index, uniqueIndex, uuid, geometry, boolean, serial, foreignKey, jsonb, numeric, pgView, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const activityKind = pgEnum("ActivityKind", ['CPA_COMPLETED', 'EVENT_COMPLETED'])
export const adminTrailKind = pgEnum("AdminTrailKind", ['AUDIT_LOG'])
export const appSettingKey = pgEnum("AppSettingKey", ['NOTICE_BAR', 'FOOTER'])
export const couponDiscountType = pgEnum("CouponDiscountType", ['AMOUNT', 'RATIO', 'PASS'])
export const couponIssuanceType = pgEnum("CouponIssuanceType", ['INSTANT', 'POOL'])
export const couponKind = pgEnum("CouponKind", ['LG_TWINS_TICKET_DISCOUNT', 'SUBSCRIPTION_REWARD', 'FREE_ADMISSION_ART_CENTER_SHOW'])
export const couponPoolStatus = pgEnum("CouponPoolStatus", ['PENDING', 'ISSUED', 'REDEEMED', 'CANCELLED'])
export const downloadLinkKind = pgEnum("DownloadLinkKind", ['EXCEL_LIFE_STYLE_COLLECTION', 'EXCEL_COUPON', 'EXCEL_RESERVATION'])
export const downloadLinkStatus = pgEnum("DownloadLinkStatus", ['PENDING', 'OK', 'FAILED'])
export const lifeStyleCollectionItemType = pgEnum("LifeStyleCollectionItemType", ['SELECT', 'MULTI_SELECT', 'DATE', 'INPUT', 'TEXTAREA'])
export const lifeStyleCollectionPageKind = pgEnum("LifeStyleCollectionPageKind", ['STEP', 'LIST'])
export const personalTraitsKind = pgEnum("PersonalTraitsKind", ['LIFE_STYLE_COLLECTION'])
export const reservationHostKind = pgEnum("ReservationHostKind", ['ART_CENTER'])
export const reservationStatus = pgEnum("ReservationStatus", ['PENDING', 'CONFIRMED', 'USED', 'CANCELLED', 'NOSHOW'])
export const termsKind = pgEnum("TermsKind", ['MEMBERSHIP', 'RESERVATION'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const spatialRefSys = pgTable("spatial_ref_sys", {
	srid: integer().notNull(),
	authName: varchar("auth_name", { length: 256 }),
	authSrid: integer("auth_srid"),
	srtext: varchar({ length: 2048 }),
	proj4Text: varchar({ length: 2048 }),
}, (table) => [
	check("spatial_ref_sys_srid_check", sql`(srid > 0) AND (srid <= 998999)`),
]);

export const location = pgTable("location", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sn: varchar({ length: 50 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	address: varchar({ length: 255 }).notNull(),
	coordinates: geometry({ type: "point", srid: 4326 }).notNull(),
	phoneNumber: varchar({ length: 20 }).notNull(),
	hasParking: boolean().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	index("location_coordinates_idx").using("gist", table.coordinates.asc().nullsLast().op("gist_geometry_ops_2d")),
	index("location_name_address_idx").using("gin", table.name.asc().nullsLast().op("gin_trgm_ops"), table.address.asc().nullsLast().op("gin_trgm_ops")),
	uniqueIndex("location_sn_key").using("btree", table.sn.asc().nullsLast().op("text_ops")),
]);

export const subscriptionRewardRequest = pgTable("subscriptionRewardRequest", {
	id: serial().notNull(),
	memNo: varchar({ length: 255 }).notNull(),
	grade: varchar({ length: 4 }).notNull(),
	itemName: varchar({ length: 255 }).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	contractSn: varchar({ length: 255 }).notNull(),
	gradeStDate: timestamp({ precision: 3, mode: 'string' }).notNull(),
	itemCode: varchar({ length: 255 }).notNull(),
});

export const adminPasswordHist = pgTable("adminPasswordHist", {
	id: serial().notNull(),
	password: varchar({ length: 255 }).notNull(),
	salt: varchar({ length: 255 }).notNull(),
	adminId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.adminId],
			foreignColumns: [admin.id],
			name: "adminPasswordHist_adminId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const downloadLink = pgTable("downloadLink", {
	id: uuid().defaultRandom().notNull(),
	kind: downloadLinkKind().notNull(),
	status: downloadLinkStatus().notNull(),
	name: varchar({ length: 255 }).notNull(),
	link: varchar({ length: 2048 }).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const lifeStyleCollectionItem = pgTable("lifeStyleCollectionItem", {
	id: uuid().defaultRandom().notNull(),
	name: varchar({ length: 255 }).notNull(),
	type: lifeStyleCollectionItemType().notNull(),
	options: jsonb().default({}).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const lifeStyleCollectionItemPage = pgTable("lifeStyleCollectionItemPage", {
	id: uuid().defaultRandom().notNull(),
	itemId: uuid().notNull(),
	pageId: uuid().notNull(),
	index: text().notNull(),
}, (table) => [
	uniqueIndex("lifeStyleCollectionItemPage_itemId_pageId_key").using("btree", table.itemId.asc().nullsLast().op("uuid_ops"), table.pageId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("lifeStyleCollectionItemPage_pageId_index_key").using("btree", table.pageId.asc().nullsLast().op("text_ops"), table.index.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.itemId],
			foreignColumns: [lifeStyleCollectionItem.id],
			name: "lifeStyleCollectionItemPage_itemId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.pageId],
			foreignColumns: [lifeStyleCollectionPage.id],
			name: "lifeStyleCollectionItemPage_pageId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const lifeStyleCollectionPage = pgTable("lifeStyleCollectionPage", {
	id: uuid().defaultRandom().notNull(),
	name: varchar({ length: 255 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	subTitle: varchar({ length: 255 }).notNull(),
	kind: lifeStyleCollectionPageKind().default('STEP').notNull(),
	buttonName: varchar({ length: 255 }).notNull(),
	index: text().notNull(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("lifeStyleCollectionPage_index_key").using("btree", table.index.asc().nullsLast().op("text_ops")),
]);

export const personalTraits = pgTable("personalTraits", {
	id: uuid().defaultRandom().notNull(),
	kind: personalTraitsKind().notNull(),
	values: jsonb().default({}).notNull(),
	memberId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("personalTraits_kind_memberId_key").using("btree", table.kind.asc().nullsLast().op("uuid_ops"), table.memberId.asc().nullsLast().op("uuid_ops")),
	index("personalTraits_values_idx").using("gin", table.values.asc().nullsLast().op("jsonb_ops")),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [member.id],
			name: "personalTraits_memberId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const adminTrail = pgTable("adminTrail", {
	id: uuid().defaultRandom().notNull(),
	kind: adminTrailKind().notNull(),
	value: jsonb().notNull(),
	adminId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("adminTrail_value_idx").using("gin", table.value.asc().nullsLast().op("jsonb_ops")),
	foreignKey({
			columns: [table.adminId],
			foreignColumns: [admin.id],
			name: "adminTrail_adminId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const reservationHost = pgTable("reservationHost", {
	id: uuid().defaultRandom().notNull(),
	kind: reservationHostKind().notNull(),
	name: varchar({ length: 35 }).notNull(),
	address: jsonb().notNull(),
	phoneNumber: varchar({ length: 20 }),
	operatingStartAt: timestamp({ precision: 3, mode: 'string' }),
	operatingEndAt: timestamp({ precision: 3, mode: 'string' }),
	operatingHours: jsonb().notNull(),
	holidays: jsonb(),
	description: text().notNull(),
	images: varchar({ length: 2048 }).array(),
	instructions: text(),
	displayStartAt: timestamp({ precision: 3, mode: 'string' }),
	displayEndAt: timestamp({ precision: 3, mode: 'string' }),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const reservationSpace = pgTable("reservationSpace", {
	id: uuid().defaultRandom().notNull(),
	name: varchar({ length: 35 }).notNull(),
	description: text().notNull(),
	hostId: uuid().notNull(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.hostId],
			foreignColumns: [reservationHost.id],
			name: "reservationSpace_hostId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const admin = pgTable("admin", {
	id: uuid().defaultRandom().notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	salt: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	phoneNumber: varchar({ length: 20 }).notNull(),
	twoFas: jsonb().default({}).notNull(),
	permissions: jsonb().default({"role":"ADMIN","custom":{}}).notNull(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	lastLoginAt: timestamp({ precision: 3, mode: 'string' }),
	requiresPasswordChange: boolean().default(true).notNull(),
}, (table) => [
	uniqueIndex("admin_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const activity = pgTable("activity", {
	id: serial().primaryKey().notNull(),
	kind: activityKind().notNull(),
	value: jsonb().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("activity_value_idx").using("gin", table.value.asc().nullsLast().op("jsonb_ops")),
]);

export const reservationContent = pgTable("reservationContent", {
	id: uuid().defaultRandom().notNull(),
	name: varchar({ length: 35 }).notNull(),
	description: text().notNull(),
	images: varchar({ length: 2048 }).array(),
	instructions: text(),
	contactInfo: jsonb(),
	restrictionConfig: jsonb(),
	confirmConfig: jsonb().notNull(),
	displayStartAt: timestamp({ precision: 3, mode: 'string' }),
	displayEndAt: timestamp({ precision: 3, mode: 'string' }),
	openStartAt: timestamp({ precision: 3, mode: 'string' }),
	openEndAt: timestamp({ precision: 3, mode: 'string' }),
	operatingStartAt: timestamp({ precision: 3, mode: 'string' }),
	operatingEndAt: timestamp({ precision: 3, mode: 'string' }),
	hostId: uuid().notNull(),
	spaceId: uuid(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	index("reservationContent_isActive_displayStartAt_displayEndAt_idx").using("btree", table.isActive.asc().nullsLast().op("bool_ops"), table.displayStartAt.asc().nullsLast().op("bool_ops"), table.displayEndAt.asc().nullsLast().op("timestamp_ops")),
	foreignKey({
			columns: [table.hostId],
			foreignColumns: [reservationHost.id],
			name: "reservationContent_hostId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.spaceId],
			foreignColumns: [reservationSpace.id],
			name: "reservationContent_spaceId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const reservationTimeSlot = pgTable("reservationTimeSlot", {
	id: uuid().defaultRandom().notNull(),
	startAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	endAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	totalCapacity: integer().notNull(),
	minGroupSize: integer().notNull(),
	maxGroupSize: integer().notNull(),
	openConfig: jsonb().notNull(),
	contentId: uuid().notNull(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	index("reservationTimeSlot_contentId_isActive_startAt_idx").using("btree", table.contentId.asc().nullsLast().op("uuid_ops"), table.isActive.asc().nullsLast().op("uuid_ops"), table.startAt.asc().nullsLast().op("bool_ops")),
	foreignKey({
			columns: [table.contentId],
			foreignColumns: [reservationContent.id],
			name: "reservationTimeSlot_contentId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const reservation = pgTable("reservation", {
	id: uuid().defaultRandom().notNull(),
	sn: varchar({ length: 50 }).notNull(),
	status: reservationStatus().notNull(),
	groupSize: integer().notNull(),
	phoneNumber: varchar({ length: 20 }).notNull(),
	timeSlotId: uuid().notNull(),
	memberId: uuid().notNull(),
	couponPoolId: uuid(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("reservation_couponPoolId_key").using("btree", table.couponPoolId.asc().nullsLast().op("uuid_ops")),
	index("reservation_memberId_status_idx").using("btree", table.memberId.asc().nullsLast().op("uuid_ops"), table.status.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("reservation_sn_key").using("btree", table.sn.asc().nullsLast().op("text_ops")),
	index("reservation_timeSlotId_status_idx").using("btree", table.timeSlotId.asc().nullsLast().op("uuid_ops"), table.status.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.timeSlotId],
			foreignColumns: [reservationTimeSlot.id],
			name: "reservation_timeSlotId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [member.id],
			name: "reservation_memberId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.couponPoolId],
			foreignColumns: [couponPool.id],
			name: "reservation_couponPoolId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const terms = pgTable("terms", {
	id: uuid().defaultRandom().notNull(),
	kind: termsKind().notNull(),
	sn: varchar({ length: 50 }).notNull(),
	name: varchar({ length: 35 }).notNull(),
	rev: integer().notNull(),
	link: varchar({ length: 2048 }).notNull(),
	isMandatory: boolean().default(false).notNull(),
	reservationContentId: uuid(),
	index: text().notNull(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("terms_kind_index_key").using("btree", table.kind.asc().nullsLast().op("text_ops"), table.index.asc().nullsLast().op("enum_ops")),
	uniqueIndex("terms_sn_rev_key").using("btree", table.sn.asc().nullsLast().op("text_ops"), table.rev.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.reservationContentId],
			foreignColumns: [reservationContent.id],
			name: "terms_reservationContentId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const termsAgreement = pgTable("termsAgreement", {
	id: uuid().defaultRandom().notNull(),
	isAgreed: boolean().notNull(),
	termsId: uuid().notNull(),
	memberId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("termsAgreement_termsId_memberId_key").using("btree", table.termsId.asc().nullsLast().op("uuid_ops"), table.memberId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.termsId],
			foreignColumns: [terms.id],
			name: "termsAgreement_termsId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [member.id],
			name: "termsAgreement_memberId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const termsAgreementHist = pgTable("termsAgreementHist", {
	id: serial().notNull(),
	isAgreed: boolean().notNull(),
	termsAgreementId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.termsAgreementId],
			foreignColumns: [termsAgreement.id],
			name: "termsAgreementHist_termsAgreementId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const appSetting = pgTable("appSetting", {
	id: uuid().defaultRandom().notNull(),
	key: appSettingKey().notNull(),
	value: jsonb().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("appSetting_key_key").using("btree", table.key.asc().nullsLast().op("enum_ops")),
]);

export const apiKey = pgTable("apiKey", {
	id: uuid().defaultRandom().notNull(),
	apiKey: varchar({ length: 50 }).notNull(),
	key: varchar({ length: 200 }).notNull(),
	iv: varchar({ length: 200 }).notNull(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("apiKey_apiKey_key").using("btree", table.apiKey.asc().nullsLast().op("text_ops")),
]);

export const maintenance = pgTable("maintenance", {
	id: serial().notNull(),
	description: text().notNull(),
	startAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	endAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	isActive: boolean().default(false).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	noticeAt: timestamp({ precision: 3, mode: 'string' }),
});

export const couponPool = pgTable("couponPool", {
	id: uuid().defaultRandom().notNull(),
	sn: varchar({ length: 50 }).notNull(),
	status: couponPoolStatus().notNull(),
	issuedAt: timestamp({ precision: 3, mode: 'string' }),
	redeemedAt: timestamp({ precision: 3, mode: 'string' }),
	startDate: timestamp({ precision: 3, mode: 'string' }).notNull(),
	endDate: timestamp({ precision: 3, mode: 'string' }).notNull(),
	couponId: uuid().notNull(),
	memberId: uuid(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	gradeAtIssue: varchar({ length: 4 }),
}, (table) => [
	index("couponPool_memberId_status_idx").using("btree", table.memberId.asc().nullsLast().op("uuid_ops"), table.status.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("couponPool_sn_key").using("btree", table.sn.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.couponId],
			foreignColumns: [coupon.id],
			name: "couponPool_couponId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [member.id],
			name: "couponPool_memberId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const vehicleRegistration = pgTable("vehicleRegistration", {
	id: uuid().defaultRandom().notNull(),
	no: varchar({ length: 20 }).notNull(),
	memberId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("vehicleRegistration_no_key").using("btree", table.no.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [member.id],
			name: "vehicleRegistration_memberId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const couponPoolHist = pgTable("couponPoolHist", {
	id: serial().notNull(),
	status: couponPoolStatus().notNull(),
	note: text(),
	couponPoolId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.couponPoolId],
			foreignColumns: [couponPool.id],
			name: "couponPoolHist_couponPoolId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const member = pgTable("member", {
	id: uuid().defaultRandom().notNull(),
	email: varchar({ length: 255 }),
	name: varchar({ length: 255 }),
	phoneNumber: varchar({ length: 20 }),
	permissions: jsonb().default({"role":"MEMBER","custom":{}}).notNull(),
	unifyId: varchar({ length: 255 }).notNull(),
	ci: varchar({ length: 255 }).notNull(),
	memNo: varchar({ length: 255 }).notNull(),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
	mbti: varchar({ length: 4 }),
	mbtiCreatedAt: timestamp({ precision: 3, mode: 'string' }),
	mbtiUpdatedAt: timestamp({ precision: 3, mode: 'string' }),
}, (table) => [
	uniqueIndex("member_ci_key").using("btree", table.ci.asc().nullsLast().op("text_ops")),
	uniqueIndex("member_memNo_key").using("btree", table.memNo.asc().nullsLast().op("text_ops")),
	uniqueIndex("member_unifyId_key").using("btree", table.unifyId.asc().nullsLast().op("text_ops")),
]);

export const coupon = pgTable("coupon", {
	id: uuid().defaultRandom().notNull(),
	kind: couponKind().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	instructions: text().notNull(),
	issuanceType: couponIssuanceType().notNull(),
	discountType: couponDiscountType().notNull(),
	discountValue: numeric({ precision: 19, scale:  4 }).default('0').notNull(),
	maxDiscount: numeric({ precision: 19, scale:  4 }).default('0').notNull(),
	policy: jsonb().default({}).notNull(),
	startDate: timestamp({ precision: 3, mode: 'string' }).notNull(),
	endDate: timestamp({ precision: 3, mode: 'string' }).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const reservationHist = pgTable("reservationHist", {
	id: serial().notNull(),
	status: reservationStatus().notNull(),
	reasonCode: text().notNull(),
	changes: jsonb(),
	note: text(),
	reservationId: uuid().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("reservationHist_reservationId_createdAt_idx").using("btree", table.reservationId.asc().nullsLast().op("timestamp_ops"), table.createdAt.asc().nullsLast().op("timestamp_ops")),
	foreignKey({
			columns: [table.reservationId],
			foreignColumns: [reservation.id],
			name: "reservationHist_reservationId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);
