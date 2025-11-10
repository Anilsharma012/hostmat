#!/bin/bash
unset HOST
export PORT=3003
export NODE_OPTIONS="--max-old-space-size=4096"
export SKIP_PREFLIGHT_CHECK=true
export CI=false
npm run start:frontend
