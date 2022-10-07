import Sheet from "../../model/Sheet";

type CreateSheetInput = {
  name?: string;
};

async function createSheetMutation(_, params, { req }) {
  const logger = req.logger as Logger;
  const input = params.input as CreateSheetInput | undefined;

  logger.info({ input }, `Creating sheet`);
  const name = input?.name ?? `Untitled sheet ${String(Math.random()).split(".")[1]}`;
  const newSheet = await Sheet.create({ name, columns: [], rows: [] });

  return newSheet;
}

export default createSheetMutation;
