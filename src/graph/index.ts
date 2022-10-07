import { gql } from "apollo-server-express";
import createSheetMutation from "./resolvers/createSheetMutation";
import sheetResolver from "./resolvers/sheetResolver";
import updateSheetMutation from "./resolvers/updateSheetMutation";
import { dateScalar } from "./scalars";

export const typeDefs = gql`
  scalar Date

  type SheetColumn {
    key: Int!
    name: String
    valueType: String
  }

  type SheetCell {
    columnKey: Int!
    value: String
  }

  type SheetRow {
    index: Int!
    cells: [SheetCell!]!
  }

  type Sheet {
    id: ID!
    name: String
    createdAt: Date
    updatedAt: Date
    columns: [SheetColumn!]
    rows: [SheetRow!]
  }

  type Query {
    sheet(id: ID!): Sheet
  }

  input CreateSheetInput {
    name: String
  }

  input SheetColumnInput {
    key: Int!
    name: String
    valueType: String
  }

  input SheetRowCellInput {
    columnKey: Int!
    value: String
  }

  input SheetRowInput {
    index: Int!
    cells: [SheetRowCellInput!]!
  }

  input UpdateSheetInput {
    id: ID!
    name: String
    columns: [SheetColumnInput]
    rows: [SheetRowInput]
  }

  type Mutation {
    createSheet(input: CreateSheetInput): Sheet
    updateSheet(input: UpdateSheetInput!): Sheet
  }
`;

export const resolvers = {
  Date: dateScalar,
  Query: {
    sheet: sheetResolver,
  },
  Mutation: {
    createSheet: createSheetMutation,
    updateSheet: updateSheetMutation,
  },
};
