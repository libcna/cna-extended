#!/usr/bin/env bash
# Installs cna-extended from an existing linked build tree and builds a consumer
# of the installed package against the same CNA and Sharp Runtime source trees.
#
#   tools/check_package.sh <build-dir> <cna-dir> <sharp-runtime-dir>
#
# Everything goes to build-consumer/ (install/ and package_check/). Uses the
# shared ccache when it is installed; at most JOBS (default 3) jobs.
set -eu
cd "$(dirname "$0")/.."
build=$1 cna=$2 sharp=$3
launchers=()
command -v ccache > /dev/null && launchers=(-DCMAKE_CXX_COMPILER_LAUNCHER=ccache -DCMAKE_C_COMPILER_LAUNCHER=ccache)
rm -rf build-consumer/install
cmake --install "$build" --prefix build-consumer/install > /dev/null
cmake -S tools/package_check -B build-consumer/package_check -DCMAKE_BUILD_TYPE=Debug \
    -DCMAKE_PREFIX_PATH="$PWD/build-consumer/install" -DCNA_DIR="$cna" -DSHARP_RUNTIME_DIR="$sharp" \
    -DCNA_ENABLE_SDL=OFF -DCNA_ENABLE_VIDEO=OFF "${launchers[@]}" > build-consumer/package_check.log
cmake --build build-consumer/package_check --parallel "${JOBS:-3}" >> build-consumer/package_check.log
build-consumer/package_check/package_check
