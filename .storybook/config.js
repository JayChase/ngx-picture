import { configure } from '@storybook/angular';

configure(
  require.context(
    '../projects/ngx-picture/src/stories',
    true,
    /\.stories\.[tj]s$/
  ),
  module
);
