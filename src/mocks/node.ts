import { setupServer } from "msw/node";

import { testAPI } from "./testAPI";

export const server = setupServer(...testAPI);
