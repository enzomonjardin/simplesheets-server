import Sheet, { SheetColumn, SheetRow } from "../../model/Sheet";

type UpdateSheetInput = {
  id: string;
  name?: string;
  columns?: SheetColumn[];
  rows?: SheetRow[];
};

async function updateSheetMutation(_, params, { req }) {
  const logger = req.logger as Logger;
  const input = params.input as UpdateSheetInput;
  const { id, name, columns, rows } = input;
  logger.info({ id, columns: columns?.length, rows: rows?.length }, `Updating sheet with id ${id}`);
  const update = { name, columns, rows };
  try {
    const updatedSheet = await Sheet.findByIdAndUpdate(id, update, { new: true });
    logger.info({ id, updatedSheet }, `Updated sheet with id ${id} successfully`);
    return updatedSheet;
  } catch (error) {
    logger.error({ error: error.message, id, update }, `Failed to update sheet:${error.message}`);
    throw error;
  }
}

export default updateSheetMutation;
