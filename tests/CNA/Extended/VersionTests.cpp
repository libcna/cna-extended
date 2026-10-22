// SPDX-License-Identifier: MIT
// Copyright (c) Robert Vokac and contributors
#include "CNA/Extended/Version.hpp"

#include <gtest/gtest.h>

#include <string_view>

namespace CNA::Extended
{
    TEST(Version, VersionNumberMatchesComponents)
    {
        EXPECT_EQ(VersionNumber(), VersionMajor * 10000 + VersionMinor * 100 + VersionPatch);
    }

    TEST(Version, VersionStringIsNotEmpty)
    {
        EXPECT_FALSE(std::string_view(VersionString()).empty());
    }

    // The installed package's version file comes from CMake's project version.
    TEST(Version, MatchesTheProjectVersion)
    {
        EXPECT_EQ(std::string_view(VersionString()), std::string_view(CNA_EXTENDED_PROJECT_VERSION));
    }
}
