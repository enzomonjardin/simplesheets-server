import { Schema, model, connect } from "mongoose";

export type SheetColumn = {
  key: number;
  name: string;
  valueType: "text" | "number";
};

export type SheetRow = {
  index: number;
  cells: {
    columnKey: number;
    value: string;
  };
};

interface ISheet {
  name: string;
  columns: SheetColumn[];
  rows: SheetRow[];
}

const sheetSchema = new Schema<ISheet>(
  {
    name: { type: String, required: true },
    columns: {
      type: [{ key: Number, name: String, valueType: String }],
      required: true,
    },
    rows: {
      type: [
        {
          index: Number,
          cells: [{ columnKey: Number, value: String }],
        },
      ],
      required: true,
    },
  },
  { timestamps: true },
);

const Sheet = model<ISheet>("Sheet", sheetSchema);

export default Sheet;
