// SPDX-License-Identifier: MIT
// Links the installed CNA::Extended and uses a part that needs CNA's graphics device.
#include "CNA/Extended/OrthographicCamera.hpp"
#include "CNA/Extended/Version.hpp"
#include "Microsoft/Xna/Framework/Graphics/GraphicsDevice.hpp"
#include "Microsoft/Xna/Framework/Graphics/Viewport.hpp"
#include "Microsoft/Xna/Framework/Point.hpp"

#include <iostream>

int main()
{
    using Microsoft::Xna::Framework::ContainmentType;
    Microsoft::Xna::Framework::Graphics::GraphicsDevice device;
    device.setViewportProperty(Microsoft::Xna::Framework::Graphics::Viewport(0, 0, 800, 480));
    CNA::Extended::OrthographicCamera camera(device);
    const bool inside = camera.Contains(Microsoft::Xna::Framework::Point(1, 1)) == ContainmentType::Contains;
    const bool outside = camera.Contains(Microsoft::Xna::Framework::Point(-1, -1)) == ContainmentType::Disjoint;
    std::cout << "cna-extended " << CNA::Extended::VersionString() << " from the installed package: "
              << (inside && outside ? "ok" : "WRONG") << '\n';
    return inside && outside ? 0 : 1;
}
