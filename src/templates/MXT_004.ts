/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MXT_004_TEMPLATE = `
<article class="mx-result mx-theme-{theme} MXT_004" data-template="MXT_004" data-use-case="{uc_id}">
  <header class="mx-result-header workflow-header">
    <h1 class="mx-result-title">Workflow: {title}</h1>
    <p class="mx-result-subtitle">Automation Priority Roadmap</p>
  </header>
  <main class="mx-result-body">
    {blocks}
    <div class="mx-stats-footer">
      {stats}
    </div>
  </main>
</article>
`;
