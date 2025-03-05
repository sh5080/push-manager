import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  index,
  uniqueIndex,
  uuid,
  geometry,
  boolean,
  serial,
  foreignKey,
  jsonb,
  numeric,
  pgView,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const appSettingKey = pgEnum("AppSettingKey", ["NOTICE_BAR", "FOOTER"]);
export const couponDiscountType = pgEnum("CouponDiscountType", [
  "AMOUNT",
  "RATIO",
  "PASS",
]);
export const couponIssuanceType = pgEnum("CouponIssuanceType", [
  "INSTANT",
  "POOL",
]);
export const couponKind = pgEnum("CouponKind", [
  "LG_TWINS_TICKET_DISCOUNT",
  "SUBSCRIPTION_REWARD",
]);
export const couponPoolStatus = pgEnum("CouponPoolStatus", [
  "PENDING",
  "ISSUED",
  "REDEEMED",
  "CANCELLED",
]);
export const termsKind = pgEnum("TermsKind", ["A_P_V_KR", "A_P3_V_KR"]);

export const pushSendLogStatus = pgEnum("PushSendLogStatus", [
  "PENDING",
  "COMPLETED",
  "FAILED",
]);

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar({ length: 36 }).notNull(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const spatialRefSys = pgTable("spatial_ref_sys", {
  srid: integer().notNull(),
  authName: varchar("auth_name", { length: 256 }),
  authSrid: integer("auth_srid"),
  srtext: varchar({ length: 2048 }),
  proj4Text: varchar({ length: 2048 }),
});

export const location = pgTable(
  "location",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    sn: varchar({ length: 50 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    address: varchar({ length: 255 }).notNull(),
    coordinates: geometry({ type: "point", srid: 4326 }).notNull(),
    phoneNumber: varchar({ length: 20 }).notNull(),
    hasParking: boolean().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    index("location_coordinates_idx").using(
      "gist",
      table.coordinates.asc().nullsLast().op("gist_geometry_ops_2d")
    ),
    index("location_name_address_idx").using(
      "gin",
      table.name.asc().nullsLast().op("gin_trgm_ops"),
      table.address.asc().nullsLast().op("gin_trgm_ops")
    ),
    uniqueIndex("location_sn_key").using(
      "btree",
      table.sn.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const subscriptionRewardRequest = pgTable("subscriptionRewardRequest", {
  id: serial().notNull(),
  memNo: varchar({ length: 255 }).notNull(),
  grade: varchar({ length: 4 }).notNull(),
  itemName: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  contractSn: varchar({ length: 255 }).notNull(),
  gradeStDate: timestamp({ precision: 3, mode: "string" }).notNull(),
  itemCode: varchar({ length: 255 }).notNull(),
});

export const adminPasswordHist = pgTable(
  "adminPasswordHist",
  {
    id: serial().notNull(),
    password: varchar({ length: 255 }).notNull(),
    salt: varchar({ length: 255 }).notNull(),
    adminId: uuid().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.adminId],
      foreignColumns: [admin.id],
      name: "adminPasswordHist_adminId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const admin = pgTable(
  "admin",
  {
    id: uuid().defaultRandom().notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    salt: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    phoneNumber: varchar({ length: 20 }).notNull(),
    twoFas: jsonb().default({}).notNull(),
    permissions: jsonb().default({ role: "ADMIN", custom: {} }).notNull(),
    isActive: boolean().default(true).notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    lastLoginAt: timestamp({ precision: 3, mode: "string" }),
    requiresPasswordChange: boolean().default(true).notNull(),
  },
  (table) => [
    uniqueIndex("admin_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const appSetting = pgTable(
  "appSetting",
  {
    id: uuid().defaultRandom().notNull(),
    key: appSettingKey().notNull(),
    value: jsonb().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("appSetting_key_key").using(
      "btree",
      table.key.asc().nullsLast().op("enum_ops")
    ),
  ]
);

export const apiKey = pgTable(
  "apiKey",
  {
    id: uuid().defaultRandom().notNull(),
    apiKey: varchar({ length: 50 }).notNull(),
    key: varchar({ length: 200 }).notNull(),
    iv: varchar({ length: 200 }).notNull(),
    isActive: boolean().default(true).notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("apiKey_apiKey_key").using(
      "btree",
      table.apiKey.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const maintenance = pgTable("maintenance", {
  id: serial().notNull(),
  description: text().notNull(),
  startAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  endAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  isActive: boolean().default(false).notNull(),
  createdAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  noticeAt: timestamp({ precision: 3, mode: "string" }),
});

export const couponPool = pgTable(
  "couponPool",
  {
    id: uuid().defaultRandom().notNull(),
    sn: varchar({ length: 50 }).notNull(),
    status: couponPoolStatus().notNull(),
    issuedAt: timestamp({ precision: 3, mode: "string" }),
    redeemedAt: timestamp({ precision: 3, mode: "string" }),
    startDate: timestamp({ precision: 3, mode: "string" }).notNull(),
    endDate: timestamp({ precision: 3, mode: "string" }).notNull(),
    couponId: uuid().notNull(),
    memberId: uuid(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("couponPool_sn_key").using(
      "btree",
      table.sn.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.couponId],
      foreignColumns: [coupon.id],
      name: "couponPool_couponId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.memberId],
      foreignColumns: [member.id],
      name: "couponPool_memberId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

export const vehicleRegistration = pgTable(
  "vehicleRegistration",
  {
    id: uuid().defaultRandom().notNull(),
    no: varchar({ length: 20 }).notNull(),
    memberId: uuid().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("vehicleRegistration_no_key").using(
      "btree",
      table.no.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.memberId],
      foreignColumns: [member.id],
      name: "vehicleRegistration_memberId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const termsAgreement = pgTable(
  "termsAgreement",
  {
    id: uuid().defaultRandom().notNull(),
    isAgreed: boolean().notNull(),
    termsId: uuid().notNull(),
    memberId: uuid().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("termsAgreement_termsId_memberId_key").using(
      "btree",
      table.termsId.asc().nullsLast().op("uuid_ops"),
      table.memberId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.termsId],
      foreignColumns: [terms.id],
      name: "termsAgreement_termsId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.memberId],
      foreignColumns: [member.id],
      name: "termsAgreement_memberId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const couponPoolHist = pgTable(
  "couponPoolHist",
  {
    id: serial().notNull(),
    status: couponPoolStatus().notNull(),
    note: text(),
    couponPoolId: uuid().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.couponPoolId],
      foreignColumns: [couponPool.id],
      name: "couponPoolHist_couponPoolId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const member = pgTable(
  "member",
  {
    id: uuid().defaultRandom().notNull(),
    email: varchar({ length: 255 }),
    name: varchar({ length: 255 }),
    phoneNumber: varchar({ length: 20 }),
    permissions: jsonb().default({ role: "MEMBER", custom: {} }).notNull(),
    unifyId: varchar({ length: 255 }).notNull(),
    ci: varchar({ length: 255 }).notNull(),
    memNo: varchar({ length: 255 }).notNull(),
    isActive: boolean().default(true).notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    mbti: varchar({ length: 4 }),
    mbtiCreatedAt: timestamp({ precision: 3, mode: "string" }),
    mbtiUpdatedAt: timestamp({ precision: 3, mode: "string" }),
  },
  (table) => [
    uniqueIndex("member_ci_key").using(
      "btree",
      table.ci.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("member_memNo_key").using(
      "btree",
      table.memNo.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("member_unifyId_key").using(
      "btree",
      table.unifyId.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const terms = pgTable(
  "terms",
  {
    id: uuid().defaultRandom().notNull(),
    kind: termsKind().notNull(),
    rev: integer().notNull(),
    link: varchar({ length: 2048 }).notNull(),
    isMandatory: boolean().default(false).notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("terms_kind_rev_key").using(
      "btree",
      table.kind.asc().nullsLast().op("int4_ops"),
      table.rev.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const coupon = pgTable("coupon", {
  id: uuid().defaultRandom().notNull(),
  kind: couponKind().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  instructions: text().notNull(),
  issuanceType: couponIssuanceType().notNull(),
  discountType: couponDiscountType().notNull(),
  discountValue: numeric({ precision: 19, scale: 4 }).default("0").notNull(),
  maxDiscount: numeric({ precision: 19, scale: 4 }).default("0").notNull(),
  policy: jsonb().default({}).notNull(),
  startDate: timestamp({ precision: 3, mode: "string" }).notNull(),
  endDate: timestamp({ precision: 3, mode: "string" }).notNull(),
  createdAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
});

export const termsAgreementHist = pgTable(
  "termsAgreementHist",
  {
    id: serial().notNull(),
    isAgreed: boolean().notNull(),
    termsAgreementId: uuid().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.termsAgreementId],
      foreignColumns: [termsAgreement.id],
      name: "termsAgreementHist_termsAgreementId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const pushSendLog = pgTable("pushSendLog", {
  id: serial().primaryKey(),
  totalCount: integer().notNull(),
  currentCount: integer().notNull().default(0),
  status: pushSendLogStatus().notNull(),
  pushId: varchar({ length: 255 }),
  lastProcessedId: varchar({ length: 255 }),
  errorMessage: text(),
  createdAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
});

// export const geographyColumns = pgView("geography_columns", {
//   // TODO: failed to parse database type 'name'
//   fTableCatalog: unknown("f_table_catalog"),
//   // TODO: failed to parse database type 'name'
//   fTableSchema: unknown("f_table_schema"),
//   // TODO: failed to parse database type 'name'
//   fTableName: unknown("f_table_name"),
//   // TODO: failed to parse database type 'name'
//   fGeographyColumn: unknown("f_geography_column"),
//   coordDimension: integer("coord_dimension"),
//   srid: integer(),
//   type: text(),
// }).as(
//   sql`SELECT current_database() AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geography_column, postgis_typmod_dims(a.atttypmod) AS coord_dimension, postgis_typmod_srid(a.atttypmod) AS srid, postgis_typmod_type(a.atttypmod) AS type FROM pg_class c, pg_attribute a, pg_type t, pg_namespace n WHERE t.typname = 'geography'::name AND a.attisdropped = false AND a.atttypid = t.oid AND a.attrelid = c.oid AND c.relnamespace = n.oid AND (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`
// );

// export const geometryColumns = pgView("geometry_columns", {
//   fTableCatalog: varchar("f_table_catalog", { length: 256 }),
//   // TODO: failed to parse database type 'name'
//   fTableSchema: unknown("f_table_schema"),
//   // TODO: failed to parse database type 'name'
//   fTableName: unknown("f_table_name"),
//   // TODO: failed to parse database type 'name'
//   fGeometryColumn: unknown("f_geometry_column"),
//   coordDimension: integer("coord_dimension"),
//   srid: integer(),
//   type: varchar({ length: 30 }),
// }).as(
//   sql`SELECT current_database()::character varying(256) AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geometry_column, COALESCE(postgis_typmod_dims(a.atttypmod), sn.ndims, 2) AS coord_dimension, COALESCE(NULLIF(postgis_typmod_srid(a.atttypmod), 0), sr.srid, 0) AS srid, replace(replace(COALESCE(NULLIF(upper(postgis_typmod_type(a.atttypmod)), 'GEOMETRY'::text), st.type, 'GEOMETRY'::text), 'ZM'::text, ''::text), 'Z'::text, ''::text)::character varying(30) AS type FROM pg_class c JOIN pg_attribute a ON a.attrelid = c.oid AND NOT a.attisdropped JOIN pg_namespace n ON c.relnamespace = n.oid JOIN pg_type t ON a.atttypid = t.oid LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ''''::text, 2), ')'::text, ''::text) AS type FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%geometrytype(% = %'::text) st ON st.connamespace = n.oid AND st.conrelid = c.oid AND (a.attnum = ANY (st.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text)::integer AS ndims FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%ndims(% = %'::text) sn ON sn.connamespace = n.oid AND sn.conrelid = c.oid AND (a.attnum = ANY (sn.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text), '('::text, ''::text)::integer AS srid FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%srid(% = %'::text) sr ON sr.connamespace = n.oid AND sr.conrelid = c.oid AND (a.attnum = ANY (sr.conkey)) WHERE (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT c.relname = 'raster_columns'::name AND t.typname = 'geometry'::name AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`
// );
