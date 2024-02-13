import { formatFiles, generateFiles, names, readJson, Tree } from '@nx/devkit';
import * as path from 'path';
import { VueLibGeneratorSchema } from './schema';

export async function vueLibGenerator(
  tree: Tree,
  options: VueLibGeneratorSchema
) {
  const scopeName = readJson(tree, 'package.json').name;
  const resolvedOptions = {
    ...options,
    name: names(options.name).fileName,
    scope: scopeName,
  };

  const projectRoot = `packages/${resolvedOptions.name}`;
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    resolvedOptions
  );
  await formatFiles(tree);
}

export default vueLibGenerator;
