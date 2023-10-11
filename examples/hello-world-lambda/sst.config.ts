import { SSTConfig } from "sst";
import { API } from "./stacks/first-stack";

export default {
  config(_input) {
    return {
      name: "hello-world-lambda",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
