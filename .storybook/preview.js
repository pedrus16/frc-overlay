import { ReforgedStyleContext } from "../src/contexts";

import "../src/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
};

export const decorators = [
  (Story) => (
    <ReforgedStyleContext.Provider value={false}>
      <Story />
    </ReforgedStyleContext.Provider>
  ),
];
