#!/bin/bash
echo "Starting Netlify build..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies
npm ci

# Build the Next.js application
npm run build

# Display build info
echo "Build completed successfully!"
echo "Build output size:"
du -sh .next/
