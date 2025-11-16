/**
 * TOON File Parser
 * Parses TOON (TOML-like) format files for project data
 */

export interface Project {
  id: string;
  title: string;
  summary: string;
  period_start: string;
  period_end: string | null;
  is_current: boolean;
  roles: string[];
  description: string;
  tags: string[];
}

/**
 * Parse a TOON file content and return an array of projects
 */
export function parseToonFile(content: string): Project[] {
  const projects: Project[] = [];
  const lines = content.split('\n');

  let currentProject: Partial<Project> | null = null;
  let currentKey = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip comments and empty lines
    if (line.startsWith('#') || line === '') {
      continue;
    }

    // New project section
    if (line === '[[project]]') {
      if (currentProject && currentProject.id) {
        projects.push(currentProject as Project);
      }
      currentProject = {
        roles: [],
        tags: [],
        period_end: null,
        is_current: false,
      };
      continue;
    }

    // Parse key-value pairs
    const match = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (match && currentProject) {
      const [, key, value] = match;
      currentKey = key;

      // Remove quotes and parse value
      let parsedValue: string | boolean | string[] | null = value.trim();

      // Handle string values
      if (parsedValue.startsWith('"') && parsedValue.endsWith('"')) {
        parsedValue = parsedValue.slice(1, -1);
      }

      // Handle null values
      if (parsedValue === 'null') {
        parsedValue = null;
      }

      // Handle boolean values
      if (parsedValue === 'true') {
        parsedValue = true;
      } else if (parsedValue === 'false') {
        parsedValue = false;
      }

      // Handle array values
      if (parsedValue && typeof parsedValue === 'string' && parsedValue.startsWith('[') && parsedValue.endsWith(']')) {
        const arrayContent = parsedValue.slice(1, -1);
        parsedValue = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^"|"$/g, ''))
          .filter(item => item !== '');
      }

      // Assign to current project
      (currentProject as any)[key] = parsedValue;
    }
  }

  // Add the last project
  if (currentProject && currentProject.id) {
    projects.push(currentProject as Project);
  }

  return projects;
}

/**
 * Get tag color based on tag name
 */
export function getTagColor(tag: string): { bg: string; text: string } {
  const colorMap: Record<string, { bg: string; text: string }> = {
    React: { bg: 'bg-blue-100', text: 'text-blue-800' },
    TypeScript: { bg: 'bg-blue-100', text: 'text-blue-800' },
    'Next.js': { bg: 'bg-gray-900', text: 'text-white' },
    'Tailwind CSS': { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    'Vue.js': { bg: 'bg-green-100', text: 'text-green-800' },
    'Node.js': { bg: 'bg-green-100', text: 'text-green-800' },
    PostgreSQL: { bg: 'bg-blue-100', text: 'text-blue-800' },
    Docker: { bg: 'bg-blue-100', text: 'text-blue-800' },
    Flutter: { bg: 'bg-sky-100', text: 'text-sky-800' },
    Dart: { bg: 'bg-sky-100', text: 'text-sky-800' },
    Firebase: { bg: 'bg-orange-100', text: 'text-orange-800' },
    iOS: { bg: 'bg-gray-100', text: 'text-gray-800' },
    Android: { bg: 'bg-green-100', text: 'text-green-800' },
    Python: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    AWS: { bg: 'bg-orange-100', text: 'text-orange-800' },
    Lambda: { bg: 'bg-orange-100', text: 'text-orange-800' },
    S3: { bg: 'bg-orange-100', text: 'text-orange-800' },
    Redshift: { bg: 'bg-red-100', text: 'text-red-800' },
    Figma: { bg: 'bg-purple-100', text: 'text-purple-800' },
    Storybook: { bg: 'bg-pink-100', text: 'text-pink-800' },
    Kubernetes: { bg: 'bg-blue-100', text: 'text-blue-800' },
    Go: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    gRPC: { bg: 'bg-teal-100', text: 'text-teal-800' },
    OpenAI: { bg: 'bg-green-100', text: 'text-green-800' },
    FastAPI: { bg: 'bg-teal-100', text: 'text-teal-800' },
    Security: { bg: 'bg-red-100', text: 'text-red-800' },
    OWASP: { bg: 'bg-red-100', text: 'text-red-800' },
    Express: { bg: 'bg-gray-100', text: 'text-gray-800' },
    'D3.js': { bg: 'bg-orange-100', text: 'text-orange-800' },
    WebSocket: { bg: 'bg-blue-100', text: 'text-blue-800' },
    'GitHub Actions': { bg: 'bg-gray-900', text: 'text-white' },
    Terraform: { bg: 'bg-purple-100', text: 'text-purple-800' },
  };

  return colorMap[tag] || { bg: 'bg-gray-100', text: 'text-gray-800' };
}
