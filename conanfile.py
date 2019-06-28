from conans import ConanFile, CMake


class Screeps(ConanFile):
    name = "screeps"
    version = "1.0"
    description = "hello-world example of conan usage with Emscripten"
    topics = ("conan", "hello", "emscripten", "js", "javascript")
    license = "MIT"
    url = "https://github.com/conan-io/examples"
    homepage = "https://github.com/conan-io/examples"
    settings = {"os": ["Emscripten"]}
    generators = ["virtualenv", "cmake"]

    def _configure_cmake(self):
        cmake = CMake(self)
        cmake.configure()
        return cmake

    def build(self):
        cmake = self._configure_cmake()
        cmake.build()

    def package(self):
        cmake = self._configure_cmake()
        cmake.install()
