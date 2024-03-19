import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
  WEAVER_STAGE: str(),
  WEAVER_BASE_URL: str(),
  WEAVER_SIGN_IN_URL: str(),
  WEAVER_E2E_USER: str(),
  WEAVER_E2E_PWD: str(),
});