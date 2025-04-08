#!/usr/bin/env node

/**
 * This script helps install shadcn/ui components into our atomic design structure
 * Usage: node scripts/add-component.js [component-name] [atomic-level]
 * Example: node scripts/add-component.js button atoms
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Map of components to their appropriate atomic design level
// This is a suggestion - you can modify based on your preferences
const DEFAULT_COMPONENT_MAPPING = {
  // Atoms (basic building blocks)
  button: 'atoms',
  input: 'atoms',
  label: 'atoms',
  select: 'atoms',
  checkbox: 'atoms',
  radio: 'atoms',
  switch: 'atoms',
  textarea: 'atoms',
  badge: 'atoms',
  avatar: 'atoms',
  separator: 'atoms',
  
  // Molecules (combinations of atoms)
  alert: 'molecules',
  card: 'molecules',
  dialog: 'molecules',
  dropdown: 'molecules',
  'date-picker': 'molecules',
  toast: 'molecules',
  tooltip: 'molecules',
  popover: 'molecules',
  sheet: 'molecules',
  tabs: 'molecules',
  accordion: 'molecules',
  
  // Organisms (complex UI sections)
  table: 'organisms',
  'data-table': 'organisms',
  form: 'organisms',
  'command': 'organisms',
  'combo-box': 'organisms',
  pagination: 'organisms',
  breadcrumb: 'organisms',
  navigation: 'organisms',
};

// Get command line arguments
const componentName = process.argv[2];
const forcedAtomicLevel = process.argv[3];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// Determine the atomic level for the component
const atomicLevel = forcedAtomicLevel || DEFAULT_COMPONENT_MAPPING[componentName] || 'atoms';

console.log(`Installing ${componentName} to ${atomicLevel}...`);

// First, install the component using shadcn
try {
  // This will install the component to the default location
  execSync(`npx shadcn@latest add ${componentName}`, { stdio: 'inherit' });
  console.log(`Successfully installed ${componentName} to the default location`);
} catch (error) {
  console.error(`Failed to install ${componentName}: ${error.message}`);
  process.exit(1);
}

// Now, move the component to our atomic design structure
const sourceDir = path.join(process.cwd(), 'src', 'components', 'ui');
const targetDir = path.join(process.cwd(), 'src', 'components', atomicLevel);

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Find and move the component files
try {
  // Check if the component file exists
  const componentFile = path.join(sourceDir, `${componentName}.tsx`);
  if (fs.existsSync(componentFile)) {
    const targetFile = path.join(targetDir, `${componentName}.tsx`);
    fs.copyFileSync(componentFile, targetFile);
    console.log(`Moved ${componentName}.tsx to ${atomicLevel} directory`);
    fs.unlinkSync(componentFile);
  }

  // Check if there's a component directory (for complex components)
  const componentDir = path.join(sourceDir, componentName);
  if (fs.existsSync(componentDir) && fs.statSync(componentDir).isDirectory()) {
    const targetComponentDir = path.join(targetDir, componentName);
    if (!fs.existsSync(targetComponentDir)) {
      fs.mkdirSync(targetComponentDir, { recursive: true });
    }
    
    // Copy all files from the component directory
    const files = fs.readdirSync(componentDir);
    for (const file of files) {
      const sourceFile = path.join(componentDir, file);
      const targetFile = path.join(targetComponentDir, file);
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`Moved ${componentName}/${file} to ${atomicLevel}/${componentName} directory`);
    }
    
    // Remove the original component directory
    fs.rmdirSync(componentDir, { recursive: true });
  }
  
  // Update imports in the moved files
  updateImports(targetDir, atomicLevel);
  
  console.log(`Successfully integrated ${componentName} into the ${atomicLevel} atomic design level`);
} catch (error) {
  console.error(`Failed to move component files: ${error.message}`);
  process.exit(1);
}

// Clean up the UI directory if it's empty
cleanupUIDirectory();

function updateImports(directory, atomicLevel) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively process subdirectories
      updateImports(filePath, atomicLevel);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace imports from "@/components/ui" with the appropriate atomic design level
      content = content.replace(
        /from ["']@\/components\/ui\/(.*?)["']/g,
        (match, p1) => {
          // Check if the import is for another component that might be in a different atomic level
          const importedComponent = p1.split('/')[0];
          const importedAtomicLevel = DEFAULT_COMPONENT_MAPPING[importedComponent] || atomicLevel;
          
          return `from "@/components/${importedAtomicLevel}/${p1}"`;
        }
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

function cleanupUIDirectory() {
  const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');
  
  if (fs.existsSync(uiDir)) {
    // Check if the directory is empty
    const files = fs.readdirSync(uiDir);
    if (files.length === 0) {
      fs.rmdirSync(uiDir);
      console.log('Removed empty ui directory');
    }
  }
} 