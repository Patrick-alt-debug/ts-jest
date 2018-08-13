import { CompilerOptions, ParsedCommandLine } from 'typescript';
import _closestFileData from 'closest-file-data';
import * as _babel from 'babel__core';
import { IPackageJSON } from 'gist-package-json';

export type TBabelCore = typeof _babel;
export type TPackageJson = IPackageJSON;
export type TClosestFileData = typeof _closestFileData;
export type TBabelJest = Required<jest.Transformer>;

// CAUTION: use same key-value pair allow us to not store a list of values somewhere
export enum DiagnosticTypes {
  syntactic = 'syntactic',
  options = 'options',
  global = 'global',
  semantic = 'sementic',
}
export enum DiagnosticSets {
  none = 'none',
  full = 'full',
  default = 'default',
}
export const diagnosticSets = {
  full: [
    DiagnosticTypes.global,
    DiagnosticTypes.syntactic,
    DiagnosticTypes.semantic,
    DiagnosticTypes.options,
  ],
  default: [DiagnosticTypes.syntactic, DiagnosticTypes.options],
  none: [],
};

// FIXME: find the right typing for this
export type BabelConfig = _babel.TransformOptions;

export interface TsJestGlobalOptions {
  // either a path to a tsconfig json file, or inline compiler options
  tsConfig?: string | CompilerOptions;
  // what kind of diagnostics to report
  diagnostics?: DiagnosticTypes[] | DiagnosticTypes | DiagnosticSets | boolean;
  // whether to use babel jest under the hood or not
  // it can be:
  //    - a path to a babelrc (<rootDir> can be used)
  //    - a babel config object
  //    - a boolean to enable/disable the use of babel-jest
  babelJest?: boolean | BabelConfig | string;

  // should this be kept in here? it has nothing to do with TS after all...
  // kept for backward compatibility to handle __TRANSFORM_HTML__
  stringifyContentPathRegex?: string | RegExp;
}

export interface TsJestConfig {
  inputOptions: TsJestGlobalOptions;
  babelJest: BabelConfig | string | boolean;
  diagnostics: DiagnosticTypes[];

  // to deprecate / deprecated === === ===
  stringifyContentPathRegex?: RegExp | undefined;
}

export interface TsJestProgram {
  readonly parsedConfig: ParsedCommandLine;
  transpileModule(
    path: string,
    content: string,
    instrument?: boolean,
    extraCompilerOptions?: CompilerOptions,
  ): string;
}

export interface TsJestHooksMap {
  afterProcess?(
    args: any[],
    result: string | jest.TransformedSource,
  ): string | jest.TransformedSource | void;
}

export interface CreateJestPresetOptions {
  allowJs?: boolean;
}
