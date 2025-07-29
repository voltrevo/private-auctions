#!/bin/bash

set -euo pipefail

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR"

# Check if fetch_done exists and is newer than this script
if [[ -f fetch_done && fetch_done -nt "${BASH_SOURCE[0]}" ]]; then
    echo "fetch_done is up to date, skipping fetch"
    exit 0
fi

SUMMON_LIB_VER=fe3b4b5be99e8898bc8ecce2b196d675fff5e37d
GH_PSE="https://raw.githubusercontent.com/privacy-scaling-explorations"
SUMMON_LIB_BASE="$GH_PSE/summon-lib/$SUMMON_LIB_VER"

rm -rf sha256
mkdir -p sha256
pushd sha256
  curl -LO "$SUMMON_LIB_BASE/sha256/mod.ts"
  curl -LO "$SUMMON_LIB_BASE/sha256/sha256Compress.ts"
popd

echo -e "$(date)\n^ for convenience (we actually use fs timestamp)" >fetch_done
