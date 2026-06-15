/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MXT_006_TEMPLATE = `
<article class="mx-result mx-theme-{theme} MXT_006" data-template="MXT_006" data-use-case="{uc_id}">
  <header class="mx-result-header comparison-header">
    <h1 class="mx-result-title">{title}</h1>
    <p class="mx-result-subtitle">Side-by-Side Analysis</p>
  </header>
  <main class="mx-result-body">
    {blocks}
    <div class="mx-stats-inline">
      {stats}
    </div>
  </main>
</article>
`;
