#!/bin/bash
port=9000
pid=$(lsof -t -i:$port)

if [ ! -z "$pid" ]; then
  echo "Killing process on port $port (PID: $pid)"
  kill -9 $pid
else
  echo "No process found on port $port"
fi 