export function generateInputSampleFromSchema(schemaJson: string): any {
  try {
    const schema = JSON.parse(schemaJson);
    const sample: any = {};

    // Basic logic to infer values from schema properties
    if (schema.properties) {
      Object.keys(schema.properties).forEach((key) => {
        const prop = schema.properties[key];
        if (prop.type === 'string') {
          if (key.includes('url')) sample[key] = 'https://example.com';
          else if (key.includes('email')) sample[key] = 'user@example.com';
          else sample[key] = `Sample ${key}`;
        } else if (prop.type === 'number' || prop.type === 'integer') {
          sample[key] = 42;
        } else if (prop.type === 'boolean') {
          sample[key] = true;
        } else if (prop.type === 'array') {
          sample[key] = prop.items?.type === 'string' ? ['item1', 'item2'] : [{}];
        } else {
          sample[key] = {};
        }
      });
    } else {
      // Fallback for simple schemas or non-object schemas
      return { query: 'Sample Query', target: 'Sample Target' };
    }

    return sample;
  } catch (e) {
    return { error: 'Could not generate sample' };
  }
}
