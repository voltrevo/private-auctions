#!/bin/bash

set -euo pipefail

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR"

SUMMON_LIB_VER=c24b5f32ccb8d8ffe77fb1465425a0575012b4b7
GH_PSE="https://raw.githubusercontent.com/privacy-scaling-explorations"
SUMMON_LIB_BASE="$GH_PSE/summon-lib/$SUMMON_LIB_VER"

rm -rf sha256
mkdir -p sha256
pushd sha256
  curl -LO "$SUMMON_LIB_BASE/sha256/mod.ts"
  curl -LO "$SUMMON_LIB_BASE/sha256/sha256Compress.ts"
  echo "*" >.gitignore
popd sha256
