import { M as ModuleMockerServerInterceptor } from './chunk-interceptor-native.js';
import { registerModuleMocker } from './register.js';
import './chunk-mocker.js';
import './index.js';
import './chunk-registry.js';
import './chunk-pathe.BLwDEnA5.js';
import '@vitest/spy';

registerModuleMocker(
  () => new ModuleMockerServerInterceptor()
);
