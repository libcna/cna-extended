# SPDX-License-Identifier: MIT

if(NOT EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/../vendor/googletest/CMakeLists.txt")
    message(FATAL_ERROR
        "vendor/googletest is missing.\n"
        "Run: git submodule update --init --recursive")
endif()
# The test framework is not part of the installed package.
set(INSTALL_GTEST OFF CACHE BOOL "" FORCE)
add_subdirectory(../vendor/googletest ${CMAKE_BINARY_DIR}/_googletest)

file(GLOB_RECURSE CNA_EXTENDED_TEST_SOURCES CONFIGURE_DEPENDS
    "*.cpp"
)

# Nearly every cna-extended test constructs real XNA types (Vector2, Color, Rectangle,
# ...). Those types are declared in CNA's headers but DEFINED in CNA's compiled .cpp
# files (same caveat easy-3d documents for its own tests/examples), so a test binary can
# only be *linked* (and therefore actually run) when CNA_EXTENDED_CNA_LINKED is true. In
# the default headers-only build, compile the whole test suite as an OBJECT library
# instead — this still catches CNA/sharp-runtime header/API drift, just without running
# anything. Use -DCNA_EXTENDED_LINK_CNA=ON (this project's normal development workflow;
# see NEXT.md) to get a real, runnable test binary.
if(CNA_EXTENDED_CNA_LINKED)
    add_executable(CnaExtendedTests
        ${CNA_EXTENDED_TEST_SOURCES}
    )
    target_link_libraries(CnaExtendedTests
        PRIVATE
            CNA_EXTENDED
            gtest_main
    )
    target_include_directories(CnaExtendedTests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}
    )
    # Fixture files are found through this absolute path, never through __FILE__ (relative under
    # ccache's base directory) or the working directory (CTest runs from <build>/tests).
    target_compile_definitions(CnaExtendedTests PRIVATE
        CNA_EXTENDED_TEST_SOURCE_DIR="${CMAKE_CURRENT_SOURCE_DIR}"
        CNA_EXTENDED_PROJECT_VERSION="${PROJECT_VERSION}")
    if(MSVC)
        target_compile_options(CnaExtendedTests PRIVATE /W4 /WX)
    else()
        target_compile_options(CnaExtendedTests PRIVATE -Wall -Wextra -Werror)
    endif()

    include(GoogleTest)
    gtest_discover_tests(CnaExtendedTests)
else()
    add_library(CnaExtendedTests_compilecheck OBJECT
        ${CNA_EXTENDED_TEST_SOURCES}
    )
    target_link_libraries(CnaExtendedTests_compilecheck
        PRIVATE
            CNA_EXTENDED
            gtest_main
    )
    target_include_directories(CnaExtendedTests_compilecheck
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}
    )
    target_compile_definitions(CnaExtendedTests_compilecheck PRIVATE
        CNA_EXTENDED_TEST_SOURCE_DIR="${CMAKE_CURRENT_SOURCE_DIR}"
        CNA_EXTENDED_PROJECT_VERSION="${PROJECT_VERSION}")
    if(MSVC)
        target_compile_options(CnaExtendedTests_compilecheck PRIVATE /W4 /WX)
    else()
        target_compile_options(CnaExtendedTests_compilecheck PRIVATE -Wall -Wextra -Werror)
    endif()

    message(STATUS
        "cna-extended: tests compile-checked only, not run "
        "(needs CNA linked to run: -DCNA_EXTENDED_LINK_CNA=ON, or a parent project that "
        "defines the CNA target).")
endif()
