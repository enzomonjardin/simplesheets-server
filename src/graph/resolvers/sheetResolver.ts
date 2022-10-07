import Sheet from "../../model/Sheet";

async function sheetResolver(_, params, { req }) {
  const logger = req.logger as Logger;
  const id = params.id as string;

  logger.info(`Finding sheet with id ${id}`);

  try {
    const sheet = await Sheet.findById(id);

    if (sheet) {
      logger.info({ id, columns: sheet.columns?.length, rows: sheet.rows?.length }, `Found sheet with id ${id}`);
    } else {
      logger.info(`No sheet with id ${id}`);
    }
    return sheet;
  } catch (error) {
    logger.error({ error: error.message, id }, `Failed to find a sheet with id ${id}`);
    return null;
  }
}

export default sheetResolver;
