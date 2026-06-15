/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MXT_008_TEMPLATE = `
<article class="mx-result mx-theme-{theme} MXT_008" data-template="MXT_008" data-use-case="{uc_id}">
  <header class="mx-result-header technical-header font-mono">
    <h1 class="mx-result-title">{title}</h1>
    <p class="mx-result-subtitle">Dev Hand-off Spec v1.0</p>
  </header>
  <main class="mx-result-body font-mono">
    {blocks}
    <div class="mx-stats-code">
      {stats}
    </div>
  </main>
</article>
`;
