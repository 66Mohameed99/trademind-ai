#!/bin/bash
cd /home/z/my-project
while true; do
  fuser -k 3000/tcp 2>/dev/null
  sleep 1
  npx next start -p 3000 2>&1
  echo "Server crashed, restarting in 2s..."
  sleep 2
done