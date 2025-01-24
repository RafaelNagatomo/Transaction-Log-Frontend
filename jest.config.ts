import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.app.json'

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths,{
    prefix: '<rootDir>/'
  }),
}
