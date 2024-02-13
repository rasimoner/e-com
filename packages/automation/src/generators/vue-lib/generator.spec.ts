import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { vueLibGenerator } from './generator';
import { VueLibGeneratorSchema } from './schema';

describe('vue-lib generator', () => {
  let tree: Tree;
  const options: VueLibGeneratorSchema = {
    name: 'test',
    description: '',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await vueLibGenerator(tree, options);

    const project = tree.read(`packages/${options.name}/project.json`);
    const config = JSON.parse(project.toString());

    expect(config).toBeDefined();
  });
});
