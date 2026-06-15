/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MXT_002_TEMPLATE = `
<article class="mx-result mx-theme-{theme} MXT_002" data-template="MXT_002" data-use-case="{uc_id}">
  <header class="mx-result-header content-header">
    <div class="mx-icon">✍️</div>
    <h1 class="mx-result-title">{title}</h1>
    <p class="mx-result-subtitle">{subtitle}</p>
  </header>
  <main class="mx-result-body">
    <div class="mx-stats-row">
      {stats}
    </div>
    <div class="mx-content-wrapper">
      {blocks}
    </div>
  </main>
</article>
`;
