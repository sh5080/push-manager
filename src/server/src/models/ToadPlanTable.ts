import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ToadPlanTableAttributes {
  accessPredicates?: string;
  bytes?: any;
  cardinality?: any;
  cost?: any;
  cpuCost?: any;
  depth?: any;
  distribution?: string;
  filterPredicates?: string;
  id?: any;
  ioCost?: any;
  objectAlias?: string;
  objectInstance?: any;
  objectName?: string;
  objectNode?: string;
  objectOwner?: string;
  objectType?: string;
  operation?: string;
  optimizer?: string;
  options?: string;
  other?: any;
  otherTag?: string;
  otherXml?: any;
  parentId?: any;
  partitionId?: any;
  partitionStart?: string;
  partitionStop?: string;
  planId?: any;
  position?: any;
  projection?: string;
  qblockName?: string;
  remarks?: string;
  searchColumns?: any;
  statementId?: string;
  tempSpace?: any;
  time?: any;
  timestamp?: string;
}

export type ToadPlanTablePk = "id";
export type ToadPlanTableId = ToadPlanTable[ToadPlanTablePk];
export type ToadPlanTableOptionalAttributes = "accessPredicates" | "bytes" | "cardinality" | "cost" | "cpuCost" | "depth" | "distribution" | "filterPredicates" | "id" | "ioCost" | "objectAlias" | "objectInstance" | "objectName" | "objectNode" | "objectOwner" | "objectType" | "operation" | "optimizer" | "options" | "other" | "otherTag" | "otherXml" | "parentId" | "partitionId" | "partitionStart" | "partitionStop" | "planId" | "position" | "projection" | "qblockName" | "remarks" | "searchColumns" | "statementId" | "tempSpace" | "time" | "timestamp";
export type ToadPlanTableCreationAttributes = Optional<ToadPlanTableAttributes, ToadPlanTableOptionalAttributes>;

export class ToadPlanTable extends Model<ToadPlanTableAttributes, ToadPlanTableCreationAttributes> implements ToadPlanTableAttributes {
  accessPredicates?: string;
  bytes?: any;
  cardinality?: any;
  cost?: any;
  cpuCost?: any;
  depth?: any;
  distribution?: string;
  filterPredicates?: string;
  id?: any;
  ioCost?: any;
  objectAlias?: string;
  objectInstance?: any;
  objectName?: string;
  objectNode?: string;
  objectOwner?: string;
  objectType?: string;
  operation?: string;
  optimizer?: string;
  options?: string;
  other?: any;
  otherTag?: string;
  otherXml?: any;
  parentId?: any;
  partitionId?: any;
  partitionStart?: string;
  partitionStop?: string;
  planId?: any;
  position?: any;
  projection?: string;
  qblockName?: string;
  remarks?: string;
  searchColumns?: any;
  statementId?: string;
  tempSpace?: any;
  time?: any;
  timestamp?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ToadPlanTable {
    return ToadPlanTable.init({
    accessPredicates: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ACCESS_PREDICATES'
    },
    bytes: {
      type: "NUMBER",
      allowNull: true,
      field: 'BYTES'
    },
    cardinality: {
      type: "NUMBER",
      allowNull: true,
      field: 'CARDINALITY'
    },
    cost: {
      type: "NUMBER",
      allowNull: true,
      field: 'COST'
    },
    cpuCost: {
      type: "NUMBER",
      allowNull: true,
      field: 'CPU_COST'
    },
    depth: {
      type: "NUMBER",
      allowNull: true,
      field: 'DEPTH'
    },
    distribution: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DISTRIBUTION'
    },
    filterPredicates: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'FILTER_PREDICATES'
    },
    id: {
      type: "NUMBER",
      allowNull: true,
      primaryKey: true,
      field: 'ID'
    },
    ioCost: {
      type: "NUMBER",
      allowNull: true,
      field: 'IO_COST'
    },
    objectAlias: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBJECT_ALIAS'
    },
    objectInstance: {
      type: "NUMBER",
      allowNull: true,
      field: 'OBJECT_INSTANCE'
    },
    objectName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBJECT_NAME'
    },
    objectNode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBJECT_NODE'
    },
    objectOwner: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBJECT_OWNER'
    },
    objectType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBJECT_TYPE'
    },
    operation: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OPERATION'
    },
    optimizer: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OPTIMIZER'
    },
    options: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OPTIONS'
    },
    other: {
      type: "LONG",
      allowNull: true,
      field: 'OTHER'
    },
    otherTag: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OTHER_TAG'
    },
    otherXml: {
      type: "CLOB",
      allowNull: true,
      field: 'OTHER_XML'
    },
    parentId: {
      type: "NUMBER",
      allowNull: true,
      field: 'PARENT_ID'
    },
    partitionId: {
      type: "NUMBER",
      allowNull: true,
      field: 'PARTITION_ID'
    },
    partitionStart: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PARTITION_START'
    },
    partitionStop: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PARTITION_STOP'
    },
    planId: {
      type: "NUMBER",
      allowNull: true,
      field: 'PLAN_ID'
    },
    position: {
      type: "NUMBER",
      allowNull: true,
      field: 'POSITION'
    },
    projection: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PROJECTION'
    },
    qblockName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'QBLOCK_NAME'
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'REMARKS'
    },
    searchColumns: {
      type: "NUMBER",
      allowNull: true,
      field: 'SEARCH_COLUMNS'
    },
    statementId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'STATEMENT_ID'
    },
    tempSpace: {
      type: "NUMBER",
      allowNull: true,
      field: 'TEMP_SPACE'
    },
    time: {
      type: "NUMBER",
      allowNull: true,
      field: 'TIME'
    },
    timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'TIMESTAMP'
    }
  }, {
    sequelize,
    tableName: 'TOAD_PLAN_TABLE',
    schema: 'COKR_MBR_APP',
    timestamps: false
  });
  }
}
