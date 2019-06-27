from conans import ConanFile, CMake

class PathFindConan(ConanFile):
    requires = "ncurses/6.1@conan/stable"
    generators = "cmake"

    def build(self):
        cmake = CMake(self)
        cmake.configure()
        cmake.build()
