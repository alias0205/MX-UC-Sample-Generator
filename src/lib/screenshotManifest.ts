export interface ScreenshotInstruction {
  use_case_id: string;
  theme: 'light' | 'dark';
  html_key: string;
  full_file: string;
  thumb_file: string;
}

export function generateScreenshotManifest(toolId: string, commandSlug: string): ScreenshotInstruction[] {
  const manifests: ScreenshotInstruction[] = [];
  const ucs = ['UC1', 'UC2', 'UC3'] as const;
  const themes: Array<'light' | 'dark'> = ['light', 'dark'];

  ucs.forEach((uc) => {
    themes.forEach((theme) => {
      const useCaseId = `${commandSlug}_${uc}`;
      manifests.push({
        use_case_id: useCaseId,
        theme,
        html_key: `${uc}_${theme}`,
        full_file: `${toolId}_${uc}_full_${theme}.jpg`,
        thumb_file: `${toolId}_${uc}_thumb_${theme}.jpg`,
      });
    });
  });

  return manifests;
}
