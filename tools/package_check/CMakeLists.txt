# SPDX-License-Identifier: MIT
# A consumer of the INSTALLED cna-extended package (tools/check_package.sh): it
# adds CNA from its source tree, as a consumer must until CNA installs a
# package, then find_package(CnaExtended) and links CNA::Extended.
cmake_minimum_required(VERSION 3.20)
project(cna_extended_package_check LANGUAGES C CXX)
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CNA_DIR "" CACHE PATH "CNA source tree")
set(SHARP_RUNTIME_DIR "" CACHE PATH "Sharp Runtime source tree")
set(CnaExtended_COMPONENTS_FOR_CNA
    Core.Base IO Collections.Core Collections.ObjectModel Runtime Threading Text Globalization Storage
    Security.Cryptography IO.Compression Text.Json Threading.Tasks Xml)

# The same host-independent CNA as cna-extended's standalone build.
set(CNA_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(CNA_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(CNA_BUILD_C_API OFF CACHE BOOL "" FORCE)
set(CNA_CNAEXT OFF CACHE BOOL "" FORCE)
set(CNA_DEVICES OFF CACHE BOOL "" FORCE)
set(CNA_ENABLE_NET OFF CACHE BOOL "" FORCE)
set(CNA_ENABLE_DRACO OFF CACHE BOOL "" FORCE)
set(CNA_GRAPHICS_RENDERER SOFTWARE CACHE STRING "" FORCE)
set(CNA_PLATFORM HEADLESS CACHE STRING "" FORCE)
set(CNA_AUDIO_PLATFORM NULL CACHE STRING "" FORCE)
set(CNA_SHARP_RUNTIME_ROOT "${SHARP_RUNTIME_DIR}" CACHE PATH "" FORCE)
set(SHARP_RUNTIME_COMPONENTS "${CnaExtended_COMPONENTS_FOR_CNA}" CACHE STRING "" FORCE)
set(SHARP_RUNTIME_BUILD_TESTS OFF CACHE BOOL "" FORCE)
add_subdirectory("${CNA_DIR}" cna EXCLUDE_FROM_ALL)

find_package(CnaExtended 0.2 CONFIG REQUIRED)
foreach(_component IN LISTS CnaExtended_SHARP_RUNTIME_COMPONENTS)
    if(NOT _component IN_LIST CnaExtended_COMPONENTS_FOR_CNA)
        message(FATAL_ERROR "the installed package needs Sharp Runtime component ${_component}")
    endif()
endforeach()

add_executable(package_check main.cpp)
target_link_libraries(package_check PRIVATE CNA::Extended)
